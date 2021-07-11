import '@/styles/main.css'
import Header from '@/components/header'
import SEO from '@/helpers/seo.config'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      { pageProps.preview && <><div className={'fixed bottom-0 w-full p-2 bg-red opacity-75 text-white justify-center flex z-50 uppercase font-medium'}>! Preview Mode Enabled - <a className={'px-1 underline'} href={`/api/exit-preview?currentRoute=${router.route}`}>Click Here To Exit</a> !</
      div></> }
      <DefaultSeo {...SEO} />
      <Header />

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  )
}