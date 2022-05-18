import { useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade, reveal, slightScale } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Photo from '@/components/photo'
import { Context } from '../../context/state'
import Image from 'next/image'

const query = `{
  "works": *[_type == "work"] | order(indexNumber) [0..13] {
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
        }
      }
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
  }
}`

const pageService = new SanityPageService(query)

export default function WorksGallery(initialData) {
  const { data: { works }  } = pageService.getPreviewHook(initialData)()
  const containerRef = useRef(null)
  const [introContext, setIntroContext] = useContext(Context);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title="Works Gallery" />
      
      <LocomotiveScrollProvider
        options={
          {
            smooth: true,
            lerp: 0.075
          }
        }
        watch={[]}
        containerRef={containerRef}
      >
        <main data-scroll-container ref={containerRef} id="scroll-container">
          <LazyMotion features={domAnimation}>
            <m.section
              initial="initial"
              animate="enter"
              exit="exit"
              className=""
              data-scroll-section
            >

              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute top-0 left-0 right-0 mt-[25px] md:mt-[20px] mx-auto z-40 w-[130px] md:w-[190px] text-center flex justify-center">
                <Link href="/works">
                  <a className="text-center uppercase text-[13px] md:text-[15px] xl:text-[18px] w-auto relative inline-block group opacity-25 transition ease-in-out duration-500 leading-[1.1]">
                    <span className="block overflow-hidden">
                      <m.span className="block" variants={reveal}>
                        Index
                      </m.span>
                    </span>
                  </a>
                </Link>

                <span className="text-center uppercase text-[13px] md:text-[15px] xl:text-[18px] w-auto relative inline-block group mx-1 transition ease-in-out duration-500 opacity-25 leading-[1.1]">
                  <span className="block overflow-hidden">
                    <m.span className="block" variants={reveal}>
                      /
                    </m.span>
                  </span>
                </span>

                <Link href="/works/gallery">
                  <a className="text-center uppercase text-[13px] md:text-[15px] xl:text-[18px] w-auto relative inline-block group transition ease-in-out duration-500 leading-[1.1]">
                    <span className="block overflow-hidden">
                      <m.span className="block" variants={reveal}>
                        Gallery
                      </m.span>
                    </span>
                  </a>
                </Link>
              </div>
              
              <m.div variants={fade} className="p-[14px] md:p-[20px] pt-28 md:pt-32 pb-6 md:pb-8 xl:pb-12">
                <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[3vw] mb-[2.5vw]">
                  {works.map((e, i) => {
                    let classList = '';

                    if (i === 0) {
                      classList = 'row-span-2'
                    } else if (i === 1) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 2) {
                      classList = 'row-span-2'
                    } else if (i === 3) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 4) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 5) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 6) {
                      classList = 'row-span-2'
                    } else if (i === 7) {
                      classList = 'h-[20vw] md:col-span-2 xl:col-span-1 md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 8) {
                      classList = 'row-span-2'
                    } else if (i === 9) {
                      classList = 'md:row-span-2'
                    } else if (i === 10) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 11) {
                      classList = 'xl:row-span-2'
                    } else if (i === 12) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 13) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 14) {
                      classList = ''
                    }
                                       

                    let width = e.imageSlides[1].images[0].asset.metadata.dimensions.width / 4
                    let optimisedWidth = Math.round(width);
                    let height = e.imageSlides[1].images[0].asset.metadata.dimensions.height / 4
                    let optimisedHeight = Math.round(height);

                    return e.imageSlides[1] && (
                      <Link href={`/works/${e.slug.current}`} key={i}>
                        <a className={`grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition ease-in-out duration-700 relative group ${classList}`}>
                          {/* <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">{i}</span> */}

                          <div className="w-full h-full relative overflow-hidden">
                            <m.div className="w-full h-full absolute inset-0" variants={slightScale}>
                              <Photo
                                photo={e.imageSlides[1].images[0]}
                                width={optimisedWidth}
                                height={optimisedHeight}
                                srcSizes={[900]}
                                sizes="(min-width: 900px) 100vw, 100vw"
                                layout="fill"
                                className="w-full h-full object-cover object-center will-change "
                              />
                            </m.div>
                          </div>

                          <span className="hidden md:block overflow-hidden mt-[14px]">
                            <span className="block transition-transform ease-in-out duration-[350ms] translate-y-full group-hover:translate-y-0 will-change">
                              <span className="font-mono text-[14px] text-center block mb-0 pb-0 leading-none uppercase">{e.indexNumber} {e.title}</span>
                            </span>
                          </span>
                        </a>
                      </Link>
                    )
                  })}
                </div>

                {/* <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[2.5vw] mb-[2.5vw]">
                  {works.map((e, i) => {
                    let classList = '';

                    if (i === 0) {
                      classList = 'row-span-2'
                    } else if (i === 1) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 2) {
                      classList = 'row-span-2'
                    } else if (i === 3) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 4) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 5) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 6) {
                      classList = 'row-span-2'
                    } else if (i === 7) {
                      classList = 'h-[20vw] md:col-span-2 xl:col-span-1 md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 8) {
                      classList = 'row-span-2'
                    } else if (i === 9) {
                      classList = 'md:row-span-2'
                    } else if (i === 10) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 11) {
                      classList = 'xl:row-span-2'
                    } else if (i === 12) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 13) {
                      classList = 'h-[20vw] md:h-[17vw] xl:h-[13vw]'
                    } else if (i === 14) {
                      classList = ''
                    }

                    let width = e.imageSlides[1].images[0].asset.metadata.dimensions.width / 4
                    let optimisedWidth = Math.round(width);
                    let height = e.imageSlides[1].images[0].asset.metadata.dimensions.height / 4
                    let optimisedHeight = Math.round(height);

                    return (
                      <Link href={`/works/${e.slug.current}`} key={i}>
                        <a className={`grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition ease-in-out duration-700 relative group ${classList}`}>

                          <div className="w-full h-full relative overflow-hidden">
                            <m.div className="w-full h-full absolute inset-0" variants={slightScale}>
                              <Photo
                                photo={e.imageSlides[1].images[0]}
                                width={optimisedWidth}
                                height={optimisedHeight}
                                srcSizes={[900]}
                                sizes="(min-width: 900px) 100vw, 100vw"
                                layout="fill"
                                className="w-full h-full object-cover object-center will-change "
                              />
                            </m.div>
                          </div>


                          <span className="hidden md:block overflow-hidden mt-[14px]">
                            <span className="block transition-transform ease-in-out duration-[350ms] translate-y-[14px] group-hover:translate-y-0 will-change">
                              <span className="font-mono text-[14px] text-center block mb-0 pb-0 leading-none uppercase">{e.indexNumber} {e.title}</span>
                            </span>
                          </span>
                        </a>
                      </Link>
                    )
                  })}
                </div> */}
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