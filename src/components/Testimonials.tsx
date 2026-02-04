import { css } from 'styled-system/css'
import { Box, Container, Grid, GridItem, HStack, Stack, Flex } from 'styled-system/jsx'

const testimonials = [
  {
    quote: "We've had good experiences with call centers through binox. We hired my own remote team that I have complete control over the remote team that means work from home at anywhere.",
    author: 'Mark Henry',
    role: 'Developer, Oklavery',
  },
  {
    quote: "Binox consultant for managing every stage of funding and selling. It's increased our team's efficiency and our managers' ability to oversee transactions with automation based on specific product.",
    author: 'Mark Henry',
    role: 'Developer, Oklavery',
  },
]

export function Testimonials() {
  return (
    <Box bg="white" py={{ base: '16', md: '20', lg: '24' }}>
      <Container maxW="7xl">
        {/* Header */}
        <Stack gap="4" alignItems="center" textAlign="center" mb={{ base: '12', md: '16' }}>
          <span
            class={css({
              fontSize: 'xs',
              fontWeight: 'semibold',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'brand.darkGreen',
            })}
          >
            Testimonials
          </span>
          <h2
            class={css({
              fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
              fontWeight: 'medium',
              color: 'brand.darkGreen',
              lineHeight: '1.2',
              maxW: '2xl',
            })}
          >
            What say our honored clients about binox
          </h2>
        </Stack>

        {/* Content Grid */}
        <Grid columns={{ base: 1, lg: 12 }} gap="6">
          {/* Testimonial Cards */}
          {testimonials.map((testimonial, index) => (
            <GridItem colSpan={{ base: 1, lg: 4 }}>
              <Box
                bg="#F4F7F4"
                p={{ base: '8', md: '10' }}
                h="full"
                display="flex"
                flexDirection="column"
              >
                {/* Quote Icon */}
                <Box mb="6">
                  <QuoteIcon />
                </Box>

                {/* Quote Text */}
                <p
                  class={css({
                    fontSize: 'md',
                    color: 'gray.600',
                    lineHeight: '1.8',
                    flex: '1',
                    mb: '8',
                  })}
                >
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <Box>
                  <p
                    class={css({
                      fontSize: 'md',
                      fontWeight: 'semibold',
                      color: 'brand.darkGreen',
                    })}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    class={css({
                      fontSize: 'sm',
                      color: 'gray.500',
                    })}
                  >
                    {testimonial.role}
                  </p>
                </Box>
              </Box>
            </GridItem>
          ))}

          {/* Rating Card */}
          <GridItem colSpan={{ base: 1, lg: 4 }}>
            <Box
              bg="#F4F7F4"
              p={{ base: '8', md: '10' }}
              h="full"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              {/* Rating Section */}
              <Stack gap="4" alignItems="center" textAlign="center" flex="1" justifyContent="center">
                <span
                  class={css({
                    fontSize: 'sm',
                    color: 'brand.darkGreen',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  })}
                >
                  Average Rating
                </span>
                <span
                  class={css({
                    fontSize: '6xl',
                    fontWeight: 'bold',
                    color: 'brand.darkGreen',
                    lineHeight: '1',
                  })}
                >
                  4.9
                </span>
                {/* Stars */}
                <HStack gap="1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon filled={star <= 4} halfFilled={star === 5} />
                  ))}
                </HStack>
                <span
                  class={css({
                    fontSize: 'sm',
                    color: 'brand.darkGreen',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  })}
                >
                  (30+) Customer reviews
                </span>
              </Stack>

              {/* Navigation Arrows */}
              <HStack gap="3" justifyContent="center" mt="8">
                <button
                  class={css({
                    w: '12',
                    h: '12',
                    borderRadius: 'full',
                    bg: 'brand.darkGreen',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    _hover: { opacity: 0.8 },
                  })}
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  class={css({
                    w: '12',
                    h: '12',
                    borderRadius: 'full',
                    bg: 'brand.darkGreen',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    _hover: { opacity: 0.8 },
                  })}
                >
                  <ArrowRightIcon />
                </button>
              </HStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

function QuoteIcon() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 32V19.2C0 15.7333 0.533333 12.5333 1.6 9.6C2.66667 6.66667 4.53333 3.73333 7.2 0.799999L12.8 4C10.9333 6.13333 9.6 8.13333 8.8 10C8 11.8667 7.46667 13.8667 7.2 16H16V32H0ZM24 32V19.2C24 15.7333 24.5333 12.5333 25.6 9.6C26.6667 6.66667 28.5333 3.73333 31.2 0.799999L36.8 4C34.9333 6.13333 33.6 8.13333 32.8 10C32 11.8667 31.4667 13.8667 31.2 16H40V32H24Z"
        fill="#C9A227"
      />
    </svg>
  )
}

function StarIcon(props: { filled?: boolean; halfFilled?: boolean }) {
  if (props.halfFilled) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stop-color="#C9A227" />
            <stop offset="50%" stop-color="#E5E7EB" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="url(#halfStar)"
        />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={props.filled ? '#C9A227' : '#E5E7EB'}
      />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19L5 12L12 5" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12H19" />
      <path d="M12 5L19 12L12 19" />
    </svg>
  )
}
