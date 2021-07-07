import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

import Image from 'next/image'
import work1 from '@/public/images/work-1.jpg'
import work2 from '@/public/images/work-2.jpg'
import work3 from '@/public/images/work-3.jpg'
import work4 from '@/public/images/work-4.jpg'
import work5 from '@/public/images/work-5.jpg'

export default function WorksGallery() {
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

              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute top-0 left-0 right-0 mt-5 mx-auto z-40 w-[130px] md:w-[190px] text-center flex">
              <Link href="/works">
                  <a className="text-center uppercase text-[15px] md:text-[22px] w-auto relative inline-block group opacity-25 transition ease-in-out duration-500">
                    Index
                  </a>
                </Link>

                <span className="text-center uppercase text-[15px] md:text-[22px] w-auto relative inline-block group mx-1 transition ease-in-out duration-500 opacity-25">/</span>

                <Link href="/works-gallery">
                  <a className="text-center uppercase text-[15px] md:text-[22px] w-auto relative inline-block group transition ease-in-out duration-500">
                    Gallery
                  </a>
                </Link>
              </div>
              
              <m.div variants={fade} className="p-[20px] pt-28 md:pt-32 pb-6 md:pb-8 xl:pb-12">
                {Array.from(Array(3), (e, i) => {
                  return (
                    <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[2.5vw] mb-[2.5vw]" key={i}>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 row-span-2 relative">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">1</span>
                          <Image
                            src={work1}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:h-[17vw] xl:h-[13vw]">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">2</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative row-span-2">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">3</span>
                          <Image
                            src={work4}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:h-[17vw] xl:h-[13vw]">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">4</span>
                          <Image
                            src={work5}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:h-[17vw] xl:h-[13vw]">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">5</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:h-[17vw] xl:h-[13vw]">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">6</span>
                          <Image
                            src={work3}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative row-span-2">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">7</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:col-span-2 xl:col-span-1 md:h-[17vw] xl:h-[13vw] ">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">8</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative row-span-2">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">9</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative md:row-span-2">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">10</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:h-[17vw] xl:h-[13vw]">
                        <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">11</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative xl:row-span-2">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">12</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:h-[17vw] xl:h-[13vw]">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">13</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
                      <Link href="/work">
                        <a className="grayscale opacity-80 hover:opacity-100 transition-opacity ease-in-out duration-500 relative h-[20vw] md:h-[17vw] xl:h-[13vw]">
                          <span className="absolute top-0 left-0 m-2 md:m-3 xl:m-4 z-10 text-white text-sm font-mono bg-black bg-opacity-20 w-8 h-8 flex items-center justify-center">14</span>
                          <Image
                            src={work2}
                            alt="Placeholder"
                            layout="fill"
                            className="w-full h-full object-cover object-center will-change"
                            placeholder="blur"
                          />
                        </a>
                      </Link>
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