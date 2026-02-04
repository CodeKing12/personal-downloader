import { createSignal } from 'solid-js'
import { css } from 'styled-system/css'
import { Box, Container, Stack, Flex } from 'styled-system/jsx'

const faqs = [
  {
    question: 'How do I download a video from Pinterest?',
    answer: 'Simply copy the Pinterest video URL from your browser, paste it into our downloader, and click "Get Video". Once the video is processed, you can choose your preferred quality and download it instantly.',
  },
  {
    question: 'How do I download YouTube videos?',
    answer: 'Copy the YouTube video link (from the address bar or share button), paste it into our downloader\'s YouTube tab, and click "Get Video". Select your preferred quality format (720p, 1080p, etc.) and download.',
  },
  {
    question: 'Is this video downloader free to use?',
    answer: 'Yes! Our video downloader is completely free to use. There are no hidden fees, no subscriptions required, and no download limits.',
  },
  {
    question: 'What video formats are supported?',
    answer: 'We support multiple video formats including MP4, WebM, and various quality options from 360p to 1080p (or higher when available). The available formats depend on the original video source.',
  },
  {
    question: 'Is it legal to download videos from Pinterest and YouTube?',
    answer: 'Downloading videos for personal use is generally acceptable. However, you should respect copyright laws and the terms of service of each platform. Do not redistribute copyrighted content without permission.',
  },
  {
    question: 'Why is my video not downloading?',
    answer: 'Some videos may be protected or restricted. Make sure the video URL is correct and the video is publicly accessible. If issues persist, try refreshing the page or using a different browser.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = createSignal<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex() === index ? null : index)
  }

  return (
    <Box py={{ base: '16', md: '24' }} bg="white">
      <Container maxW="5xl">
        <h2
          class={css({
            fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
            fontWeight: 'medium',
            color: 'brand.dark',
            mb: { base: '8', md: '12' },
          })}
        >
          Frequently Asked Questions
        </h2>

        <Stack gap="4">
          {faqs.map((faq, index) => (
            <Box
              bg="#F8F8F8"
              p={{ base: '6', md: '8' }}
              cursor="pointer"
              onClick={() => toggle(index)}
              transition="background-color 0.2s"
              _hover={{ bg: '#F2F2F2' }}
            >
              <Flex justifyContent="space-between" alignItems="flex-start" gap="4">
                <Flex gap={{ base: '4', md: '6' }} flex="1">
                  <span
                    class={css({
                      fontSize: { base: 'lg', md: 'xl' },
                      fontWeight: 'medium',
                      color: 'brand.dark',
                      flexShrink: 0,
                    })}
                  >
                    {index + 1}.
                  </span>
                  <Stack gap="4" w="full">
                    <h3
                      class={css({
                        fontSize: { base: 'lg', md: 'xl' },
                        fontWeight: 'medium',
                        color: 'brand.dark',
                        pr: '8',
                      })}
                    >
                      {faq.question}
                    </h3>
                    <Box
                      display={openIndex() === index ? 'block' : 'none'}
                      class={css({
                        fontSize: 'md',
                        color: 'gray.600',
                        lineHeight: 'relaxed',
                        maxW: '3xl',
                      })}
                    >
                      {faq.answer}
                    </Box>
                  </Stack>
                </Flex>

                <Box color="gray.400" mt="1" flexShrink={0}>
                  {openIndex() === index ? <MinusIcon /> : <PlusIcon />}
                </Box>
              </Flex>
            </Box>
          ))}
        </Stack>

        <Flex
          justifyContent={{ base: 'center', md: 'flex-end' }}
          mt="8"
          fontSize="sm"
          color="gray.600"
          alignItems="center"
          gap="1.5"
          flexWrap="wrap"
        >
          <span>Still Searching for the Answer You Need?</span>
          <a
            href="#"
            class={css({
              textDecoration: 'underline',
              color: 'brand.dark',
              fontWeight: 'medium',
              _hover: { color: 'brand.primary' },
            })}
          >
            View FaQ Page
          </a>
          <span>or</span>
          <a
            href="#"
            class={css({
              textDecoration: 'underline',
              color: 'brand.dark',
              fontWeight: 'medium',
              _hover: { color: 'brand.primary' },
            })}
          >
            Contact Us
          </a>
        </Flex>
      </Container>
    </Box>
  )
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
