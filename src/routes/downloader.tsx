import { Box } from 'styled-system/jsx'
import { VideoDownloader } from '~/components/VideoDownloader'

export default function DownloaderPage() {
    return (
        <Box minH="100vh" bg="gray.1">
            <VideoDownloader />
        </Box>
    )
}
