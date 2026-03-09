"use server";

interface VideoFormat {
	quality: string;
	url: string;
	format: string;
	size?: string;
}

interface VideoInfo {
	title: string;
	thumbnail: string;
	duration?: string;
	formats: VideoFormat[];
}

/**
 * Fetches video information from Pinterest
 * Uses a third-party API service to extract video data
 */
export async function fetchPinterestVideo(url: string): Promise<VideoInfo> {
	try {
		// Validate Pinterest URL
		if (!url.includes("pinterest.com") && !url.includes("pin.it")) {
			throw new Error("Invalid Pinterest URL");
		}

		// Use RapidAPI's Pinterest Video Downloader or similar service
		// For production, you'll need to sign up for an API key
		const apiUrl = `https://pinterest-video-and-image-downloader.p.rapidapi.com/pinterest?url=${encodeURIComponent(url)}`;

		const response = await fetch(apiUrl, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY",
				"X-RapidAPI-Host": "pinterest-video-and-image-downloader.p.rapidapi.com",
			},
		});

		if (!response.ok) {
			// Fallback: Try alternative method using Pinterest oEmbed
			return await fetchPinterestFallback(url);
		}

		const data = await response.json();

		if (!data || data.error) {
			throw new Error(data?.message || "Failed to fetch Pinterest video");
		}

		// Parse the response and extract video information
		const formats: VideoFormat[] = [];

		if (data.video) {
			formats.push({
				quality: "Original",
				url: data.video,
				format: "mp4",
			});
		}

		if (data.videos) {
			for (const [quality, videoUrl] of Object.entries(data.videos)) {
				if (videoUrl && typeof videoUrl === "string") {
					formats.push({
						quality: quality,
						url: videoUrl,
						format: "mp4",
					});
				}
			}
		}

		if (formats.length === 0) {
			throw new Error("No video found at this Pinterest URL. Please make sure it contains a video.");
		}

		return {
			title: data.title || "Pinterest Video",
			thumbnail: data.thumbnail || data.image || "",
			formats,
		};
	} catch (error) {
		console.error("Pinterest fetch error:", error);
		throw new Error(error instanceof Error ? error.message : "Failed to fetch Pinterest video. Please try again.");
	}
}

/**
 * Fallback method for Pinterest using web scraping
 */
async function fetchPinterestFallback(url: string): Promise<VideoInfo> {
	try {
		// Fetch the Pinterest page
		const response = await fetch(url, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
				Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to access Pinterest");
		}

		const html = await response.text();

		// Extract video URL from the page's JSON data
		const scriptMatch = html.match(/<script[^>]*id="__PWS_DATA__"[^>]*>(.*?)<\/script>/s);

		if (scriptMatch) {
			const jsonData = JSON.parse(scriptMatch[1]);

			// Navigate through Pinterest's data structure to find video
			const pinData = findVideoInPinterestData(jsonData);

			if (pinData) {
				return pinData;
			}
		}

		// Try to find video URL directly in HTML
		const videoMatch = html.match(/https:\/\/v[^"'\s]+\.mp4[^"'\s]*/gi);
		const imageMatch = html.match(/https:\/\/i\.pinimg\.com\/[^"'\s]+/gi);
		const titleMatch = html.match(/<title>([^<]+)<\/title>/i);

		if (videoMatch && videoMatch.length > 0) {
			const uniqueVideos = [...new Set(videoMatch)];

			return {
				title: titleMatch ? titleMatch[1].replace(" | Pinterest", "").trim() : "Pinterest Video",
				thumbnail: imageMatch ? imageMatch[0] : "",
				formats: uniqueVideos.slice(0, 3).map((url, index) => ({
					quality: index === 0 ? "High" : index === 1 ? "Medium" : "Low",
					url: url,
					format: "mp4",
				})),
			};
		}

		throw new Error("No video found at this Pinterest URL");
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "Failed to extract Pinterest video");
	}
}

/**
 * Helper to find video data in Pinterest's JSON structure
 */
function findVideoInPinterestData(data: any): VideoInfo | null {
	try {
		// Pinterest stores data in various nested structures
		const props = data?.props?.initialReduxState?.pins;

		if (props) {
			const pinId = Object.keys(props)[0];
			const pin = props[pinId];

			if (pin?.videos?.video_list) {
				const videos = pin.videos.video_list;
				const formats: VideoFormat[] = [];

				// V_720P, V_480P, V_360P, V_240P are common quality keys
				const qualityOrder = ["V_720P", "V_480P", "V_360P", "V_240P", "V_HLSV4"];

				for (const quality of qualityOrder) {
					if (videos[quality]?.url) {
						formats.push({
							quality: quality.replace("V_", "").replace("HLSV4", "HLS"),
							url: videos[quality].url,
							format: quality === "V_HLSV4" ? "m3u8" : "mp4",
							size: videos[quality].width ? `${videos[quality].width}x${videos[quality].height}` : undefined,
						});
					}
				}

				if (formats.length > 0) {
					return {
						title: pin.title || pin.description || "Pinterest Video",
						thumbnail: pin.images?.orig?.url || pin.image_signature || "",
						duration: pin.videos?.video_list?.V_720P?.duration ? formatDuration(pin.videos.video_list.V_720P.duration / 1000) : undefined,
						formats,
					};
				}
			}
		}

		return null;
	} catch {
		return null;
	}
}

/**
 * Fetches video information from YouTube
 * Uses YouTube's oEmbed API and ytdl-core patterns
 */
export async function fetchYouTubeVideo(url: string): Promise<VideoInfo> {
	try {
		// Extract video ID from various YouTube URL formats
		const videoId = extractYouTubeVideoId(url);

		if (!videoId) {
			throw new Error("Invalid YouTube URL. Please provide a valid YouTube video link.");
		}

		// Use RapidAPI's YouTube downloader service
		// For production, sign up at rapidapi.com and get an API key
		const apiUrl = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`;

		const response = await fetch(apiUrl, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY",
				"X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
			},
		});

		if (!response.ok) {
			// Fallback to alternative method
			return await fetchYouTubeFallback(videoId);
		}

		const data = await response.json();

		if (!data || data.error) {
			throw new Error(data?.message || "Failed to fetch YouTube video");
		}

		const formats: VideoFormat[] = [];

		// Extract video formats with audio
		if (data.videos?.items) {
			for (const video of data.videos.items) {
				if (video.url && video.hasAudio) {
					formats.push({
						quality: video.quality || video.label || "Unknown",
						url: video.url,
						format: video.extension || "mp4",
						size: video.size ? formatBytes(video.size) : undefined,
					});
				}
			}
		}

		// If no combined formats, try audio-only
		if (formats.length === 0 && data.audios?.items) {
			for (const audio of data.audios.items) {
				if (audio.url) {
					formats.push({
						quality: `Audio ${audio.bitrate || ""}`,
						url: audio.url,
						format: audio.extension || "mp3",
						size: audio.size ? formatBytes(audio.size) : undefined,
					});
				}
			}
		}

		if (formats.length === 0) {
			throw new Error("No downloadable formats found for this video");
		}

		return {
			title: data.title || "YouTube Video",
			thumbnail: data.thumbnail?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
			duration: data.lengthText || formatDuration(data.lengthSeconds),
			formats: formats.slice(0, 6), // Limit to 6 formats
		};
	} catch (error) {
		console.error("YouTube fetch error:", error);
		throw new Error(error instanceof Error ? error.message : "Failed to fetch YouTube video. Please try again.");
	}
}

/**
 * Fallback method for YouTube using Invidious API
 */
async function fetchYouTubeFallback(videoId: string): Promise<VideoInfo> {
	try {
		// Invidious instances provide YouTube data without API key
		const invidiousInstances = ["https://inv.nadeko.net", "https://invidious.snopyta.org", "https://yewtu.be", "https://vid.puffyan.us"];

		let data: any = null;

		for (const instance of invidiousInstances) {
			try {
				const response = await fetch(`${instance}/api/v1/videos/${videoId}`, {
					headers: {
						Accept: "application/json",
					},
				});

				if (response.ok) {
					data = await response.json();
					break;
				}
			} catch {
				continue;
			}
		}

		if (!data) {
			// Final fallback: Use noembed for basic info
			return await fetchYouTubeBasicInfo(videoId);
		}

		const formats: VideoFormat[] = [];

		// Add combined formats (video + audio)
		if (data.formatStreams) {
			for (const format of data.formatStreams) {
				formats.push({
					quality: format.qualityLabel || format.quality || "Unknown",
					url: format.url,
					format: format.container || "mp4",
					size: format.size || undefined,
				});
			}
		}

		// Add adaptive formats if no combined formats
		if (formats.length === 0 && data.adaptiveFormats) {
			const videoFormats = data.adaptiveFormats.filter((f: any) => f.type?.includes("video"));
			for (const format of videoFormats.slice(0, 4)) {
				formats.push({
					quality: format.qualityLabel || format.quality || "Unknown",
					url: format.url,
					format: format.container || "webm",
					size: format.size || undefined,
				});
			}
		}

		if (formats.length === 0) {
			throw new Error("No downloadable formats available");
		}

		return {
			title: data.title || "YouTube Video",
			thumbnail: data.videoThumbnails?.[0]?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
			duration: formatDuration(data.lengthSeconds),
			formats,
		};
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "Failed to fetch YouTube video details");
	}
}

/**
 * Basic YouTube info using oEmbed (thumbnail and title only)
 */
async function fetchYouTubeBasicInfo(videoId: string): Promise<VideoInfo> {
	const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

	const response = await fetch(oembedUrl);

	if (!response.ok) {
		throw new Error("Video not found or is not accessible");
	}

	const data = await response.json();

	// For basic info, we can only provide a link to a third-party service
	return {
		title: data.title || "YouTube Video",
		thumbnail: data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
		formats: [
			{
				quality: "720p",
				url: `https://www.y2mate.com/youtube/${videoId}`,
				format: "redirect",
			},
			{
				quality: "360p",
				url: `https://www.y2mate.com/youtube/${videoId}`,
				format: "redirect",
			},
		],
	};
}

/**
 * Extracts YouTube video ID from various URL formats
 */
function extractYouTubeVideoId(url: string): string | null {
	const patterns = [
		// Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
		/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
		// Short URL: https://youtu.be/VIDEO_ID
		/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
		// Embed URL: https://www.youtube.com/embed/VIDEO_ID
		/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
		// Shorts URL: https://www.youtube.com/shorts/VIDEO_ID
		/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
		// V URL: https://www.youtube.com/v/VIDEO_ID
		/(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
		// Live URL: https://www.youtube.com/live/VIDEO_ID
		/(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
	];

	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match) {
			return match[1];
		}
	}

	return null;
}

/**
 * Format seconds into HH:MM:SS or MM:SS
 */
function formatDuration(seconds: number | undefined): string | undefined {
	if (!seconds || isNaN(seconds)) return undefined;

	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (hrs > 0) {
		return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	}
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Fetches video information from Instagram
 * Uses a third-party API service to extract video data
 */
export async function fetchInstagramVideo(url: string): Promise<VideoInfo> {
	try {
		// Validate Instagram URL
		if (!url.includes("instagram.com")) {
			throw new Error("Invalid Instagram URL");
		}

		// Use RapidAPI's Instagram downloader service
		const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/?url=${encodeURIComponent(url)}`;

		const response = await fetch(apiUrl, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY",
				"X-RapidAPI-Host":
					"instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
			},
		});

		if (!response.ok) {
			return await fetchInstagramFallback(url);
		}

		const data = await response.json();

		if (!data || data.error) {
			throw new Error(data?.message || "Failed to fetch Instagram video");
		}

		const formats: VideoFormat[] = [];

		if (data.download_url) {
			formats.push({
				quality: "Original",
				url: data.download_url,
				format: "mp4",
			});
		}

		if (Array.isArray(data.media)) {
			for (const item of data.media) {
				if (item.url && item.type === "video") {
					formats.push({
						quality: item.quality || "Standard",
						url: item.url,
						format: "mp4",
					});
				}
			}
		}

		if (formats.length === 0) {
			throw new Error(
				"No video found at this Instagram URL. Please make sure it contains a video.",
			);
		}

		return {
			title: data.title || data.caption || "Instagram Video",
			thumbnail: data.thumbnail || data.image || "",
			formats,
		};
	} catch (error) {
		console.error("Instagram fetch error:", error);
		throw new Error(
			error instanceof Error
				? error.message
				: "Failed to fetch Instagram video. Please try again.",
		);
	}
}

/**
 * Fallback method for Instagram using alternative API
 */
async function fetchInstagramFallback(url: string): Promise<VideoInfo> {
	try {
		const apiUrl = `https://save-from-instagram.p.rapidapi.com/media?url=${encodeURIComponent(url)}`;

		const response = await fetch(apiUrl, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY",
				"X-RapidAPI-Host": "save-from-instagram.p.rapidapi.com",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch Instagram video");
		}

		const data = await response.json();

		const formats: VideoFormat[] = [];

		if (Array.isArray(data)) {
			for (const item of data) {
				if (item.url && (item.type === "video" || item.mimetype?.includes("video"))) {
					formats.push({
						quality: item.quality || item.dimensions || "Standard",
						url: item.url,
						format: "mp4",
						size: item.filesize ? formatBytes(item.filesize) : undefined,
					});
				}
			}
		}

		if (formats.length === 0) {
			throw new Error(
				"No video found at this Instagram URL. Make sure the post contains a video and is publicly accessible.",
			);
		}

		return {
			title: data[0]?.caption || "Instagram Video",
			thumbnail: data[0]?.thumbnail || "",
			formats,
		};
	} catch (error) {
		throw new Error(
			error instanceof Error
				? error.message
				: "Failed to extract Instagram video",
		);
	}
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes: number): string {
	if (!bytes || bytes === 0) return "0 B";

	const sizes = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}
