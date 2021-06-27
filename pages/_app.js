import '@/styles/main.css'
import { useRef } from 'react'
import Header from '@/components/header'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const containerRef = useRef(null)

  return (
    <>
      <Header />

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  )
}