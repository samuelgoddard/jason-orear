import '@/styles/main.css'
import Header from '@/components/header'
import SEO from '@/helpers/seo.config'
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { fade } from "@/helpers/transitions"
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import * as gtag from '@/helpers/gtag'
import { Context } from '../context/state';
import { ColorContext } from '../context/primary';
import { SecondaryColorContext } from '../context/secondary';
import Div100vh from 'react-div-100vh'
import { isWindows } from "react-device-detect";

const reveal = {
  visible: { y: '100%' },
  hidden: { y: 0 }
}

const typeIn = {
  visible: { display: 'inline-block' },
  hidden: { display: 'none' }
}

const revealBox = {
  visible: { y: '-100%' },
  hidden: { y: 0 }
}

const revealTop = {
  visible: { y: '-100%' },
  hidden: { y: 0 }
}

const introEnd = {
  visible: { opacity: 0 },
  hidden: { opacity: '100%' }
}

const revealHoriReverse = {
  visible: { x: '-100%' },
  hidden: { x: 0 },
}

const revealHoriReverseBox = {
  visible: { x: '100%' },
  hidden: { x: 0 },
}

const imageRevealUp = {
  visible: { y: '-100%' },
  hidden: { y: 0 }
}

const imageRevealDown = {
  visible: { y: '100%' },
  hidden: { y: 0 }
}

const imageRevealLeft = {
  visible: { x: '-100%' },
  hidden: { x: 0 }
}

const imageRevealRight = {
  visible: { x: '100%' },
  hidden: { x: 0 }
}

const imageScale = {
  visible: { scale: 1.005 },
  hidden: { scale: 1.3 }
}

export default function App({ Component, pageProps }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(true);

  const [introContext, setIntroContext] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FFB31F');
  const [secondaryColor, setSecondaryColor] = useState('#FF7D1F');
  const [windows, setWindows] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setWindows(isWindows)

    const imageSwap1 = setTimeout(() => {
      setImage2(true);
      setImage3(false);
      setImage4(false);
      setImage5(false);
      setImage1(false);
    }, 350);

    const imageSwap2 = setTimeout(() => {
      setImage2(false);
      setImage3(true);
      setImage4(false);
      setImage5(false);
      setImage1(false);
    }, 700);
    
    const imageSwap3 = setTimeout(() => {
      setImage2(false);
      setImage3(false);
      setImage4(true);
      setImage5(false);
      setImage1(false);
    }, 1050);
    
    const imageSwap4 = setTimeout(() => {
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setImage5(false);
      setImage1(true);
    }, 1400);
    
    const imageSwap5 = setTimeout(() => {
      setImage2(true);
      setImage3(false);
      setImage4(false);
      setImage5(false);
      setImage1(false);
    }, 1750);
    
    const imageSwap6 = setTimeout(() => {
      setImage2(false);
      setImage3(true);
      setImage4(false);
      setImage5(false);
      setImage1(false);
    }, 2100);

    const imageSwap7 = setTimeout(() => {
      setImage2(false);
      setImage3(false);
      setImage4(true);
      setImage5(false);
      setImage1(false);
    }, 2450);

    const imageSwap8 = setTimeout(() => {
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setImage5(true);
      setImage1(false);
    }, 2800);
    
    const imageSwap9 = setTimeout(() => {
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setImage5(false);
      setImage1(true);
    }, 3150);

    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }

  },[setWindows, router.events]);  

  return (
    <>
      { pageProps.preview && <><div className={'fixed bottom-0 w-full p-2 bg-red opacity-75 text-white justify-center flex z-50 uppercase font-medium'}>! Preview Mode Enabled - <a className={'px-1 underline'} href={`/api/exit-preview?currentRoute=${router.route}`}>Click Here To Exit</a> !</
      div></> }
      <DefaultSeo {...SEO} />
      <SecondaryColorContext.Provider value={
        [secondaryColor, setSecondaryColor]
      }>
      <ColorContext.Provider value={
        [primaryColor, setPrimaryColor]
      }>
        <div 
          className={`scroll-conainer transition-colors ease-in-out duration-700 delay-[400ms] ${windows ? 'windows' : 'mac'}`}
          style={{ backgroundColor: router.asPath === '/wayfinder' ? primaryColor : '#FFFFFF' }}
        >
        <Context.Provider value={[introContext, setIntroContext]}>

          <Header route={router.asPath} />
          
          {/* INTRO START */}
          <LazyMotion features={domAnimation}>
            { !introContext && router.asPath == '/' && (
              <m.div 
                initial="hidden"
                animate="visible"
                variants={introEnd}
                transition={{ delay: 2, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                className="bg-white fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]"
              >
                <Div100vh className="bg-white fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]">
                  {/* <div className={`fixed top-0 left-0 right-0 w-full z-30 flex flex-wrap justify-center mt-5 `}>
                    <div className="block overflow-hidden">
                      <m.div 
                        initial="hidden"
                        animate="visible"
                        variants={revealTop}
                        transition={{ delay: 0.75, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                      >
                        <span className="block leading-none font-mono uppercase text-[14px] md:text-[16px]">Jason O'Rear</span>
                      </m.div>
                    </div>
                  </div> */}

                  <div className="my-auto">
                    <div className="w-full h-[60vh] md:h-[63vh] relative mt-[-2vw] overflow-hidden flex items-center justify-center">
                      <div className="relative overflow-hidden">
                      <m.svg
                        initial="hidden" animate="visible"
                        variants={revealHoriReverse}
                        transition={{ delay: 1.5, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                        className="block w-[65px] md:w-[90px]" width="90" height="39" viewBox="0 0 90 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.1, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M0.401515 13.34L0.301514 14.96C1.12151 15.1 1.84151 15.12 2.64151 15.12C5.38151 15.12 7.30151 13.84 7.30151 10.94V1H1.04151V2.62H5.48151V11C5.48151 12.9 4.40151 13.52 2.48151 13.52C1.66151 13.52 1.08151 13.48 0.401515 13.34Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.2, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M17.1137 3.68L19.2537 9.82H14.9737L17.1137 3.68ZM11.3337 15H13.1537L14.3937 11.44H19.8337L21.0737 15H22.9137L17.9337 1H16.3137L11.3337 15Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.3, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M30.166 15.16C33.126 15.16 35.126 13.6 35.126 11.22C35.126 5.62003 27.326 7.70003 27.326 4.50003C27.326 3.24003 28.386 2.46003 30.106 2.46003C31.786 2.46003 33.006 3.42003 33.266 4.94003L34.926 4.30003C34.566 2.26003 32.646 0.840027 30.106 0.840027C27.406 0.840027 25.466 2.32003 25.466 4.50003C25.466 9.46003 33.246 7.50003 33.246 11.24C33.246 12.64 32.006 13.54 30.186 13.54C28.406 13.54 26.906 12.26 26.666 10.3L24.906 10.86C25.366 13.42 27.506 15.16 30.166 15.16Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.4, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M43.0981 15.16C46.4981 15.16 48.6581 12.4 48.6581 8.00003C48.6581 3.60003 46.4981 0.840027 43.0981 0.840027C39.6981 0.840027 37.5381 3.60003 37.5381 8.00003C37.5381 12.4 39.6981 15.16 43.0981 15.16ZM39.4181 8.00003C39.4181 4.62003 40.7381 2.46003 43.0981 2.46003C45.4581 2.46003 46.7781 4.62003 46.7781 8.00003C46.7781 11.38 45.4581 13.52 43.0981 13.52C40.7381 13.52 39.4181 11.38 39.4181 8.00003Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.5, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M51.1704 15H52.9304V4L59.0504 15H61.0104V1H59.2304V12L53.1304 1H51.1704V15Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.6, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M7.16158 23.72L1.84158 38H0.121582L5.44158 23.72H7.16158Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.7, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M27.3552 38.16C30.7552 38.16 32.9152 35.4 32.9152 31C32.9152 26.6 30.7552 23.84 27.3552 23.84C23.9552 23.84 21.7952 26.6 21.7952 31C21.7952 35.4 23.9552 38.16 27.3552 38.16ZM23.6752 31C23.6752 27.62 24.9952 25.46 27.3552 25.46C29.7152 25.46 31.0352 27.62 31.0352 31C31.0352 34.38 29.7152 36.52 27.3552 36.52C24.9952 36.52 23.6752 34.38 23.6752 31Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.8, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M37.6074 23.94C37.434 24.6334 37.1807 25.4134 36.8474 26.28C36.5274 27.1334 36.2074 27.9134 35.8874 28.62H34.5874C34.7207 28.1134 34.8474 27.5734 34.9674 27C35.1007 26.4134 35.2207 25.84 35.3274 25.28C35.434 24.7067 35.5207 24.1867 35.5874 23.72H37.4674L37.6074 23.94Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.9, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M40.1836 38H42.0236V31.76H44.8836L48.4436 38H50.5236L46.7236 31.48C48.2636 30.92 49.2236 29.6 49.2236 27.88C49.2236 25.54 47.5436 24 45.0236 24H40.1836V38ZM42.0036 30.12V25.62H44.8236C46.4236 25.62 47.3836 26.46 47.3836 27.88C47.3836 29.3 46.4236 30.12 44.8236 30.12H42.0036Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 1, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M53.4756 38H62.8956V36.36H55.2956V31.38H61.3756V29.74H55.2956V25.62H62.6756V24H53.4756V38Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 1., duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M70.8279 26.68L72.9678 32.82H68.6879L70.8279 26.68ZM65.0479 38H66.8679L68.1079 34.44H73.5479L74.7879 38H76.6279L71.6479 24H70.0279L65.0479 38Z" fill="#000"/>
                        <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 1.2, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M79.1599 38H80.9999V31.76H83.8599L87.4199 38H89.4999L85.6999 31.48C87.2399 30.92 88.1999 29.6 88.1999 27.88C88.1999 25.54 86.5199 24 83.9999 24H79.1599V38ZM80.9799 30.12V25.62H83.7999C85.3999 25.62 86.3599 26.46 86.3599 27.88C86.3599 29.3 85.3999 30.12 83.7999 30.12H80.9799Z" fill="#000"/>
                        </m.svg>

                        {/* <m.svg
                          variants={revealHoriReverse}
                          transition={{ delay: 1.5, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                          className="block w-[65px] md:w-[90px]" viewBox="0 0 90 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.402 13.34l-.1 1.62c.82.14 1.54.16 2.34.16 2.74 0 4.66-1.28 4.66-4.18V1h-6.26v1.62h4.44V11c0 1.9-1.08 2.52-3 2.52-.82 0-1.4-.04-2.08-.18zM17.114 3.68l2.14 6.14h-4.28l2.14-6.14zM11.334 15h1.82l1.24-3.56h5.44l1.24 3.56h1.84l-4.98-14h-1.62l-4.98 14zM30.166 15.16c2.96 0 4.96-1.56 4.96-3.94 0-5.6-7.8-3.52-7.8-6.72 0-1.26 1.06-2.04 2.78-2.04 1.68 0 2.9.96 3.16 2.48l1.66-.64c-.36-2.04-2.28-3.46-4.82-3.46-2.7 0-4.64 1.48-4.64 3.66 0 4.96 7.78 3 7.78 6.74 0 1.4-1.24 2.3-3.06 2.3-1.78 0-3.28-1.28-3.52-3.24l-1.76.56c.46 2.56 2.6 4.3 5.26 4.3zM43.098 15.16c3.4 0 5.56-2.76 5.56-7.16S46.498.84 43.098.84c-3.4 0-5.56 2.76-5.56 7.16s2.16 7.16 5.56 7.16zM39.418 8c0-3.38 1.32-5.54 3.68-5.54 2.36 0 3.68 2.16 3.68 5.54s-1.32 5.52-3.68 5.52c-2.36 0-3.68-2.14-3.68-5.52zM51.17 15h1.76V4l6.12 11h1.96V1h-1.78v11l-6.1-11h-1.96v14zM7.162 23.72L1.842 38H.122l5.32-14.28h1.72zM27.355 38.16c3.4 0 5.56-2.76 5.56-7.16s-2.16-7.16-5.56-7.16c-3.4 0-5.56 2.76-5.56 7.16s2.16 7.16 5.56 7.16zM23.675 31c0-3.38 1.32-5.54 3.68-5.54 2.36 0 3.68 2.16 3.68 5.54s-1.32 5.52-3.68 5.52c-2.36 0-3.68-2.14-3.68-5.52zM37.607 23.94a20.4 20.4 0 01-.76 2.34 38.22 38.22 0 01-.96 2.34h-1.3c.134-.507.26-1.047.38-1.62.134-.587.254-1.16.36-1.72.107-.573.194-1.093.26-1.56h1.88l.14.22zM40.184 38h1.84v-6.24h2.86l3.56 6.24h2.08l-3.8-6.52c1.54-.56 2.5-1.88 2.5-3.6 0-2.34-1.68-3.88-4.2-3.88h-4.84v14zm1.82-7.88v-4.5h2.82c1.6 0 2.56.84 2.56 2.26s-.96 2.24-2.56 2.24h-2.82zM53.476 38h9.42v-1.64h-7.6v-4.98h6.08v-1.64h-6.08v-4.12h7.38V24h-9.2v14zM70.828 26.68l2.14 6.14h-4.28l2.14-6.14zM65.048 38h1.82l1.24-3.56h5.44l1.24 3.56h1.84l-4.98-14h-1.62l-4.98 14zM79.16 38H81v-6.24h2.86L87.42 38h2.08l-3.8-6.52c1.54-.56 2.5-1.88 2.5-3.6 0-2.34-1.68-3.88-4.2-3.88h-4.84v14zm1.82-7.88v-4.5h2.82c1.6 0 2.56.84 2.56 2.26s-.96 2.24-2.56 2.24h-2.82z" fill="currentColor"/></m.svg> */}
                          
                          {/* <m.div
                            variants={revealHoriReverseBox}
                            transition={{ delay: 0.25, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                            className="absolute inset-0 bg-white"
                          ></m.div> */}
                      </div>
                      
                      {/* <m.div
                        initial="hidden"
                        animate="visible"
                        variants={imageRevealUp}
                        transition={{ delay: 0.8, duration: 2, ease: [0.83, 0, 0.17, 1] }}
                        className="w-full h-[50%] bg-white absolute top-0 left-0 right-0 z-10"
                      ></m.div>
                      <m.div
                        initial="hidden"
                        animate="visible"
                        variants={imageRevealDown}
                        transition={{ delay: 0.8, duration: 2, ease: [0.83, 0, 0.17, 1] }}
                        className="w-full h-[50%] bg-white absolute bottom-0 left-0 right-0 z-10"
                      ></m.div> */}

                      {/* <m.div
                        initial="hidden"
                        animate="visible"
                        variants={imageRevealLeft}
                        transition={{ delay: 0.8, duration: 3, ease: [0.83, 0, 0.17, 1] }}
                        className="w-[50%] h-full bg-white absolute top-0 bottom-0 left-0 z-10"
                      ></m.div>
                      <m.div
                        initial="hidden"
                        animate="visible"
                        variants={imageRevealRight}
                        transition={{ delay: 0.8, duration: 3, ease: [0.83, 0, 0.17, 1] }}
                        className="w-[50%] h-full bg-white absolute top-0 bottom-0 right-0 z-10"
                      ></m.div> */}

                      {/* <m.div 
                        initial="hidden"
                        animate="visible"
                        variants={introEnd}
                        transition={{ delay: 4.25, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                        className="absolute inset-0 flex items-center justify-center z-10 mix-blend-difference"
                      >
                        <svg className="w-36 md:w-40 xl:w-48 mix-blend-difference" viewBox="0 0 163 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M99.182 0v1.923h.892L99.101 4.2h1.055l1.054-2.138V0h-2.028zM0 15.475C0 18.987 1.954 21 5.346 21c3.369 0 5.323-2.08 5.323-5.592V4.49h-2.56v10.894c0 2.617-1.258 3.535-2.763 3.535-1.685 0-2.875-1.186-2.875-3.445H0zM20.118 4.49l-6.042 16.22h2.606l1.258-3.558h7.075l1.28 3.557h2.785L22.948 4.491h-2.83zm-1.415 10.515l2.74-7.74 2.786 7.74h-5.526zM35.93 13.193l2 .402c1.751.358 3.368 1.03 3.368 2.707 0 1.566-1.482 2.573-3.593 2.573-2.291 0-3.796-1.141-4.268-3.356h-2.516c.382 3.4 2.92 5.481 6.694 5.481 3.167 0 6.266-1.678 6.266-4.9 0-3.265-2.852-4.25-5.458-4.786l-1.931-.403c-1.393-.29-2.471-.984-2.471-2.326 0-1.7 2.044-2.26 3.234-2.26 1.55 0 3.325.582 3.841 2.506h2.47C42.939 5.565 40.356 4.2 37.369 4.2c-2.74 0-5.953 1.432-5.953 4.496 0 2.73 2.202 4.027 4.515 4.497zM54.629 21c4.717 0 7.681-3.467 7.681-8.411 0-4.944-2.965-8.389-7.681-8.389-4.74 0-7.704 3.445-7.704 8.389 0 4.944 2.964 8.411 7.704 8.411zm0-2.125c-2.853 0-5.076-2.215-5.076-6.286 0-4.072 2.223-6.264 5.076-6.264 2.83 0 5.053 2.192 5.053 6.264 0 4.071-2.223 6.286-5.053 6.286zM76.017 20.71h3.572V4.49h-2.516v13.4l-7.188-13.4h-3.57v16.22h2.515V7.286l7.187 13.422zM91.29 21c4.717 0 7.682-3.467 7.682-8.411 0-4.944-2.965-8.389-7.682-8.389-4.739 0-7.704 3.445-7.704 8.389 0 4.944 2.965 8.411 7.704 8.411zm0-2.125c-2.852 0-5.076-2.215-5.076-6.286 0-4.072 2.224-6.264 5.076-6.264 2.83 0 5.054 2.192 5.054 6.264 0 4.071-2.224 6.286-5.054 6.286zM109.4 13.864l3.481 6.845h2.875l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594zM119.343 4.49v16.22h11.276v-2.17h-8.715v-5.101h8.221V11.29h-8.221v-4.63h8.715V4.49h-11.276zM139.012 4.49l-6.042 16.22h2.605l1.258-3.558h7.075l1.28 3.557h2.786l-6.132-16.218h-2.83zm-1.415 10.515l2.74-7.74 2.785 7.74h-5.525zM156.644 13.864l3.481 6.845H163l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594z" fill="#fff"/></svg>
                      </m.div> */}

                      {/* <m.div 
                        initial="hidden"
                        animate="visible"
                        variants={imageScale}
                        transition={{ delay: 0.8, duration: 3, ease: [0.785, 0.135, 0.150, 0.860] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <div className={`absolute inset-0 w-full h-full transition-opacity ease-in-out duration-300 ${image1 ? 'opacity-100' : 'opacity-0'}`}>
                          <Image
                            src="https://cdn.sanity.io/images/bz4bqlqj/production/46ecb27426d4e6e4ab023e78c2786760da7c4e9d-3000x2000.jpg"
                            alt="Placeholder"
                            layout="fill"
                            className={`w-full h-full object-cover object-center`}
                            priority
                          />
                        </div>

                        <div className={`absolute inset-0 w-full h-full transition-opacity ease-in-out duration-300 ${image2 ? 'opacity-100' : 'opacity-0'}`}>
                          <Image
                            src="https://cdn.sanity.io/images/bz4bqlqj/production/217e819c0d00281a66eb3e527c6e84cd436dbe71-3278x2184.jpg"
                            alt="Placeholder"
                            layout="fill"
                            className={`w-full h-full object-cover object-center`}
                            priority
                          />
                        </div>

                        <div className={`absolute inset-0 w-full h-full transition-opacity ease-in-out duration-300 ${image3 ? 'opacity-100' : 'opacity-0'}`}>
                          <Image
                            src="https://cdn.sanity.io/images/bz4bqlqj/production/55bc9b0a7335cd9784d61a8cd74da6c6187e68f4-3000x2000.jpg"
                            layout="fill"
                            className={`w-full h-full object-cover object-center`}
                            priority
                          />
                        </div>

                        <div className={`absolute inset-0 w-full h-full transition-opacity ease-in-out duration-300 ${image4 ? 'opacity-100' : 'opacity-0'}`}>
                          <Image
                            src="https://cdn.sanity.io/images/bz4bqlqj/production/1406a374d248a15090b981dc2269a1432d3e7659-3000x1875.jpg"
                            layout="fill"
                            className={`w-full h-full object-cover object-center`}
                            priority
                          />
                        </div>

                        <div className={`absolute inset-0 w-full h-full transition-opacity ease-in-out duration-300 ${image5 ? 'opacity-100' : 'opacity-0'}`}>
                          <Image
                            src="https://cdn.sanity.io/images/bz4bqlqj/production/b7cb7ca21f2961aa840d33c7fd0f4f18d7fec380-3000x1688.jpg"
                            layout="fill"
                            className={`w-full h-full object-cover object-center`}
                            priority
                          />
                        </div>
                      </m.div> */}
                    </div>
                  </div>

                  
                </Div100vh>
              </m.div>
            )}
          </LazyMotion>
          {/* INTRO END */}
          
          <AnimatePresence exitBeforeEnter>            
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </Context.Provider>
      </div>
      </ColorContext.Provider>
      </SecondaryColorContext.Provider>
    </>
  )
}