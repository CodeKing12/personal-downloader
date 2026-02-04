import { For } from 'solid-js'
import { css } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'

const navLinks = [
  { label: 'Home', href: '/', active: false },
  { label: 'Video Downloader', href: '/downloader', active: false },
  { label: 'About', href: '/about', active: false },
  { label: 'Services', href: '/services', active: false },
  { label: 'Contact', href: '/contact', active: false },
]

export const Nav = () => {
  return (
    <HStack as="nav" gap="8" display={{ base: 'none', lg: 'flex' }}>
      <For each={navLinks}>
        {(link) => (
          <a
            href={link.href}
            class={css({
              fontSize: 'md',
              fontWeight: '500',
              color: 'brand.dark',
              textDecoration: 'none',
              transition: 'color 0.2s',
              _hover: { color: 'brand.primary' },
            })}
          >
            {link.label}
          </a>
        )}
      </For>
    </HStack>
  )
}
