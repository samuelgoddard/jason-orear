import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade, reveal, slightScale, revealMore } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import ReactFullpage from '@fullpage/react-fullpage';
import SanityPageService from '@/services/sanityPageService'
import { NextSeo } from 'next-seo'
import { Context } from '../../context/state'
import Photo from '@/components/photo';
import Div100vh from 'react-div-100vh';
import { ColorContext } from 'context/primary';
import { SecondaryColorContext } from 'context/secondary';

const pluginWrapper = () => {
  require('../../static/fullpage.scrollHorizontally.min.js');
};

const query = `*[_type == "work" && slug.current == $slug][0]{
  seo {
    ...,
    shareGraphic {
      asset->
    }
  },
  title,
  indexNumber,
  client,
  location,
  gps,
  year,
  slug {
    current
  },
  imageSlides[] {
    layout,
    images[] {
      asset-> {
        ...
      },
    },
    "imagesHotSpots": images[] {
      hotspot {
        x,
        y
      }
    }
  },
  'next': *[indexNumber > ^.indexNumber] | order(indexNumber asc) [0] {
    title,
    client,
    location,
    gps,
    year,
    slug {
      current
    },
    imageSlides[] {
      layout,
      images[] {
        asset-> {
          ...
        }
      }
    },
  },
  "contact": *[_type == "contact"][0]{
    primaryColor,
    secondaryColor
  },
  slug {
    current
  }
}`

const pageService = new SanityPageService(query)

export default function WorksSlug(initialData) {
  const { data: { title, seo, slug, indexNumber, client, location, gps, year, imageSlides, next, contact }  } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(Context);
  const [infoOpen, setInfoOpen] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0)

  const [primaryColor, setPrimaryColor] = useContext(ColorContext);
  const [secondaryColor, setSecondaryColor] = useContext(SecondaryColorContext);
  // const currentSlide = fullpageApi.getActiveSlide();

  const toggleInfoOpen = () => setInfoOpen(!infoOpen);
  const toggleNextHoveredOn = () => setNextHovered(true);
  const toggleNextHoveredOff = () => setNextHovered(false);

  useEffect(() => {
    setPrimaryColor(contact.primaryColor)
    setSecondaryColor(contact.secondaryColor)
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title={title} />
      
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
          id="inner-container"
          data-scroll-section
        >
          <Div100vh className="flex flex-col p-[14px] md:p-[20px] relative">
            <ReactFullpage
              navigation={false}
              anchors={['slider']}
              controlArrows={false}
              pluginWrapper={pluginWrapper}
              licenseKey={'E35C20B2-4B1C4CAA-AEB26F61-7D51579F'}
              // onLeave={this.onLeave.bind(this)}
              scrollingSpeed = {1100}
              loopHorizontal={false}
              scrollHorizontally={true}
              easingcss3="cubic-bezier(0.83, 0, 0.17, 1)"
              scrollHorizontallyKey={'amFzb25vcmVhci5jb21fMWxqYzJOeWIyeHNTRzl5YVhwdmJuUmhiR3g1NThR'}
              render={({ state, fullpageApi }) => {
                console.log(state)
                // console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console
                return (
                  <ReactFullpage.Wrapper>
                    <div className="slider-button">
                      <button
                        onClick={() => fullpageApi.moveSlideLeft() && fullpageApi.getActiveSlide()}
                        className="absolute top-0 left-0 z-20 h-[80vh] w-[12%] my-[10vh] flex items-center group transition-opacity ease-in-out duration-500 slider-buttons--prev md:ml-[-2px]"
                      >
                        <div className="overflow-hidden relative leading-none mt-[-20vh] md:mt-0">
                          <m.span className="block" variants={reveal}>
                            <span className="block transition ease-in-out duration-[550ms] opacity-30 md:opacity-20 font-mono uppercase text-[20px] md:text-[15px] slider-buttons--prev-inner absolute top-0 mt-[1px] left-0 group-hover:opacity-0">
                              <span className="block md:hidden">&#x3c;</span>
                              <span className="hidden md:block">Prev</span>
                            </span>
                            <span className="block transition-transform ease-in-out duration-[550ms] translate-y-full group-hover:translate-y-0 font-mono uppercase text-[20px] md:text-[15px] slider-buttons--prev-inner">
                              <span className="block md:hidden">&#x3c;</span>
                              <span className="hidden md:block">Prev</span>
                            </span>
                          </m.span>
                        </div>
                      </button>

                      <button
                        onClick={() => fullpageApi.moveSlideRight()}
                        className="absolute top-0 right-0 bottom-0 z-20 h-[80vh] w-[12vw] my-[10vh] flex flex-wrap items-center group slider-buttons--next transition-opacity ease-in-out duration-500 text-right md:mr-[-2px]"
                      >
                        <div className="overflow-hidden relative leading-none mt-[-20vh] md:mt-0 text-right w-full ">
                          <m.span className="block text-right" variants={reveal}>
                            <span className="block transition ease-in-out duration-[550ms] opacity-30 md:opacity-20 font-mono uppercase text-[20px] md:text-[15px] slider-buttons--next-inner absolute top-0 mt-[1px] right-0 group-hover:opacity-0 text-right">
                              <span className="block md:hidden">&#x3e;</span>
                              <span className="hidden md:block">Next</span>
                            </span>
                            <span className="block transition-transform ease-in-out duration-[550ms] translate-y-full group-hover:translate-y-0 font-mono uppercase text-[20px] md:text-[15px] slider-buttons--next-inner text-right">
                              <span className="block md:hidden">&#x3e;</span>
                              <span className="hidden md:block">Next</span>
                            </span>
                          </m.span>
                        </div>
                      </button>
                    </div>
                    

                    <m.div variants={fade} className="section relative">
                      {imageSlides.map((f, i) => {
                        
                        let layoutOuterWrapper = 'w-10/12 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]';

                        let layoutWrapper = 'flex items-center h-full';
                        
                        if (f.layout == 'full-portrait') {
                          layoutWrapper = 'overflow-hidden w-7/12 md:w-[32%] xl:w-[30%] 2xl:w-[33%] 3xl:w-[39%] h-[55vh] md:h-[62vh] xl:h-[69vh] relative mx-auto will-change mt-[-6vh]';
                          layoutOuterWrapper = 'my-auto flex items-center max-w-screen-2xl mx-auto';
                        } else if (f.layout == 'full-landscape') {
                          layoutWrapper = 'overflow-hidden w-9/12 md:w-7/12 2xl:w-8/12 h-[55vh] md:h-[63vh] xl:h-[68vh] 2xl:h-[72vh] relative mx-auto will-change mt-[-6vh]';
                          layoutOuterWrapper = 'flex items-center h-full';
                        } else if (f.layout == 'two-portrait') {
                          layoutWrapper = 'overflow-hidden w-1/2 md:w-1/2 h-[40vh] md:h-[62vh] xl:h-[69vh] relative mx-auto will-change mt-[-6vh]';
                          layoutOuterWrapper = 'my-auto flex w-10/12 md:w-[40%] xl:md:w-[55%] mx-auto space-x-[5vw] max-w-screen-xl';
                        }
                        
                        return (
                          <div className="slide will-change flex items-center" id={i} data-anchor={`slide${i}`} key={i}>
                            <div className={layoutOuterWrapper}>
                              { f.images.map((g, i) => {
                                let width = g.asset.metadata.dimensions.width / 2
                                let optimisedWidth = Math.round(width);
                                let height = g.asset.metadata.dimensions.height / 2
                                let optimisedHeight = Math.round(height);

                                return (
                                  <div className={layoutWrapper} key={i}>
                                    <m.div variants={slightScale} className="absolute inset-0">
                                      <Photo
                                        photo={g}
                                        width={optimisedWidth}
                                        height={optimisedHeight}
                                        focalPoint={f.imagesHotSpots[i].hotspot ?? null}
                                        sizes="(min-width: 1920px) 100vw, (min-width: 1600px) 100vw, (min-width: 1280px) 90vw, (min-width: 768px) 90vw, 200vw"
                                        layout="fill"
                                        className="w-full h-full object-cover object-center will-change"
                                      />
                                    </m.div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}

                      <div className="slide will-change relative" data-anchor={`slide-final`} id="slide-final">
                        { next ? (
                          <>
                            <div className="font-mono text-[12px] md:text-[13px] uppercase absolute top-auto bottom-0 md:bottom-auto md:top-0 right-0 md:left-0 md:right-auto mb-[78vw] md:mb-0 md:mt-20 text-right md:text-left">
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(Client)</span>
                                <span className="block md:ml-3">{next.client}</span>
                              </div>
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(Location)</span>
                                <span className="block md:ml-3">{next.location}</span>
                              </div>
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(GPS)</span>
                                <span className="block md:ml-3">{next.gps}</span>
                              </div>
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(Year)</span>
                                <span className="block md:ml-3">{next.year}</span>
                              </div>
                            </div>
                            
                            <div className="my-auto mt-[-30vw] md:mt-0 flex w-full mx-auto space-x-[5vw] max-w-screen-xl items-center justify-center relative z-10">
                              <Link href={`/works/${next.slug.current}`}>
                                <a className="will-change mt-[-6vh] block text-center md:text-left group" onMouseOver={toggleNextHoveredOn} onMouseOut={toggleNextHoveredOff}>
                                  <span className="block uppercase text-[14px] md:text-[20px] leading-none mb-[12px] md:mb-[20px] 2xl:mb-[28px] text-center transition-colors ease-in-out duration-500">Next Project</span>
                                  <span className="block text-[8vw] md:text-[11vw] 2xl:text-[12vw] uppercase font-semibold leading-[0.875] ml-[-1vw] 2xl:ml-[-18px] -mt-px md:-mt-1 2xl:-mt-3 text-center transition-colors ease-in-out duration-500">
                                    {next.title}
                                    <div className="overflow-hidden relative flex justify-center">
                                      <div className={`h-[6px] md:h-[10px] transition-all ease-in-out duration-[600ms] bg-black ${nextHovered ? 'w-full' : 'w-[0px] scale-x-[0.9]' }`}></div>
                                    </div>
                                  </span>
                                </a>
                              </Link>
                            </div>

                            <div className="w-full md:w-[19vw] xl:w-[22vw] h-[30vh] md:h-screen mx-auto md:ml-auto md:mr-0 will-change absolute bottom-0 right-0 left-0 md:left-auto md:top-0 mb-[65px] md:pb-[40px] md:z-0 md:flex md:flex-wrap md:items-end md:justify-center">
                              <div className={`w-full h-[30vh] md:w-full md:h-[13vw] xl:h-[16vw] bg-white md:mt-[-7.5vh] overflow-hidden relative`}>
                                <m.div className="absolute inset-0">
                                  <Photo
                                    photo={next.imageSlides[0].images[0]}
                                    width={next.imageSlides[0].images[0].asset.metadata.dimensions.width / 3}
                                    height={next.imageSlides[0].images[0].asset.metadata.dimensions.height / 3}
                                    srcSizes={[900]}
                                    sizes="(min-width: 900px) 100vw, 100vw"
                                    layout="fill"
                                    className={`w-full h-full object-cover object-center will-change bg-white transition-transform ease-in-out duration-700 ${nextHovered ? 'scale-110' : 'scale-100' }`}
                                  />
                                </m.div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>                            
                            <div className="my-auto mt-[-30vw] md:mt-0 flex w-full mx-auto space-x-[5vw] max-w-screen-xl items-center justify-center">
                              <Link href={`/works`}>
                                <a className="will-change mt-[-6vh] block text-center md:text-left">
                                  <span className="block uppercase text-[14px] md:text-[20px] leading-none mb-[12px] md:mb-[20px] 2xl:mb-[28px]">Back To</span>
                                  <span className="block text-[8vw] md:text-[11vw] 2xl:text-[12vw] uppercase font-semibold leading-[0.875] ml-[-1vw] 2xl:ml-[-18px] -mt-px md:-mt-1 2xl:-mt-3">All Projects</span>
                                </a>
                              </Link>
                            </div>

                            {/* <div className="w-full md:w-[25vw] h-[30vh] md:h-[24vh] mx-auto will-change absolute bottom-0 right-0 left-0 md:left-auto mb-[65px] md:mb-[48px]">
                              <Image
                                src={workImage}
                                alt="Placeholder"
                                layout="fill"
                                className="w-full h-full object-cover object-center will-change"
                                placeholder="blur"
                              />
                            </div> */}
                          </>
                        )}
                      </div>
                    </m.div>
                  </ReactFullpage.Wrapper>
                );
              }}
            />
          
          <m.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              enter: { transition: { delayChildren: 0.25 } }
            }}
          >
              <div data-scroll data-scroll-sticky data-scroll-target="#inner-container" className="fixed md:absolute bottom-0 left-0 z-40 w-auto text-center">
                <span className="block overflow-hidden m-[18px] mb-[12px] md:m-[18px] md:mb-[12px]">
                  <m.span variants={reveal} className="block">
                    <Link href="/works">
                      <a className="text-center uppercase text-[15px] md:text-[14px] xl:text-[16px] w-auto relative inline-block group font-mono">
                        <span className="inline-block">Back</span>
                        <span className="block transition-all ease-in-out duration-500 w-full scale-x-0 group-hover:scale-x-100 h-[2px] bg-black"></span>
                      </a>
                    </Link>
                  </m.span>
                </span>
              </div>

              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute bottom-0 left-0 right-0 z-30 mb-[60px] md:mb-[13px] w-auto text-center mx-auto">
                <span className="block overflow-hidden">
                  <m.h1 variants={revealMore} className="text-center uppercase text-[25px] md:text-[30px] xl:text-[40px] 2xl:text-[55px] leading-[1] w-auto relative inline-block group m-0 p-0">
                    <span className="block relative overflow-hidden">
                      <span className={`block transition-translate ease-in-out duration-500 project-title ${infoOpen ? 'translate-y-full' : 'delay-[150ms]' }`}>{title}</span>
                    </span>
                  </m.h1>
                </span>
              </div>

              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute bottom-0 right-0 z-40 m-[18px] mb-[12px] md:m-[18px] md:mb-[12px] w-auto text-center font-mono">
                <span className="block overflow-hidden">
                  <m.span variants={reveal} className="text-center uppercase text-[14px] md:text-[16px] xl:text-[16px] w-auto relative inline-block group">
                    <span className="block transition ease-in-out duration-500 image-length-tag delay-[150ms]">
                      {imageSlides.length} Images
                    </span>
                  </m.span>
                </span>
              </div>

              {/* Desktop Info... */}
              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="hidden md:block fixed md:absolute top-0 left-0 right-0 z-40 m-[20px] md:m-[20px] w-[50%] md:w-[70%] mx-[25%] md:mx-[15%] text-center font-mono">
                <span className="block overflow-hidden h-[50px] group relative">
                  <div className="relative overflow-hidden">
                    <span className="block info-button transition ease-in-out duration-500 delay-[150ms]">
                      <m.span variants={reveal} className="text-center uppercase text-[14px] md:text-[16px] xl:text-[16px] w-auto relative block group-hover:opacity-0 opacity-100 transition-opacity ease-in-out duration-500 leading-none">
                        <div className="overflow-hidden">
                        <span className="block transition-translate ease-in-out duration-500 translate-y-0 group-hover:translate-y-full">+ Info</span>
                        </div>
                      </m.span>
                    </span>
                  </div>

                  <m.span variants={reveal} className="text-center uppercase text-[14px] md:text-[16px] xl:text-[16px] w-auto opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 absolute top-0 left-0 right-0 flex justify-center info-revealer">
                    <div className="font-mono text-[12px] md:text-[12px] uppercase flex text-center">
                      <div className="w-auto mx-3 text-left">
                        <div className="overflow-hidden">
                          <span className="hidden md:block mb-px md:mb-0 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0">(Client)</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="block md:ml-3 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0 group-hover:delay-[100ms]">{client}</span>
                        </div>
                      </div>
                      <div className="w-auto mx-3 text-left">
                        <div className="overflow-hidden">
                          <span className="hidden md:block mb-px md:mb-0 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0">(Location)</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="block md:ml-3 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0 group-hover:delay-[100ms]">{location}</span>
                        </div>
                      </div>
                      <div className="w-auto mx-3 text-left">
                        <div className="overflow-hidden">
                          <span className="hidden md:block mb-px md:mb-0 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0">(GPS)</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="block md:ml-3 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0 group-hover:delay-[100ms]">{gps}</span>
                        </div>
                      </div>
                      <div className="w-auto mx-3 text-left">
                        <div className="overflow-hidden">
                          <span className="hidden md:block mb-px md:mb-0 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0">(Year)</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="block md:ml-3 transition-translate ease-in-out duration-500 translate-y-full group-hover:translate-y-0 group-hover:delay-[100ms]">{year}</span>
                        </div>
                      </div>
                    </div>
                  </m.span>
                </span>
              </div>
              
              {/* Mobile Info */}
              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="block md:hidden fixed bottom-0 left-0 right-0 z-40 m-[18px] md:m-[20px] w-[70%] mx-[15%] text-center font-mono">
                <button onClick={toggleInfoOpen} className={`overflow-hidden h-[12vh] w-full group relative flex items-end justify-center border-none outline-none focus:outline-none hover:outline-none hover:border-none focus:border-none`}>
                  <div className="relative overflow-hidden">
                    <span className="block info-button transition ease-in-out duration-500 delay-[150ms]">
                      <m.span variants={reveal} className="text-center uppercase text-[14px] md:text-[16px] xl:text-[16px] w-auto relative block transition-opacity ease-in-out duration-500 leading-none">
                        <div className="overflow-hidden w-[90px]">
                        <span className={`block transition-translate ease-in-out duration-500 ${ infoOpen ? 'delay-[0ms] translate-y-full' : ' delay-[150ms] translate-y-0' }`}>+ Info</span>

                        <span className={`absolute inset-0 transition-translate ease-in-out duration-500 translate-y-full ${ infoOpen ? 'delay-[150ms] translate-y-0' : '' }`}>- Close</span>
                        </div>
                      </m.span>
                    </span>
                  </div>

                  <m.span variants={reveal} className={`text-center uppercase text-[10px] md:text-[16px] xl:text-[16px] w-auto transition-opacity ease-in-out duration-500 absolute top-0 left-0 right-0 flex justify-center info-revealer ${ infoOpen ? 'opacity-100' : 'opacity-0' }`}>
                    <div className="font-mono text-[10px] md:text-[12px] uppercase flex flex-wrap justify-center text-center">
                      <div className="w-full mx-2 text-center">
                        <div className="overflow-hidden">
                          <span className={`block md:ml-3 transition-translate ease-in-out duration-500 ${ infoOpen ? 'delay-[100ms] translate-y-0' : 'translate-y-full' }`}>“{client}”</span>
                        </div>
                      </div>
                      <div className="w-full mx-2 text-center">
                        <div className="overflow-hidden">
                          <span className={`block md:ml-3 transition-translate ease-in-out duration-500 ${ infoOpen ? 'delay-[100ms] translate-y-0' : 'translate-y-full' }`}>“{location}”</span>
                        </div>
                      </div>
                      <div className="w-full mx-2 text-center">
                        <div className="overflow-hidden">
                          <span className={`block md:ml-3 transition-translate ease-in-out duration-500 ${ infoOpen ? 'delay-[100ms] translate-y-0' : 'translate-y-full' }`}>“{gps}”</span>
                        </div>
                      </div>
                      <div className="w-full mx-2 text-center">
                        <div className="overflow-hidden">
                          <span className={`block md:ml-3 transition-translate ease-in-out duration-500 ${ infoOpen ? 'delay-[100ms] translate-y-0' : 'translate-y-full' }`}>“{year}”</span>
                        </div>
                      </div>
                    </div>
                  </m.span>
                </button>
              </div>
            </m.div>
          </Div100vh>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return {
    props
  };
}

export async function getStaticPaths() {
  const paths = await pageService.fetchPaths('work')
  return {
    paths: paths,
    fallback: false,
  };
}