import '@/styles/main.css'
import Header from '@/components/header'
import SEO from '@/helpers/seo.config'
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { fade } from "@/helpers/transitions"
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Context } from '../context/state';
import Div100vh from 'react-div-100vh'

const reveal = {
  visible: { y: 0 },
  hidden: { y: '100%' }
}

const revealTop = {
  visible: { y: 0 },
  hidden: { y: '-100%' }
}

const introEnd = {
  visible: { opacity: 0 },
  hidden: { opacity: '100%' }
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

  useEffect(() => {
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
  },[]);

  const router = useRouter()

  return (
    <>
      { pageProps.preview && <><div className={'fixed bottom-0 w-full p-2 bg-red opacity-75 text-white justify-center flex z-50 uppercase font-medium'}>! Preview Mode Enabled - <a className={'px-1 underline'} href={`/api/exit-preview?currentRoute=${router.route}`}>Click Here To Exit</a> !</
      div></> }
      <DefaultSeo {...SEO} />

      <div className={`scroll-conainer transition-colors ease-in-out duration-700 delay-[400ms] ${router.asPath === '/wayfinder' ? 'bg-yellow' : 'bg-#FFFFFF' }`}>
        <Context.Provider value={[introContext, setIntroContext]}>

          <Header route={router.asPath} />
          
          {/* INTRO START */}
          <LazyMotion features={domAnimation}>
            { !introContext && router.asPath == '/' && (
              <m.div 
                initial="hidden"
                animate="visible"
                variants={introEnd}
                transition={{ delay: 3.2, duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
                className="bg-white fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]"
              >
                <Div100vh className="bg-white fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]">
                  <div className={`fixed top-0 left-0 right-0 w-full z-30 flex flex-wrap justify-center mt-5 `}>
                    <div className="block overflow-hidden">
                      <m.div 
                        initial="hidden"
                        animate="visible"
                        variants={revealTop}
                        transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
                      >
                        <svg className="w-[105px] md:w-36 xl:w-40 h-[30px]" viewBox="0 0 163 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M99.182 0v1.923h.892L99.101 4.2h1.055l1.054-2.138V0h-2.028zM0 15.475C0 18.987 1.954 21 5.346 21c3.369 0 5.323-2.08 5.323-5.592V4.49h-2.56v10.894c0 2.617-1.258 3.535-2.763 3.535-1.685 0-2.875-1.186-2.875-3.445H0zM20.118 4.49l-6.042 16.22h2.606l1.258-3.558h7.075l1.28 3.557h2.785L22.948 4.491h-2.83zm-1.415 10.515l2.74-7.74 2.786 7.74h-5.526zM35.93 13.193l2 .402c1.751.358 3.368 1.03 3.368 2.707 0 1.566-1.482 2.573-3.593 2.573-2.291 0-3.796-1.141-4.268-3.356h-2.516c.382 3.4 2.92 5.481 6.694 5.481 3.167 0 6.266-1.678 6.266-4.9 0-3.265-2.852-4.25-5.458-4.786l-1.931-.403c-1.393-.29-2.471-.984-2.471-2.326 0-1.7 2.044-2.26 3.234-2.26 1.55 0 3.325.582 3.841 2.506h2.47C42.939 5.565 40.356 4.2 37.369 4.2c-2.74 0-5.953 1.432-5.953 4.496 0 2.73 2.202 4.027 4.515 4.497zM54.629 21c4.717 0 7.681-3.467 7.681-8.411 0-4.944-2.965-8.389-7.681-8.389-4.74 0-7.704 3.445-7.704 8.389 0 4.944 2.964 8.411 7.704 8.411zm0-2.125c-2.853 0-5.076-2.215-5.076-6.286 0-4.072 2.223-6.264 5.076-6.264 2.83 0 5.053 2.192 5.053 6.264 0 4.071-2.223 6.286-5.053 6.286zM76.017 20.71h3.572V4.49h-2.516v13.4l-7.188-13.4h-3.57v16.22h2.515V7.286l7.187 13.422zM91.29 21c4.717 0 7.682-3.467 7.682-8.411 0-4.944-2.965-8.389-7.682-8.389-4.739 0-7.704 3.445-7.704 8.389 0 4.944 2.965 8.411 7.704 8.411zm0-2.125c-2.852 0-5.076-2.215-5.076-6.286 0-4.072 2.224-6.264 5.076-6.264 2.83 0 5.054 2.192 5.054 6.264 0 4.071-2.224 6.286-5.054 6.286zM109.4 13.864l3.481 6.845h2.875l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594zM119.343 4.49v16.22h11.276v-2.17h-8.715v-5.101h8.221V11.29h-8.221v-4.63h8.715V4.49h-11.276zM139.012 4.49l-6.042 16.22h2.605l1.258-3.558h7.075l1.28 3.557h2.786l-6.132-16.218h-2.83zm-1.415 10.515l2.74-7.74 2.785 7.74h-5.525zM156.644 13.864l3.481 6.845H163l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594z" fill="currentColor"/></svg>
                      </m.div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <div className="w-full h-[60vh] md:h-[63vh] relative mt-[-2vw] bg-gray-200 overflow-hidden">
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

                      <m.div
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
                      ></m.div>

                      {/* <m.div 
                        initial="hidden"
                        animate="visible"
                        variants={introEnd}
                        transition={{ delay: 4.25, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                        className="absolute inset-0 flex items-center justify-center z-10 mix-blend-difference"
                      >
                        <svg className="w-36 md:w-40 xl:w-48 mix-blend-difference" viewBox="0 0 163 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M99.182 0v1.923h.892L99.101 4.2h1.055l1.054-2.138V0h-2.028zM0 15.475C0 18.987 1.954 21 5.346 21c3.369 0 5.323-2.08 5.323-5.592V4.49h-2.56v10.894c0 2.617-1.258 3.535-2.763 3.535-1.685 0-2.875-1.186-2.875-3.445H0zM20.118 4.49l-6.042 16.22h2.606l1.258-3.558h7.075l1.28 3.557h2.785L22.948 4.491h-2.83zm-1.415 10.515l2.74-7.74 2.786 7.74h-5.526zM35.93 13.193l2 .402c1.751.358 3.368 1.03 3.368 2.707 0 1.566-1.482 2.573-3.593 2.573-2.291 0-3.796-1.141-4.268-3.356h-2.516c.382 3.4 2.92 5.481 6.694 5.481 3.167 0 6.266-1.678 6.266-4.9 0-3.265-2.852-4.25-5.458-4.786l-1.931-.403c-1.393-.29-2.471-.984-2.471-2.326 0-1.7 2.044-2.26 3.234-2.26 1.55 0 3.325.582 3.841 2.506h2.47C42.939 5.565 40.356 4.2 37.369 4.2c-2.74 0-5.953 1.432-5.953 4.496 0 2.73 2.202 4.027 4.515 4.497zM54.629 21c4.717 0 7.681-3.467 7.681-8.411 0-4.944-2.965-8.389-7.681-8.389-4.74 0-7.704 3.445-7.704 8.389 0 4.944 2.964 8.411 7.704 8.411zm0-2.125c-2.853 0-5.076-2.215-5.076-6.286 0-4.072 2.223-6.264 5.076-6.264 2.83 0 5.053 2.192 5.053 6.264 0 4.071-2.223 6.286-5.053 6.286zM76.017 20.71h3.572V4.49h-2.516v13.4l-7.188-13.4h-3.57v16.22h2.515V7.286l7.187 13.422zM91.29 21c4.717 0 7.682-3.467 7.682-8.411 0-4.944-2.965-8.389-7.682-8.389-4.739 0-7.704 3.445-7.704 8.389 0 4.944 2.965 8.411 7.704 8.411zm0-2.125c-2.852 0-5.076-2.215-5.076-6.286 0-4.072 2.224-6.264 5.076-6.264 2.83 0 5.054 2.192 5.054 6.264 0 4.071-2.224 6.286-5.054 6.286zM109.4 13.864l3.481 6.845h2.875l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594zM119.343 4.49v16.22h11.276v-2.17h-8.715v-5.101h8.221V11.29h-8.221v-4.63h8.715V4.49h-11.276zM139.012 4.49l-6.042 16.22h2.605l1.258-3.558h7.075l1.28 3.557h2.786l-6.132-16.218h-2.83zm-1.415 10.515l2.74-7.74 2.785 7.74h-5.525zM156.644 13.864l3.481 6.845H163l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594z" fill="#fff"/></svg>
                      </m.div> */}

                      <m.div 
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
                      </m.div>
                    </div>
                  </div>

                  <div className="flex flex-wrap absolute bottom-0 left-0 right-0 mb-5">
                    <span className="w-full text-[14px] md:text-[22px] tracking-tight ml-auto leading-none uppercase text-center block">
                      <span className="block overflow-hidden">
                        <m.span 
                          initial="hidden"
                          animate="visible"
                          variants={reveal}
                          className="block"
                          transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
                        >
                          <span className="block leading-none">Architectural Photographer</span>
                        </m.span>
                      </span>
                    </span>
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
    </>
  )
}