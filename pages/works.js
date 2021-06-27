import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Image from 'next/image'
import worksImage from '@/public/images/works.webp'

export default function Works() {
  return (
    <Layout>
      <Head>
        <title>Nextjs boilerplate - Works</title>
      </Head>
      
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
          data-scroll-section
        >
          <m.div variants={fade} className="p-[20px] pt-28 md:pt-40">

            <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute top-0 left-0 right-0 mt-8 mx-auto z-40 w-50 text-center">
              <Link href="/works-gallery"><a className="text-center uppercase text-[15px] md:text-[22px] w-50">Gallery View</a></Link>
            </div>

            {Array.from(Array(10), (e, i) => {
              return (
                <div className="border-b border-black pb-6 mb-8" key={i}>
                  <span className="md:text-[20px] leading-none tracking-wider">*JO’R — PRJ_02</span>
                  <h2 className="text-[18vw] md:text-[13vw] ml-[-0.5vw] 2xl:ml-[-0.75vw] leading-none uppercase font-semibold tracking-tighter">Mira</h2>
                  
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

                  <div className="flex space-x-8 overflow-x-scroll will-change" data-scroll-direction="horizontal" data-scroll data-scroll-speed="1">
                    <div className="w-full md:w-80 h-64 bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500">
                      <Image
                        src={worksImage}
                        alt="Placeholder"
                        layout="fill"
                        className="w-full h-full object-cover object-center will-change"
                        placeholder="blur"
                      />
                    </div>
                    <div className="w-full md:w-48 h-64 bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500">
                      <Image
                        src={worksImage}
                        alt="Placeholder"
                        layout="fill"
                        className="w-full h-full object-cover object-center will-change"
                        placeholder="blur"
                      />
                    </div>
                    <div className="w-full md:w-48 h-64 bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500">
                      <Image
                        src={worksImage}
                        alt="Placeholder"
                        layout="fill"
                        className="w-full h-full object-cover object-center will-change"
                        placeholder="blur"
                      />
                    </div>
                    <div className="w-full md:w-80 h-64 bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500">
                      <Image
                        src={worksImage}
                        alt="Placeholder"
                        layout="fill"
                        className="w-full h-full object-cover object-center will-change"
                        placeholder="blur"
                      />
                    </div>
                    <div className="w-full md:w-48 h-64 bg-gray-100 relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition ease-in-out duration-500">
                      <Image
                        src={worksImage}
                        alt="Placeholder"
                        layout="fill"
                        className="w-full h-full object-cover object-center will-change"
                        placeholder="blur"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </m.div>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}
