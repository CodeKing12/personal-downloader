import { css } from 'styled-system/css'
import { Box, Container, Grid, GridItem, HStack, Stack } from 'styled-system/jsx'
import { For } from 'solid-js'
import { Image } from './ui/image'

const studies = [
  {
    title: 'Investment Overview for PharmaCo',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Financial Analysis for TechCorp',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    link: '#'
  },
//   {
//     title: 'Investment Reporting For Marico',
//     image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop',
//     link: '#'
//   }
]

const bottomStudies = [
  {
    title: 'Investment Overview for PharmaCo',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Financial Analysis for TechCorp',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'Investment Reporting For Marico',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop',
    link: '#'
  }
]

export function CaseStudies() {
  return (
    <Box py={{ base: '16', md: '24' }} bg="white" overflow="hidden">
      <Container maxW="8xl">
        <Grid columns={{ base: 1, xl: 12 }} gap={{ base: '12', lg: '8' }}>
          
          {/* Left Column: Text Content */}
          <GridItem colSpan={{ base: 1, xl: 4 }} alignContent="center">
            <Stack gap="8">
              <Box>
                <Box
                    display="inline-block"
                    bg="#E6F7F4"
                    color="brand.darkGreen"
                    px="3"
                    py="1"
                    fontSize="xs"
                    fontWeight="800"
                    letterSpacing="wider"
                    textTransform="uppercase"
                >
                  Case Studies
                </Box>
              </Box>

              <h2 class={css({ fontSize: { base: '4xl', lg: '5xl' }, fontWeight: 'normal', lineHeight: '1.1', color: 'black' })}>
                Have a Look on Zurick's <br/>
                <span class={css({ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'bold' })}>amazing Experience</span>
              </h2>

              <p class={css({ color: 'gray.500', lineHeight: 'relaxed', fontSize: 'md', maxW: 'md' })}>
                Gurus offers full range of consultancy and training for data consultation strategic ways for business consul and training methods for data consultation.
              </p>

              <HStack gap="4" pt="2">
                <NavButton icon="left" />
                <NavButton icon="right" />
              </HStack>
            </Stack>
          </GridItem>

          {/* Right Column: Cards */}
          <GridItem colSpan={{ base: 1, xl: 8 }}>
            <Grid columns={{ base: 1, md: 2 }} gap="8">
                <For each={studies}>
                    {(study) => <StudyCard study={study} />}
                </For>
            </Grid>
          </GridItem>
        </Grid>
         <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
                <For each={bottomStudies}>
                    {(study) => <StudyCard study={study} />}
                </For>
            </Grid>
      </Container>
    </Box>
  )
}

function NavButton(props: { icon: 'left' | 'right' }) {
    return (
        <button class={css({
            w: '12',
            h: '12',
            borderRadius: 'full',
            border: '1px solid',
            borderColor: 'gray.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            bg: 'transparent',
            color: 'gray.500',
            _hover: { bg: 'brand.darkGreen', borderColor: 'brand.darkGreen', color: 'white' }
        })}>
            {props.icon === 'left' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            )}
        </button>
    )
}

function StudyCard(props: { study: { title: string, image: string, link: string } }) {
    return (
        <Box 
            position="relative" 
            h="420px"
            bg="gray.200"
            role="group"
            overflow="hidden"
        >
            <Image
                // position="absolute"
                // inset="0"
                src={props.study.image}
                h="full"
                w="full"
                objectFit="cover"
                bgPosition="center"
                transition="transform 0.5s"
                _groupHover={{ transform: 'scale(1.05)' }}
            />
            
            {/* Overlay Container */}
            <Box
                position="absolute"
                bottom="0"
                left="0"
                w="full"
                display="flex"
                alignItems="stretch"
            >
                {/* White Background Layer (Behind the slice) */}
                <Box
                    position="absolute"
                    bottom="0"
                    right="0"
                    w="32" 
                    h="100%"
                    bg="white"
                    zIndex="0"
                />

                {/* Slate Content Box */}
                <Box
                    pos="relative"
                    flex={1}
                    display="inline-flex"
                    alignItems="center"
                    p="22px 29px 24px 24px"
                    // bg="#567276"
                    // p="6"
                    // flex="1"
                    // position="relative"
                    // zIndex="1"
                    // color="white"
                    // mr="16" // Leave space for the button width
                    // clipPath="polygon(0 0, 100% 0, calc(100% - 1.5rem) 100%, 0 100%)"
                    _after={{
                        content: " ",
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        height: "100%",
                        width: "150%",
                        bgColor: "#547079",
                        transform: "skewX(29deg)",
                        zIndex: "-1"
                    }}
                >
                    <Box h="full" minH="12" display="flex" alignItems="center">
                         <h3 class={css({ fontSize: 'lg', fontWeight: 'bold', lineHeight: '1.3' })}>
                            {props.study.title}
                        </h3>
                    </Box>
                </Box>

                {/* Arrow Button */}
                <a 
                    href={props.study.link}
                    class={css({
                        display: "flex",
                        alignItems: "flex-end",
                        position: "relative",
                        width: "58px",
                        transform: "skewX(29deg)",
                        backgroundColor: "initial",
                        overflow: "hidden",
                        marginRight: "10px",
                        marginLeft: "-1px",
                    })}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </Box>
        </Box>
    )
}
