import { css } from 'styled-system/css'
import { Box, Container, Flex, HStack } from 'styled-system/jsx'
import { Nav } from '~/components/Nav'
import { Button } from '~/components/ui/button'

export function Navbar() {
  return (
    <Box
      as="header"
      w="full"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.3"
    >
      <Container maxW="8xl" py="3">
        <Flex justify="space-between" align="center">
          <Flex gap="72px">
            {/* Logo */}
            <a href="/" class={css({ display: 'flex', alignItems: 'center', gap: '2', textDecoration: 'none' })}>
              {/* Simple icon placeholder similar to design */}
              <Box w="8" h="8" position="relative">
                <Box position="absolute" top="0" left="0" w="100%" h="100%" bg="brand.primary" transform="rotate(45deg)" borderRadius="sm" opacity="0.2" />
                <Box position="absolute" top="15%" left="15%" w="70%" h="70%" bg="brand.primary" transform="rotate(45deg)" borderRadius="sm" opacity="0.6" />
                <Box position="absolute" top="30%" left="30%" w="40%" h="40%" bg="brand.primary" transform="rotate(45deg)" borderRadius="sm" />
              </Box>
              <span class={css({ fontSize: '2xl', fontWeight: 'bold', color: 'brand.dark', letterSpacing: '-0.5px' })}>
                VideoSaver
              </span>
            </a>

            {/* Navigation */}
            <Nav />
          </Flex>

          <HStack gap="4">
            {/* Try Now Button */}
            <a href="/downloader">
              <Button
                bg="brand.primary"
                color="white"
                fontSize="md"
                _hover={{ bg: 'red.10' }}
              >
                Try Now - Free
              </Button>
            </a>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
