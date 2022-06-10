import { useState, useEffect, useContext, useRef } from 'react'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import SanityPageService from '@/services/sanityPageService'
import { Context } from '../context/state'
import { ColorContext } from '../context/primary'
import { SecondaryColorContext } from '../context/secondary'
import Div100vh from 'react-div-100vh'
import { useWindowSize } from '@/helpers/window-size'
import ImageWrapper from '@/components/image-wrapper'

const query = `{
  "home": *[_type == "home"][0]{
    title,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
    featuredWork[]->{
      slug {
        current
      },
      referenceCode,
      title,
      gps,
      indexNumber,
      homeCarouselImage {
        hotspot {
          x,
          y
        },
        asset -> {
          ...
        }
      },
      homeCarouselVideo {
        asset-> {
          ...
        }
      },
      imageSlides[]{
        layout,
        images[] {
          asset-> {
            ...
          }
        }
      }
    }
  },
  "contact": *[_type == "contact"][0]{
    primaryColor,
    secondaryColor
  }
}`


const pageService = new SanityPageService(query)

export default function Home(initialData) {
  
  const { data: { home, contact }  } = pageService.getPreviewHook(initialData)()

  // Set the current project to non zero'd 1
  const [currentProject, setCurrentProject] = useState(1);
  const [hoveringNext, setHoveringNext] = useState(false);
  const [hoveringPrev, setHoveringPrev] = useState(false);
  // Check whether the intro has played from global state storage
  const [introContext, setIntroContext] = useContext(Context);
  const [primaryColor, setPrimaryColor] = useContext(ColorContext);
  const [secondaryColor, setSecondaryColor] = useContext(SecondaryColorContext);
  
  // Get current window size
  const windowSize = useWindowSize();
  
  // Split index number so we can rotate them a digit at a time
  let numberSplit = home.featuredWork[0].indexNumber.split("")
  let numberSplit1 = home.featuredWork[1].indexNumber.split("")
  let numberSplit2 = home.featuredWork[2].indexNumber.split("")
  let numberSplit3 = home.featuredWork[3].indexNumber.split("")
  let numberSplit4 = home.featuredWork[4].indexNumber.split("")
  let coords = ''
  let numberRoll = ''

  // Set translate properties dependant on currentProject state
  if (currentProject == 2) {
    coords = 'translate-y-[-13px] md:translate-y-[-16px]'
    numberRoll = 'translate-y-[-90px] md:translate-y-[-160px] 2xl:translate-y-[-200px]'
  } else if (currentProject == 3) {
    coords = 'translate-y-[-26px] md:translate-y-[-32px]'
    numberRoll = 'translate-y-[-180px] md:translate-y-[-320px] 2xl:translate-y-[-400px]'
  } else if (currentProject == 4) {
    coords = 'translate-y-[-39px] md:translate-y-[-48px]'
    numberRoll = 'translate-y-[-270px] md:translate-y-[-480px] 2xl:translate-y-[-600px]'
  } else if (currentProject == 5) {
    coords = 'translate-y-[-52px] md:translate-y-[-64px]'
    numberRoll = 'translate-y-[-360px] md:translate-y-[-640px] 2xl:translate-y-[-800px]'
  }

  useEffect(() => {
    // Set the intro global context to true after 4 seconds
    setPrimaryColor(contact.primaryColor)
    setSecondaryColor(contact.secondaryColor)
    setTimeout(() => {
      setIntroContext(true)
    }, 3500);

    // Set an interval that updates the currentProject every 3 seconds on mobile to rotate the projects
    // const i_id = setInterval(() => {
    //   if (currentProject == 5) {
    //     // If we hit the cap (5)... Reset...
    //     setCurrentProject(1)
    //   } else {
    //     // Else... Tick along...
    //     setCurrentProject(currentProject => currentProject+1)
    //   }
    //   // If introContext is set delay the ticker by 4 seconds (defined above)
    // }, introContext ? 4000 : 6000);
    // return () => {
    //   clearInterval(i_id);
    // }
  },[currentProject, setPrimaryColor]);

  const next = () => {
    if (currentProject == 5) {
      // If we hit the cap (5)... Reset...
      setCurrentProject(1)
    } else {
      // Else... Tick along...
      setCurrentProject(currentProject => currentProject+1)
    }
  }

  const prev = () => {
    if (currentProject == 1) {
      // If we hit the cap (5)... Reset...
      setCurrentProject(5)
    } else {
      // Else... Tick along...
      setCurrentProject(currentProject => currentProject-1)
    }
  }
  

  const reveal = {
    initial: { y: '100%' },
    enter: { 
      y: 0,
      transition: { delay: introContext ? 0 : 2, duration: 1, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '100%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const slightScale = {
    initial: { scale: 1.125 },
    enter: { 
      scale: 1,
      transition: { delay: introContext ? 0 : 1.75, duration: 1.5, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      scale: 1.2,
      transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const revealMore = {
    initial: { y: '110%' },
    enter: { 
      y: 0,
      transition: { delay: introContext ? 0 : 2, duration: 1, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '110%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }

  return (
    <Layout>
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <Div100vh className="flex flex-col p-[14px] md:p-[20px]">

          <button onClick={next} className="absolute bottom-[120px] md:bottom-[81.75vh] right-0 z-10 w-1/2 h-12 flex items-start justify-end outline-none border-none group" onMouseEnter={() => setHoveringNext(true)} onMouseLeave={() => setHoveringNext(false)}>
            <span className={`text-off-black block px-4 md:px-5 py-2 font-mono text-sm uppercase transition-all ease-in-out duration-[400ms]  group-hover:opacity-100`}>
              <span className="block relative overflow-hidden">
                <span className={`block text-gray-400 leading-none ${hoveringNext ? 'opacity-0' : 'opacity-100 delay-75' } transition-opacity ease-in-out duration-500`}>Next</span>

                <span className="block overflow-hidden absolute inset-0">
                  <span className={`block ${hoveringNext ? 'translate-y-0' : 'translate-y-full' } leading-none transition-transform ease-in-out duration-[400ms] delay-75`}>Next</span>
                </span>
              </span>
            </span>
          </button>
          
          <button onClick={prev} className="absolute bottom-[120px] md:bottom-[81.75vh] left-0 z-10 w-1/2 h-12 flex items-start justify-start outline-none border-none group" onMouseEnter={() => setHoveringPrev(true)} onMouseLeave={() => setHoveringPrev(false)}>
            <span className={`text-off-black block px-4 md:px-5 py-2 font-mono text-sm uppercase transition-all ease-in-out duration-[400ms]  group-hover:opacity-100`}>
            <span className="block relative overflow-hidden">
            <span className={`block text-gray-400 leading-none ${hoveringPrev ? 'opacity-0' : 'opacity-100 delay-75' } transition-opacity ease-in-out duration-500`}>Previous</span>

                <span className="block overflow-hidden absolute inset-0">
                  <span className={`block ${hoveringPrev ? 'translate-y-0' : 'translate-y-full' } leading-none transition-transform ease-in-out duration-[400ms] delay-75`}>Previous</span>
                </span>
              </span>
            </span>
          </button>
          {/* <div className="fixed top-0 left-0 ml-[50%] mt-[10%] bg-red text-white">current: {currentProject}</div> */}
          {/* {home.featuredWork.map((e, i) => {
            e.imageSlides.map(e, i) => {
              return (

              )
            })
            })} */}
            {/* <div className="mt-24"> */}
              {/* <div>TEST: {JSON.stringify(home.featuredWork[0].homeCarouselImage.hotspot)}</div>
              <div>TEST: {JSON.stringify(home.featuredWork[1].homeCarouselImage.hotspot)}</div>
              <div>TEST: {JSON.stringify(home.featuredWork[2].homeCarouselImage.hotspot)}</div>
              <div>TEST: {JSON.stringify(home.featuredWork[3].homeCarouselImage.hotspot)}</div>
              <div>TEST: {JSON.stringify(home.featuredWork[4].homeCarouselImage.hotspot)}</div> */}
            {/* </div> */}

            {/* <div className="fixed top-0 left-0 ml-12 mt-12 z-[100000] text-2xl">ssss: {JSON.stringify(home.featuredWork[2].homeCarouselImage.hotspot)}</div> */}
            <m.div variants={fade} className="text-white my-auto">
              <div className="w-full h-[60vh] md:h-[63vh] relative mt-[-2vw]">
                {/* <div className="absolute inset-0 flex-wrap z-[6] hidden md:flex">  
                  <Link href={`/works/${home.featuredWork[0].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(1)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[1].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(2)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[2].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(3)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[3].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(4)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[4].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(5)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                </div> */}

                {/* <div className="absolute inset-0 flex-wrap z-[6] flex">
                  { currentProject == 1 && (
                    <Link href={`/works/${home.featuredWork[0].slug.current}`}>
                      <a className="w-full" onMouseEnter={() => setCurrentProject(1)} onMouseLeave={() => setCurrentProject(1)}></a>
                    </Link>
                  )}
                  { currentProject == 2 && (
                    <Link href={`/works/${home.featuredWork[1].slug.current}`}>
                      <a className="w-full" onMouseEnter={() => setCurrentProject(2)} onMouseLeave={() => setCurrentProject(1)}></a>
                    </Link>
                  )}
                  { currentProject == 3 && (
                    <Link href={`/works/${home.featuredWork[2].slug.current}`}>
                      <a className="w-full" onMouseEnter={() => setCurrentProject(3)} onMouseLeave={() => setCurrentProject(1)}></a>
                    </Link>
                  )}
                  { currentProject == 4 && (
                    <Link href={`/works/${home.featuredWork[3].slug.current}`}>
                      <a className="w-full" onMouseEnter={() => setCurrentProject(4)} onMouseLeave={() => setCurrentProject(1)}></a>
                    </Link>
                  )}
                  { currentProject == 5 && (
                    <Link href={`/works/${home.featuredWork[4].slug.current}`}>
                      <a className="w-full" onMouseEnter={() => setCurrentProject(5)} onMouseLeave={() => setCurrentProject(1)}></a>
                    </Link>
                  )}
                </div> */}
                <div className="absolute inset-0 overflow-hidden">
                  <button onClick={next} className="absolute top-0 right-0 bottom-0 z-10 w-1/2 h-full flex items-start justify-end outline-none border-none group" onMouseEnter={() => setHoveringNext(true)} onMouseLeave={() => setHoveringNext(false)}>
                  </button>
                  
                  <button onClick={prev} className="absolute top-0 left-0 bottom-0 z-10 w-1/2 h-full flex items-start justify-start outline-none border-none group" onMouseEnter={() => setHoveringPrev(true)} onMouseLeave={() => setHoveringPrev(false)}>
                  </button>
                  <m.div className="absolute inset-0" variants={slightScale}>
                    <div className="absolute inset-0">
                      {home.featuredWork[0].homeCarouselVideo ? (
                        <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`object-cover object-center [z-0] w-full h-full absolute inset-0 home-image ${currentProject === 1 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}>
                        <source src={ home.featuredWork[0].homeCarouselVideo.asset.url } type="video/mp4" />
      
                          Sorry. Your browser does not support the video tag.
                        </video>
                      ) : (
                        <ImageWrapper
                          image={home.featuredWork[0].homeCarouselImage.asset}
                          focalPoint={home.featuredWork[0].homeCarouselImage.hotspot ?? null}
                          baseWidth={1920}
                          baseHeight={1080}
                          alt="Placeholder"
                          fill
                          className={`w-full h-full [z-0] home-image ${currentProject === 1 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        />
                      )}
                    </div>

                    <div className="block absolute inset-0">
                      {home.featuredWork[1].homeCarouselVideo ? (
                        <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`object-cover object-top [z-1] w-full h-full absolute inset-0 home-image ${currentProject === 2 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}>
                        <source src={ home.featuredWork[1].homeCarouselVideo.asset.url } type="video/mp4" />
      
                          Sorry. Your browser does not support the video tag.
                        </video>
                      ) : (
                        <ImageWrapper
                          image={home.featuredWork[1].homeCarouselImage.asset}
                          focalPoint={home.featuredWork[1].homeCarouselImage.hotspot ?? null}
                          baseWidth={1920}
                          baseHeight={1080}
                          alt="Placeholder"
                          fill
                          className={`w-full h-full [z-1] home-image ${currentProject === 2 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        />
                      )}
                    </div>

                    <div className="block absolute inset-0">
                      {home.featuredWork[2].homeCarouselVideo ? (
                        <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`object-cover object-top [z-2] w-full h-full absolute inset-0 home-image ${currentProject === 3 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}>
                        <source src={ home.featuredWork[2].homeCarouselVideo.asset.url } type="video/mp4" />
      
                          Sorry. Your browser does not support the video tag.
                        </video>
                      ) : (
                        <ImageWrapper
                          image={home.featuredWork[2].homeCarouselImage.asset}
                          focalPoint={home.featuredWork[2].homeCarouselImage.hotspot ?? null}
                          baseWidth={1920}
                          baseHeight={1080}
                          alt="Placeholder"
                          fill
                          className={`w-full h-full [z-2] home-image ${currentProject === 3 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        />
                      )}
                    </div>
                    
                    <div className="block absolute inset-0">

                      {home.featuredWork[3].homeCarouselVideo ? (
                        <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`object-cover object-top [z-3] w-full h-full absolute inset-0 home-image ${currentProject === 4 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}>
                        <source src={ home.featuredWork[3].homeCarouselVideo.asset.url } type="video/mp4" />
      
                          Sorry. Your browser does not support the video tag.
                        </video>
                      ) : (
                        <ImageWrapper
                          image={home.featuredWork[3].homeCarouselImage.asset}
                          focalPoint={home.featuredWork[3].homeCarouselImage.hotspot ?? null}
                          baseWidth={1920}
                          baseHeight={1080}
                          alt="Placeholder"
                          fill
                          className={`w-full h-full [z-3] home-image ${currentProject === 4 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        />
                      )}
                    </div>
                    
                    <div className="block absolute inset-0">
                      {home.featuredWork[4].homeCarouselVideo ? (
                        <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`object-cover object-center [z-4] w-full h-full absolute inset-0 home-image ${currentProject === 5 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}>
                        <source src={ home.featuredWork[4].homeCarouselVideo.asset.url } type="video/mp4" />
      
                          Sorry. Your browser does not support the video tag.
                        </video>
                      ) : (
                        <ImageWrapper
                          image={home.featuredWork[4].homeCarouselImage.asset}
                          focalPoint={home.featuredWork[4].homeCarouselImage.hotspot ?? null}
                          baseWidth={1920}
                          baseHeight={1080}
                          alt="Placeholder"
                          fill
                          className={`w-full h-full [z-4] home-image ${currentProject === 5 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        />
                      )}
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>

            <div className="flex flex-wrap items-end">
              
              <span className={`w-full md:w-auto text-[13px] md:text-[16px] tracking-tighter md:tracking-normal leading-none md:fixed bottom-0 left-0 mb-1 md:m-[20px] variant-numeric font-mono`}>
                <span className="block relative overflow-hidden mb-[5px]">
                  <m.span variants={revealMore} className="block uppercase leading-none">(Info)</m.span>
                </span>
                <span className="block overflow-hidden h-[12px] md:h-[15px]">
                  <m.span variants={reveal} className="block">
                    <span className={`block ${coords} transition-transform ease-in-out duration-500 pt-[2px]`}>
                      <span className="block leading-none">{home.featuredWork[0].gps}</span>
                      <span className="block leading-none">{home.featuredWork[1].gps}</span>
                      <span className="block leading-none">{home.featuredWork[2].gps}</span>
                      <span className="block leading-none">{home.featuredWork[3].gps}</span>
                      <span className="block leading-none">{home.featuredWork[4].gps}</span>
                    </span>
                  </m.span>
                </span>
              </span>

              <span className={`w-full md:w-auto text-[13px] md:text-[16px] tracking-tighter md:tracking-normal leading-none md:fixed bottom-0 left-0 mb-1 md:m-[20px] md:ml-[25vw] font-mono hidden xl:block uppercase`}>
                <span className="block overflow-hidden h-[12px] md:h-[15px]">
                  <m.span variants={reveal} className="block">
                    <span className={`block ${coords} transition-transform ease-in-out duration-500 pt-[2px]`}>
                      <span className="block leading-none">{home.featuredWork[0].referenceCode}</span>
                      <span className="block leading-none">{home.featuredWork[1].referenceCode}</span>
                      <span className="block leading-none">{home.featuredWork[2].referenceCode}</span>
                      <span className="block leading-none">{home.featuredWork[3].referenceCode}</span>
                      <span className="block leading-none">{home.featuredWork[4].referenceCode}</span>
                    </span>
                  </m.span>
                </span>
              </span>

              <span className="w-full text-[13px] md:text-[16px] tracking-tighter md:tracking-normal ml-auto leading-none uppercase md:fixed md:text-center block font-mono">
                <span className="block overflow-hidden h-[12px] md:h-[15px]">
                  <m.span variants={reveal} className="block">
                    <span className={`block ${coords} transition-transform ease-in-out duration-500 pt-[2px]`}>
                      <span className="block leading-none">{home.featuredWork[0].title}</span>
                      <span className="block leading-none">{home.featuredWork[1].title}</span>
                      <span className="block leading-none">{home.featuredWork[2].title}</span>
                      <span className="block leading-none">{home.featuredWork[3].title}</span>
                      <span className="block leading-none">{home.featuredWork[4].title}</span>
                    </span>
                  </m.span>
                </span>
              </span>
              {/* mb-[9px] md:mb-[-7px] 2xl:mb-[-12px] */}
              <span className="overflow-hidden ml-auto fixed bottom-0 right-0 flex items-end mb-[9px] md:mb-[20px] 2xl:mb-[20px] mr-[14px] md:mr-[20px]">
                <m.span variants={reveal} className="block md:mb-[-23px] 2xl:mb-[-30px]">
                  <span className="text-[90px] md:text-[160px] 2xl:text-[200px] leading-none font-semibold tracking-tight flex items-end"><span className="text-[13px] md:text-[16px] tracking-tighter md:tracking-normal leading-none mb-[5px] md:mb-[20px] 2xl:mb-[30px] uppercase font-normal font-mono hidden md:block"><span className="transform hidden md:inline-block rotate-180">◄</span> p<span className="hidden md:inline">roject</span><span className="hidden md:inline-block">&nbsp;</span>/</span>
                    <span className="block tracking-tighter">
                      <span className="block overflow-hidden h-[80px] md:h-[160px] 2xl:h-[200px]">
                        <span className={`block index-number`}>
                          <span className="block leading-none">
                            {numberSplit.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="block leading-none">
                            {numberSplit1.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="block leading-none">
                            {numberSplit2.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="block leading-none">
                            {numberSplit3.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="block leading-none">
                            {numberSplit4.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </m.span>
              </span>
            </div>
          </Div100vh>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}