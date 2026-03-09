import { css } from 'styled-system/css'
import { Box, Container, Stack, Flex, Grid } from 'styled-system/jsx'
import { createSignal, Show, For } from 'solid-js'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import * as Tabs from '~/components/ui/tabs'
import * as Card from '~/components/ui/card'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { Spinner } from '~/components/ui/spinner'
import { fetchPinterestVideo, fetchYouTubeVideo, fetchInstagramVideo } from '~/lib/video-api'

interface VideoFormat {
    quality: string
    url: string
    format: string
    size?: string
}

interface VideoInfo {
    title: string
    thumbnail: string
    duration?: string
    formats: VideoFormat[]
}

// Pinterest Icon
function PinterestIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
    )
}

// Instagram Icon
function InstagramIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
    )
}

// YouTube Icon
function YouTubeIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    )
}

// Download Icon
function DownloadIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    )
}

// Link Icon
function LinkIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    )
}

export function VideoDownloader() {
    const [activeTab, setActiveTab] = createSignal('pinterest')
    const [url, setUrl] = createSignal('')
    const [loading, setLoading] = createSignal(false)
    const [error, setError] = createSignal('')
    const [videoInfo, setVideoInfo] = createSignal<VideoInfo | null>(null)

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const inputUrl = url().trim()

        if (!inputUrl) {
            setError('Please enter a valid URL')
            return
        }

        setLoading(true)
        setError('')
        setVideoInfo(null)

        try {
            let result: VideoInfo

            if (activeTab() === 'pinterest') {
                if (!inputUrl.includes('pinterest.com') && !inputUrl.includes('pin.it')) {
                    setError('Please enter a valid Pinterest URL')
                    setLoading(false)
                    return
                }
                result = await fetchPinterestVideo(inputUrl)
            } else if (activeTab() === 'instagram') {
                if (!inputUrl.includes('instagram.com')) {
                    setError('Please enter a valid Instagram URL')
                    setLoading(false)
                    return
                }
                result = await fetchInstagramVideo(inputUrl)
            } else {
                if (!inputUrl.includes('youtube.com') && !inputUrl.includes('youtu.be')) {
                    setError('Please enter a valid YouTube URL')
                    setLoading(false)
                    return
                }
                result = await fetchYouTubeVideo(inputUrl)
            }

            setVideoInfo(result)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch video. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = async (downloadUrl: string, filename: string) => {
        try {
            const response = await fetch(downloadUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (err) {
            // If direct download fails, open in new tab
            window.open(downloadUrl, '_blank')
        }
    }

    const resetForm = () => {
        setUrl('')
        setVideoInfo(null)
        setError('')
    }

    return (
        <Box py={{ base: '12', md: '16', lg: '24' }} bg="gray.1">
            <Container maxW="4xl">
                <Stack gap="8" align="center">
                    {/* Header */}
                    <Stack gap="4" textAlign="center">
                        <Heading
                            class={css({
                                fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
                                fontWeight: 'bold',
                                color: 'brand.dark',
                                letterSpacing: '-0.02em',
                            })}
                        >
                            Video Downloader
                        </Heading>
                        <Text
                            class={css({
                                fontSize: { base: 'md', md: 'lg' },
                                color: 'gray.11',
                                maxW: '2xl',
                            })}
                        >
                            Download videos from Pinterest, Instagram, and YouTube quickly and easily. Just paste the video URL and click download.
                        </Text>
                    </Stack>

                    {/* Main Card */}
                    <Card.Root w="full" p={{ base: '6', md: '8' }} shadow="lg" bg="white">
                        <Stack gap="6">
                            {/* Platform Tabs */}
                            <Tabs.Root
                                value={activeTab()}
                                onValueChange={(e) => {
                                    setActiveTab(e.value!)
                                    resetForm()
                                }}
                            >
                                <Tabs.List
                                    class={css({
                                        display: 'flex',
                                        gap: '2',
                                        p: '1',
                                        bg: 'gray.2',
                                        borderRadius: 'lg',
                                        w: 'full',
                                    })}
                                >
                                    <Tabs.Trigger
                                        value="pinterest"
                                        class={css({
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '2',
                                            py: '3',
                                            px: '4',
                                            borderRadius: 'md',
                                            fontWeight: 'medium',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            color: 'gray.11',
                                            _selected: {
                                                bg: 'white',
                                                color: '#E60023',
                                                shadow: 'sm',
                                            },
                                            _hover: {
                                                color: '#E60023',
                                            },
                                        })}
                                    >
                                        <PinterestIcon />
                                        Pinterest
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        value="instagram"
                                        class={css({
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '2',
                                            py: '3',
                                            px: '4',
                                            borderRadius: 'md',
                                            fontWeight: 'medium',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            color: 'gray.11',
                                            _selected: {
                                                bg: 'white',
                                                color: '#E4405F',
                                                shadow: 'sm',
                                            },
                                            _hover: {
                                                color: '#E4405F',
                                            },
                                        })}
                                    >
                                        <InstagramIcon />
                                        Instagram
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        value="youtube"
                                        class={css({
                                            flex: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '2',
                                            py: '3',
                                            px: '4',
                                            borderRadius: 'md',
                                            fontWeight: 'medium',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            color: 'gray.11',
                                            _selected: {
                                                bg: 'white',
                                                color: '#FF0000',
                                                shadow: 'sm',
                                            },
                                            _hover: {
                                                color: '#FF0000',
                                            },
                                        })}
                                    >
                                        <YouTubeIcon />
                                        YouTube
                                    </Tabs.Trigger>
                                </Tabs.List>

                                {/* URL Input Form */}
                                <Box mt="6">
                                    <form onSubmit={handleSubmit}>
                                        <Flex gap="3" flexDirection={{ base: 'column', sm: 'row' }}>
                                            <Box flex="1" position="relative">
                                                <Box
                                                    position="absolute"
                                                    left="3"
                                                    top="50%"
                                                    transform="translateY(-50%)"
                                                    color="gray.9"
                                                    zIndex="1"
                                                >
                                                    <LinkIcon />
                                                </Box>
                                                <Input
                                                    type="url"
                                                    placeholder={
                                                        activeTab() === 'pinterest'
                                                            ? 'Paste Pinterest video URL here...'
                                                            : activeTab() === 'instagram'
                                                                ? 'Paste Instagram video URL here...'
                                                                : 'Paste YouTube video URL here...'
                                                    }
                                                    value={url()}
                                                    onInput={(e) => setUrl(e.currentTarget.value)}
                                                    class={css({
                                                        pl: '10',
                                                        h: '12',
                                                        fontSize: 'md',
                                                        borderColor: 'gray.6',
                                                        _focus: {
                                                            borderColor: activeTab() === 'pinterest' ? '#E60023' : activeTab() === 'instagram' ? '#E4405F' : '#FF0000',
                                                            boxShadow: activeTab() === 'pinterest'
                                                                ? '0 0 0 1px #E60023'
                                                                : activeTab() === 'instagram'
                                                                    ? '0 0 0 1px #E4405F'
                                                                    : '0 0 0 1px #FF0000',
                                                        },
                                                    })}
                                                />
                                            </Box>
                                            <Button
                                                type="submit"
                                                disabled={loading()}
                                                bg={activeTab() === 'pinterest' ? '#E60023' : activeTab() === 'instagram' ? '#E4405F' : '#FF0000'}
                                                color="white"
                                                h="12"
                                                px="6"
                                                fontWeight="semibold"
                                                _hover={{
                                                    bg: activeTab() === 'pinterest' ? '#c5001f' : activeTab() === 'instagram' ? '#c13050' : '#cc0000',
                                                }}
                                                _disabled={{
                                                    opacity: 0.6,
                                                    cursor: 'not-allowed',
                                                }}
                                            >
                                                <Show when={loading()} fallback="Get Video">
                                                    <Spinner size="sm" />
                                                    <Box ml="2">Processing...</Box>
                                                </Show>
                                            </Button>
                                        </Flex>
                                    </form>
                                </Box>

                                {/* Error Message */}
                                <Show when={error()}>
                                    <Box
                                        mt="4"
                                        p="4"
                                        bg="red.2"
                                        borderRadius="md"
                                        border="1px solid"
                                        borderColor="red.6"
                                    >
                                        <Text color="red.11" fontWeight="medium">
                                            {error()}
                                        </Text>
                                    </Box>
                                </Show>

                                {/* Video Result */}
                                <Show when={videoInfo()}>
                                    <Box mt="6">
                                        <Card.Root bg="gray.1" p="6" borderRadius="lg">
                                            <Grid columns={{ base: 1, md: 2 }} gap="6">
                                                {/* Thumbnail */}
                                                <Box
                                                    borderRadius="lg"
                                                    overflow="hidden"
                                                    bg="gray.3"
                                                    aspectRatio="16/9"
                                                >
                                                    <img
                                                        src={videoInfo()!.thumbnail}
                                                        alt={videoInfo()!.title}
                                                        class={css({
                                                            w: 'full',
                                                            h: 'full',
                                                            objectFit: 'cover',
                                                        })}
                                                    />
                                                </Box>

                                                {/* Video Info & Downloads */}
                                                <Stack gap="4">
                                                    <Box>
                                                        <Text
                                                            fontWeight="semibold"
                                                            fontSize="lg"
                                                            color="gray.12"
                                                            lineClamp={2}
                                                        >
                                                            {videoInfo()!.title}
                                                        </Text>
                                                        <Show when={videoInfo()!.duration}>
                                                            <Text fontSize="sm" color="gray.10" mt="1">
                                                                Duration: {videoInfo()!.duration}
                                                            </Text>
                                                        </Show>
                                                    </Box>

                                                    <Box>
                                                        <Text fontWeight="medium" color="gray.11" mb="3">
                                                            Download Options:
                                                        </Text>
                                                        <Stack gap="2">
                                                            <For each={videoInfo()!.formats}>
                                                                {(format) => (
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDownload(
                                                                                format.url,
                                                                                `${videoInfo()!.title.substring(0, 50)}_${format.quality}.${format.format}`
                                                                            )
                                                                        }
                                                                        bg="brand.dark"
                                                                        color="white"
                                                                        w="full"
                                                                        h="10"
                                                                        justifyContent="space-between"
                                                                        _hover={{ bg: 'red.10' }}
                                                                    >
                                                                        <Flex align="center" gap="2">
                                                                            <DownloadIcon />
                                                                            <span>
                                                                                {format.quality} ({format.format.toUpperCase()})
                                                                            </span>
                                                                        </Flex>
                                                                        <Show when={format.size}>
                                                                            <Text fontSize="sm" opacity={0.8}>
                                                                                {format.size}
                                                                            </Text>
                                                                        </Show>
                                                                    </Button>
                                                                )}
                                                            </For>
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                            </Grid>
                                        </Card.Root>
                                    </Box>
                                </Show>
                            </Tabs.Root>
                        </Stack>
                    </Card.Root>

                    {/* Instructions */}
                    <Box w="full">
                        <Grid columns={{ base: 1, md: 3 }} gap="6">
                            <InstructionCard
                                step="1"
                                title="Copy Video URL"
                                description={`Go to ${activeTab() === 'pinterest' ? 'Pinterest' : activeTab() === 'instagram' ? 'Instagram' : 'YouTube'} and copy the video URL from your browser's address bar.`}
                            />
                            <InstructionCard
                                step="2"
                                title="Paste & Click"
                                description="Paste the URL in the input field above and click the 'Get Video' button."
                            />
                            <InstructionCard
                                step="3"
                                title="Download"
                                description="Choose your preferred quality and format, then click to download the video."
                            />
                        </Grid>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

function InstructionCard(props: { step: string; title: string; description: string }) {
    return (
        <Card.Root p="6" bg="white" shadow="sm">
            <Stack gap="3">
                <Flex
                    w="10"
                    h="10"
                    borderRadius="full"
                    bg="brand.primary"
                    color="white"
                    align="center"
                    justify="center"
                    fontWeight="bold"
                    fontSize="lg"
                >
                    {props.step}
                </Flex>
                <Text fontWeight="semibold" fontSize="lg" color="gray.12">
                    {props.title}
                </Text>
                <Text color="gray.10" fontSize="sm" lineHeight="relaxed">
                    {props.description}
                </Text>
            </Stack>
        </Card.Root>
    )
}
