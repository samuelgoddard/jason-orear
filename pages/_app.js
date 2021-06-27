import '@/styles/main.css'
import { useRef } from 'react'
import Header from '@/components/header'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const containerRef = useRef(null)

  return (
    <>
      <Header />
    
      <LocomotiveScrollProvider
        options={
          {
            smooth: true,
            lerp: 0.035
          }
        }
        watch={[]}
        containerRef={containerRef}
      >
        <main data-scroll-container ref={containerRef} id="scroll-container">
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </main>
      </LocomotiveScrollProvider>
    </>
  )
}