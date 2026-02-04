import { css } from 'styled-system/css'
import { Box, Container, Grid, GridItem, Stack } from 'styled-system/jsx'

const features = [
  {
    title: 'Proven Results',
    description: 'Our 40+ years of expertise and local roots make us the premier event venue',
  },
  {
    title: 'Personal Guidance',
    description: 'Industry research organizations, the poster of mineral resources throughout vendy',
  },
  {
    title: 'Trusted Expertise',
    description: 'There are numerous developing to participate in vendy roundup, including the',
  },
  {
    title: 'Lasting Impact',
    description: 'Every day at the same hour an invariably dressed in a pressed by black woolen.',
  },
]

export function WhyChooseUs() {
  return (
    <Box>
      <Grid columns={{ base: 1, lg: 2 }} minH="800px">
        {/* Left Column: Content */}
        <GridItem 
            bg="brand.darkGreen" 
            color="white" 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            position="relative"
            overflow="hidden"
            p={{ base: '8', md: '16', lg: '24' }}
        >
            {/* Background decoration (subtle circles) */}
             <Box 
                position="absolute" 
                bottom="-20%" 
                left="-10%" 
                w="600px" 
                h="600px" 
                borderRadius="full" 
                bg="white" 
                opacity="0.03" 
            />
            <Box 
                position="absolute" 
                bottom="-10%" 
                left="-5%" 
                w="400px" 
                h="400px" 
                borderRadius="full" 
                bg="white" 
                opacity="0.03" 
            />

            <Container maxW="xl" position="relative" zIndex="1" ml={{ lg: 'auto' }} mr={{ lg: '8' }}>
                <Stack gap="12">
                    <Stack gap="4">
                        <span class={css({ fontSize: 'sm', fontWeight: 'medium', letterSpacing: 'wider', opacity: '0.9' })}>
                            Why choose us
                        </span>
                        <h2 class={css({ fontSize: { base: '3xl', md: '4xl', lg: '5xl' }, fontWeight: 'bold', lineHeight: '1.1' })}>
                            Why choosing our <br />
                            coaching is the best.
                        </h2>
                    </Stack>

                    <Grid columns={{ base: 1, sm: 2 }} gapY="12" gapX="8">
                        {features.map((feature) => (
                            <Stack gap="4">
                                <Box color="white">
                                    <CheckIcon />
                                </Box>
                                <h3 class={css({ fontSize: 'xl', fontWeight: 'medium' })}>
                                    {feature.title}
                                </h3>
                                <p class={css({ fontSize: 'sm', color: 'gray.300', lineHeight: 'relaxed', opacity: '0.8' })}>
                                    {feature.description}
                                </p>
                            </Stack>
                        ))}
                    </Grid>
                </Stack>
            </Container>
        </GridItem>

        {/* Right Column: Image */}
        <GridItem 
            bgImage="url(https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop)"
            bgSize="cover"
            bgPosition="center"
            minH={{ base: '400px', lg: 'auto' }}
        />
      </Grid>
    </Box>
  )
}

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
