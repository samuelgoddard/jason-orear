import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import SanityPageService from '@/services/sanityPageService'
import Image from 'next/image'
import image1 from '@/public/images/work-index-1.webp'
import image2 from '@/public/images/work-index-2.webp'
import image3 from '@/public/images/work-index-3.webp'
import image4 from '@/public/images/work-index-4.webp'
import image5 from '@/public/images/work-index-5.webp'
import image6 from '@/public/images/work-index-6.webp'

const query = `{
  "works": *[_type == "work"] {
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

  return (
    <Layout>
      <Head>
        <title>Works - Jason O'Rear</title>
      </Head>

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
          <LazyMotion features={domAnimation}>
            <m.section
              initial="initial"
              animate="enter"
              exit="exit"
              className=""
              data-scroll-section
            >
              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute top-0 left-0 right-0 mt-5 mx-auto z-40 w-[130px] md:w-[190px] flex">
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
              </div>

              <m.div variants={fade} className="p-[20px] pt-28 md:pt-40">
                {works.map((e, i) => {
                  return (
                    <div className="border-b border-black pb-6 mb-8 overflow-hidden" key={i}>
                      <span className="md:text-[20px] leading-none tracking-wider">{ i < 9 && (0)}{ i + 1 }</span>

                      <Link href={`/works/${e.slug.current}`}>
                        <a className="block">
                          <h2 className="text-[18vw] md:text-[13vw] ml-[-0.5vw] 2xl:ml-[-0.75vw] leading-none uppercase font-semibold tracking-tighter">{e.title}</h2>
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

                      <div className="flex space-x-[2.5vw] md:space-x-[2vw] xl:space-x-[1.5vw] overflow-x-scroll will-change" data-scroll-direction="horizontal" data-scroll data-scroll-speed="1">
                        {e.imageSlides.map((f, i) => {
                          return (
                            <Link href={`/works/${e.slug.current}#${i}`} key={i}>
                              <a className="w-[12vw] h-[16vw] bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500 will-change">
                                { f.images.map((g, i) => {
                                  return (
                                    <Image
                                      key={i}
                                      src={g.asset.url}
                                      alt="Placeholder"
                                      layout="fill"
                                      className="w-full h-full object-cover object-center will-change"
                                    />
                                  )
                                })}
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