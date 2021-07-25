import { useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import SanityPageService from '@/services/sanityPageService'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import ImageWrapper from '@/components/image-wrapper'
import Photo from '@/components/photo'
import { Context } from '../../context/state'

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

export default function WorksIndex(initialData) {
  const { data: { works }  } = pageService.getPreviewHook(initialData)()
  const containerRef = useRef(null)
  const [introContext, setIntroContext] = useContext(Context);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title="Works" />

      <LocomotiveScrollProvider
        options={
          {
            smooth: true,
            lerp: 0.04
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
              <m.div variants={fade} data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute top-0 left-0 right-0 mt-5 mx-auto z-40 w-[130px] md:w-[190px] flex">
                <Link href="/works">
                  <a className="text-center uppercase text-[15px] md:text-[22px] w-auto relative inline-block group transition ease-in-out duration-500">
                    Index
                  </a>
                </Link>

                <span className="text-center uppercase text-[15px] md:text-[22px] w-auto relative inline-block group mx-1 transition ease-in-out duration-500 opacity-25">/</span>

                <Link href="/works-gallery">
                  <a className="text-center uppercase text-[15px] md:text-[22px] w-auto relative inline-block group opacity-25 transition ease-in-out duration-500">
                    Gallery
                  </a>
                </Link>
              </m.div>

              <m.div variants={fade} className="p-[14px] md:p-[20px] pt-28 md:pt-40" data-scroll>
                {works.map((e, i) => {
                  return (
                    <div className="border-b border-black pb-6 mb-8 overflow-hidden" key={i}>
                      <span className="md:text-[20px] leading-none tracking-tighter font-semibold">{e.indexNumber}</span>
                      <Link href={`/works/${e.slug.current}`} className="">
                        <a className="block">
                          <h2 className="text-[12vw] md:text-[13vw] ml-[-0.5vw] 2xl:ml-[-0.75vw] leading-none uppercase font-semibold tracking-tighter">{e.title}</h2>
                        </a>
                      </Link>
                      
                      <div className="flex flex-wrap md:space-x-8 font-mono text-[13px] uppercase -mt-5 mb-6">
                        {e.client && (
                          <div className="w-full md:w-auto">
                            <span className="block mb-px md:mb-0">(Client)</span>
                            <span className="block md:ml-3">“{e.client}”</span>
                          </div>
                        )}
                        {e.location && (
                          <div className="w-full md:w-auto">
                            <span className="block mb-px md:mb-0">(Location)</span>
                            <span className="block md:ml-3">“{e.location}”</span>
                          </div>
                        )}
                        {e.gps && (
                          <div className="w-full md:w-auto">
                            <span className="block mb-px md:mb-0">(GPS)</span>
                            <span className="block md:ml-3">“{e.gps}”</span>
                          </div>
                        )}
                        {e.year && (
                          <div className="w-full md:w-auto">
                            <span className="block mb-px md:mb-0">(Year)</span>
                            <span className="block md:ml-3">“{e.year}”</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-[2.5vw] md:space-x-[2vw] xl:space-x-[1.5vw] overflow-x-scroll" data-scroll-direction="horizontal" data-scroll data-scroll-speed="1">
                        {e.imageSlides.map((f, index) => {
                          return (
                            f.images.map((g, i) => {
                              let width = g.asset.metadata.dimensions.width / 2
                              let optimisedWidth = Math.round(width);
                              let height = g.asset.metadata.dimensions.height / 2
                              let optimisedHeight = Math.round(height);
                              return (
                                <Link href={`/works/${e.slug.current}#slider/slide${index}`} key={i}>
                                  <a className={`${f.layout == 'full-landscape' ? 'w-[22vw]' : 'w-[16vw]' } h-[13vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change`}>
                                    <Photo
                                      photo={g}
                                      width={optimisedWidth}
                                      height={optimisedHeight}
                                      layout="fill"
                                      className="w-full h-full object-cover object-center will-change"
                                    />
                                  </a>
                                </Link>
                              )
                            })
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