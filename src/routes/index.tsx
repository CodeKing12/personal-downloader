import { Box } from 'styled-system/jsx'
import { VideoDownloader } from '~/components/VideoDownloader'
import { FAQ } from '~/components/FAQ'

export default function Home() {
  return (
    <Box minH="100vh" bg="gray.1">
      <VideoDownloader />
      <FAQ />
    </Box>
  )
}


// https://consult.crowdytheme-demo.com/business-coach/
// https://reactheme.com/entro/construction/

/* 
faq
contact
blog
*/