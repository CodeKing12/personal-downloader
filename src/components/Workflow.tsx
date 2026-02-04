import { css } from 'styled-system/css'
import { Box, Container, Grid, Stack } from 'styled-system/jsx'
import { For } from 'solid-js'

const steps = [
  {
    number: '1',
    title: 'Initial Consultation',
    description: 'We begin by understanding your vision, project requirements, and specific needs through an in-depth consultation.'
  },
  {
    number: '2',
    title: 'Detailed Planning',
    description: 'Our expert team develops comprehensive project plans, including design concepts, budget estimates, and projections.'
  },
  {
    number: '3',
    title: 'Execution',
    description: 'We bring your project to life with precision and expertise, utilizing top-quality materials and advanced techniques.'
  },
  {
    number: '4',
    title: 'Final Delivery',
    description: 'We conduct thorough quality checks and walk you through the completed project, ensuring every detail meets our high standards.'
  }
]

export function Workflow() {
  return (
    <Box py={{ base: '16', md: '24' }} bg="#F8F9FA">
      <Container maxW="8xl">
        <Stack gap="16">
            {/* Header */}
            <Stack gap="4" alignItems="center" textAlign="center">
                 <span class={css({ 
                    fontSize: 'xs', 
                    fontWeight: 'bold', 
                    color: 'brand.darkGreen', 
                    textTransform: 'uppercase', 
                    letterSpacing: 'widest',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3',
                    '&::before': { content: '""', w: '6', h: '2px', bg: 'brand.darkGreen' }
                 })}>
                    Our Project Workflow
                 </span>
                 <h2 class={css({ fontSize: { base: '3xl', md: '5xl' }, fontWeight: 'bold', color: 'black', lineHeight: '1.2', maxW: '2xl', letterSpacing: '-1px' })}>
                    A systematic approach that ensures quality
                 </h2>
            </Stack>

            {/* Steps Grid */}
            <Grid columns={{ base: 1, md: 2, lg: 4 }} gap="8">
                <For each={steps}>
                    {(step) => (
                        <Box bg="white" p="10" h="full" transition="transform 0.2s" _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}>
                            <Stack gap="8">
                                <span class={css({ 
                                    fontSize: '8xl', 
                                    fontWeight: 'bold', 
                                    lineHeight: '1',
                                    background: 'linear-gradient(180deg, #FDE68A 0%, rgba(255,255,255,0) 100%)', 
                                    backgroundClip: 'text',
                                    textFillColor: 'transparent',
                                    '-webkit-background-clip': 'text',
                                    '-webkit-text-fill-color': 'transparent',
                                    fontFamily: 'sans-serif'
                                })}>
                                    {step.number}
                                </span>
                                <Box>
                                    <h3 class={css({ fontSize: 'xl', fontWeight: 'bold', mb: '4', color: 'black' })}>
                                        {step.title}
                                    </h3>
                                    <p class={css({ color: 'gray.500', lineHeight: '1.7', fontSize: 'sm' })}>
                                        {step.description}
                                    </p>
                                </Box>
                            </Stack>
                        </Box>
                    )}
                </For>
            </Grid>
        </Stack>
      </Container>
    </Box>
  )
}
