import { useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade, growWidth, reveal, slightScale, slightTransformHori } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import SanityPageService from '@/services/sanityPageService'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import ImageWrapper from '@/components/image-wrapper'
import Photo from '@/components/photo'
import { Context } from '../../context/state'
import { ColorContext } from 'context/primary'
import { SecondaryColorContext } from 'context/secondary'
import ConditionalWrap from 'conditional-wrap';

const query = `{
  "works": *[_type == "work"] | order(indexNumber)  {
    title,
    indexNumber,
    client,
    location,
    gps,
    year,
    slug {
      current
    },
    publications[] {
      title,
      url
    },
    awards[] {
      title,
      url
    },
    imageSlides[] {
      layout,
      images[] {
        asset-> {
          ...
        }
      },
      video {
        asset-> {
          ...
        }
      }
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
  },
  "contact": *[_type == "contact"][0]{
    primaryColor,
    secondaryColor
  }
}`

const pageService = new SanityPageService(query)

export default function WorksIndex(initialData) {
  const { data: { works, contact }  } = pageService.getPreviewHook(initialData)()
  const containerRef = useRef(null)
  const [introContext, setIntroContext] = useContext(Context);
  const [primaryColor, setPrimaryColor] = useContext(ColorContext);
  const [secondaryColor, setSecondaryColor] = useContext(SecondaryColorContext);

  useEffect(() => {
    setPrimaryColor(contact.primaryColor)
    setSecondaryColor(contact.secondaryColor)

    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title="Works" />
      
      <LocomotiveScrollProvider options={{ smooth: true, lerp: 0.075 }} watch={[]} containerRef={containerRef}>
        <main data-scroll-container ref={containerRef} id="scroll-container" className="z-[10]">
          <LazyMotion features={domAnimation}>
            <m.section
              initial="initial"
              animate="enter"
              exit="exit"
              className=""
              data-scroll-section
            >
              <m.div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" variants={fade} className="absolute top-0 left-0 right-0 w-full h-[75px] bg-white z-[30]"></m.div>

              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute top-0 left-0 right-0 mt-[25px] md:mt-[20px] mx-auto z-[40] w-[130px] md:w-[190px] text-center flex justify-center">
                <Link href="/works">
                  <a className="text-center uppercase text-[13px] md:text-[15px] xl:text-[18px] w-auto relative inline-block group leading-[1.1]">
                    <span className="block overflow-hidden">
                      <m.span className="block" variants={reveal}>
                        Index
                      </m.span>
                    </span>
                  </a>
                </Link>

                <span className="text-center uppercase text-[13px] md:text-[15px] xl:text-[18px] w-auto relative inline-block group mx-1 transition ease-in-out duration-500 opacity-25">
                  <span className="block overflow-hidden leading-[1.1]">
                    <m.span className="block" variants={reveal}>
                      /
                    </m.span>
                  </span>
                </span>

                <Link href="/works/gallery">
                  <a className="text-center uppercase text-[13px] md:text-[15px] xl:text-[18px] w-auto relative inline-block group opacity-25 transition ease-in-out duration-500 leading-[1.1]">
                    <span className="block overflow-hidden">
                      <m.span className="block" variants={reveal}>
                        Gallery
                      </m.span>
                    </span>
                  </a>
                </Link>
              </div>

              <m.div variants={fade} className="p-[14px] md:p-[20px] pt-28 md:pt-40" data-scroll>
                {works.map((e, i) => {
                  return (
                    <div className="overflow-hidden mb-5 md:mb-0" key={i}>
                      <span className="block text-[13px] md:text-[16px] mb-2 md:mb-3 leading-none tracking-tighter font-mono variant-numeric md:ml-[4px] uppercase">
                        <span className="block overflow-hidden">
                          <m.span variants={reveal} className="block">
                            Project / {i < 9 ? '0' : ''}{i + 1}
                          </m.span>
                        </span>
                      </span>
                      <Link href={`/works/${e.slug.current}`} className="">
                        <a className="block">
                          <span className="block overflow-hidden">
                            <m.span variants={reveal} className="block will-change">
                              <h2 className="text-[12vw] md:text-[12vw] 3xl:text-[200px] ml-[0px] 2xl:ml-[000px] 3xl:ml-[0px] leading-[0.85] uppercase font-semibold tracking-tighter mb-0 pb-0 project-index-text">{e.title}</h2>
                            </m.span>
                          </span>
                        </a>
                      </Link>
                      
                      <div className="flex flex-wrap md:space-x-8 font-mono text-[11px] md:text-[13px] uppercase mt-5 mb-6 leading-[1.2]">
                        {e.client && (
                          <div className="w-full md:w-auto">
                            <span className="hidden md:block mb-px md:mb-0">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  (Client)
                                </m.span>
                              </span>
                            </span>
                            <span className="inline-block md:block md:ml-3">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  {e.client}
                                </m.span>
                              </span>
                            </span>
                          </div>
                        )}
                        {e.location && (
                          <div className="w-full md:w-auto">
                            <span className="hidden md:block mb-px md:mb-0">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  (Location)
                                </m.span>
                              </span>
                            </span>
                            <span className="inline-block md:block md:ml-3">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  {e.location}
                                </m.span>
                              </span>
                            </span>
                          </div>
                        )}
                        {e.gps && (
                          <div className="w-full md:w-auto">
                            <span className="hidden md:block mb-px md:mb-0">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  (GPS)
                                </m.span>
                              </span>
                            </span>  
                            <span className="inline-block md:block md:ml-3">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  {e.gps}
                                </m.span>
                              </span>
                            </span>
                          </div>
                        )}
                        {e.year && (
                          <div className="w-full md:w-auto">
                            <span className="hidden md:block mb-px md:mb-0">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  (Year)
                                </m.span>
                              </span>
                            </span>
                            <span className="inline-block md:block md:ml-3">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  {e.year}
                                </m.span>
                              </span>
                            </span>
                          </div>
                        )}
                        {e.publications && (
                          <div className="w-full md:w-auto">
                            <span className="hidden md:block mb-px md:mb-0">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  (Publications)
                                </m.span>
                              </span>
                            </span>
                            <span className="inline-block md:block md:ml-3">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  {e.publications.map((j, i) => {
                                    return (
                                      <ConditionalWrap
                                        condition={!!j.url}
                                        wrap={children => (
                                          <a href={j.url} target="_blank" rel="noopener noreferrer" className="underline inline-block  transition-colors ease-in-out duration-300">
                                            {children}
                                          </a>
                                        )}
                                      >
                                        <span key={i} className="inline-block">{j.title}&nbsp;{(i == 0 || i == e.publications.length) ? ' ' : ' ' }</span>
                                      </ConditionalWrap>
                                    )
                                  })}
                                </m.span>
                              </span>
                            </span>
                          </div>
                        )}
                        {e.awards && (
                          <div className="w-full md:w-auto">
                            <span className="hidden md:block mb-px md:mb-0">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  (Awards)
                                </m.span>
                              </span>
                            </span>
                            <span className="inline-block md:block md:ml-3">
                              <span className="inline-block md:block overflow-hidden">
                                <m.span variants={fade} className="block">
                                  {e.awards.map((j, i) => {
                                    return (
                                      <ConditionalWrap
                                        condition={!!j.url}
                                        wrap={children => (
                                          <a href={j.url} target="_blank" rel="noopener noreferrer" className="underline block  transition-colors ease-in-out duration-300">
                                            {children}
                                          </a>
                                        )}
                                      >
                                        <span key={i} className="inline-block">{j.title}&nbsp;{(i == 0 || i == e.awards.length) ? ' ' : ' ' }</span>
                                      </ConditionalWrap>
                                    )
                                  })}
                                </m.span>
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="whitespace-nowrap space-x-[2.5vw] md:space-x-[2vw] xl:space-x-[1.5vw] overflow-scroll md:overflow-visible" data-scroll-direction="horizontal" data-scroll data-scroll-speed="1">
                        {e.imageSlides.map((f, index) => {
                          return f.images ? (
                            f.images.map((g, i) => {
                              let width = g.asset.metadata.dimensions.width / 3
                              let optimisedWidth = Math.round(width);
                              let height = g.asset.metadata.dimensions.height / 3
                              let optimisedHeight = Math.round(height);
                              let layoutWrapper = ''
                              if (f.layout == 'full-portrait') {
                                layoutWrapper = 'w-[22vw] md:w-[7vw] max-w-[150px]'
                              } else if (f.layout == 'full-landscape') {
                                layoutWrapper = 'w-[38vw] md:w-[14vw] max-w-[260px]'
                              } else if (f.layout == 'two-portrait') {
                                layoutWrapper = 'w-[22vw] md:w-[7vw] max-w-[150px]'
                              }

                              return (
                                <Link href={`/works/${e.slug.current}#slider/slide${index}`} key={i}>
                                  <a className={`${layoutWrapper} h-[28vw] md:h-[10vw] max-h-[175px] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-700 will-change inline-block group`}>
                                    <div className="w-full h-full relative overflow-hidden">
                                      <div className="w-full h-full absolute inset-0">
                                        <Photo
                                          photo={g}
                                          width={optimisedWidth}
                                          height={optimisedHeight}
                                          srcSizes={[520]}
                                          sizes="(min-width: 520px) 100vw, 100vw"
                                          layout="fill"
                                          className="w-full h-full object-cover object-center"
                                        />
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                              )
                            })
                          ) : (
                            <Link href={`/works/${e.slug.current}#slider/slide${index}`} key={i}>
                              <a className={`w-[38vw] md:w-[14vw] max-w-[260px] h-[28vw] md:h-[10vw] max-h-[175px] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-700 will-change inline-block group`}>
                                <div className="w-full h-full relative overflow-hidden">
                                  <div className="w-full h-full absolute inset-0">
                                    <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`object-cover object-top [z-4] w-full h-full absolute inset-0`}>
                                      <source src={ f.video.asset.url } type="video/mp4" />
            
                                      Sorry. Your browser does not support the video tag.
                                    </video>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          )
                        })}

                        {/* <Link href="/work">
                          <a className="w-[12vw] h-[16vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change">
                            <Image
                              src={image1}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </a>
                        </Link>
                        <Link href="/work">
                          <a className="w-[25vw] h-[16vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change">
                            <Image
                              src={image2}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </a>
                        </Link>
                        <Link href="/work">
                          <a className="w-[12vw] h-[16vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change">
                            <Image
                              src={image6}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </a>
                        </Link>
                        <Link href="/work">
                          <a className="w-[12vw] h-[16vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change">
                            <Image
                              src={image3}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </a>
                        </Link>
                        <Link href="/work">
                          <a className="w-[25vw] h-[16vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change">
                            <Image
                              src={image4}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </a>
                        </Link>
                        <Link href="/work">
                          <a className="w-[12vw] h-[16vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change">
                            <Image
                              src={image5}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </a>
                        </Link> */}
                      </div>

                      <div className="my-2 md:my-8 w-full h-[1px] bg-transparent md:bg-black"></div>
                    </div>
                  )
                })}
              </m.div>
            </m.section>
          </LazyMotion>
        </main>
      </LocomotiveScrollProvider>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}
