import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.css'
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Video Downloader - Download Pinterest & YouTube Videos Free</Title>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar />
            <main style={{ flex: 1 }}>
              <Suspense>{props.children}</Suspense>
            </main>
          </Box>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}

import { Box } from 'styled-system/jsx'
