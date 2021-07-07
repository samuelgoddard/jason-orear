import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

import Image from 'next/image'
import image1 from '@/public/images/work-index-1.webp'
import image2 from '@/public/images/work-index-2.webp'
import image3 from '@/public/images/work-index-3.webp'
import image4 from '@/public/images/work-index-4.webp'
import image5 from '@/public/images/work-index-5.webp'
import image6 from '@/public/images/work-index-6.webp'

export default function Works() {
  const containerRef = useRef(null)

  return (
    <Layout>
      <Head>
        <title>Nextjs boilerplate - Works</title>
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
                {Array.from(Array(10), (e, i) => {
                  return (
                    <div className="border-b border-black pb-6 mb-8 overflow-hidden" key={i}>
                      <span className="md:text-[20px] leading-none tracking-wider">{ i < 9 && (0)}{ i + 1 }</span>

                      <Link href="/work">
                        <a className="block">
                          <h2 className="text-[18vw] md:text-[13vw] ml-[-0.5vw] 2xl:ml-[-0.75vw] leading-none uppercase font-semibold tracking-tighter">Mira</h2>
                        </a>
                      </Link>
                      
                      <div className="flex flex-wrap md:space-x-8 font-mono text-[13px] uppercase -mt-5 mb-6">
                        <div className="w-full md:w-auto">
                          <span className="block mb-px md:mb-0">(Client)</span>
                          <span className="block md:ml-3">“Gensler Architects”</span>
                        </div>
                        <div className="w-full md:w-auto">
                          <span className="block mb-px md:mb-0">(Location)</span>
                          <span className="block md:ml-3">“San Francisco”</span>
                        </div>
                        <div className="w-full md:w-auto">
                          <span className="block mb-px md:mb-0">(GPS)</span>
                          <span className="block md:ml-3">“37°46'09.3"N 122°23'20.5"W”</span>
                        </div>
                        <div className="w-full md:w-auto">
                          <span className="block mb-px md:mb-0">(Year)</span>
                          <span className="block md:ml-3">“2021”</span>
                        </div>
                      </div>

                      <div className="flex space-x-[2.5vw] md:space-x-[2vw] xl:space-x-[1.5vw] overflow-x-scroll will-change" data-scroll-direction="horizontal" data-scroll data-scroll-speed="1">
                        <Link href="/work">
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
                        </Link>
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
