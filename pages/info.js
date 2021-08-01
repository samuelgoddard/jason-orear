import { useContext, useEffect, useRef } from 'react'
import Layout from '@/components/layout'
import { fade, reveal, revealHori, slightScale } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import SanityPageService from '@/services/sanityPageService'
import BlockContent from '@sanity/block-content-to-react'
import { Context } from '../context/state'
import SplitText from '@/components/split-text'
import ConditionalWrap from 'conditional-wrap';

const query = `*[_type == "info"][0]{
  seo {
    ...,
    shareGraphic {
      asset->
    }
  },
  title,
  biographyText,
  clients[] {
    title,
    url
  },
  publications[] {
    title,
    url
  },
  biographyImage {
    asset -> {
      ...
    }
  }
}`

const pageService = new SanityPageService(query)

export default function Info(initialData) {
  const { data: { title, seo, biographyText, clients, publications, biographyImage }  } = pageService.getPreviewHook(initialData)()
  const containerRef = useRef(null)
  const [introContext, setIntroContext] = useContext(Context);

  useEffect(() => {
    setIntroContext(true)
  },[]);
  
  // let bodyColors = [
  //   "bg-red",
  //   "bg-purple",
  //   "bg-green",
  //   "bg-teal",
  //   "bg-blue",
  //   "bg-yellow"
  // ];

  // let bodyColor = bodyColors[Math.floor(Math.random()*bodyColors.length)];
  
  return (
    <Layout>
      <NextSeo title="Info" />
      
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
            >
              <div className={`text-black min-h-screen flex flex-col p-[14px] md:p-[20px] pt-20 md:pt-32 justify-end relative`}>

                {/* <m.div variants={fade} className="absolute inset-0 z-0 bg-yellow"></m.div> */}
                
                <div className="flex flex-wrap h-full lg:-mx-5 relative z-10">
                  <div className="w-full lg:w-[62%] lg:px-5 relative mb-12 lg:mb-0">
                    <div className="flex flex-wrap w-full">
                      <div className="order-2 md:order-1 w-8/12 md:w-10/12 xl:w-9/12">
                        <div className="flex flex-wrap w-full md:-mx-4">
                          <div className="w-full md:w-1/2 md:px-4 mb-5 md:mb-0">
                            <span className="block overflow-hidden mb-[2vh] mt-8 md:mt-0">
                              <m.span variants={reveal} className="font-mono uppercase tracking-wider text-[11px] md:text-[13px] block">(Clients)</m.span>
                            </span>

                            <m.ul
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              className=""
                              variants={{
                                enter: { transition: { delayChildren: 0.25 } }
                              }}
                              className="mb-[3vh] font-mono uppercase tracking-wider text-[11px] md:text-[13px]"
                            >

                              {clients.map((e,i) => {
                                return (
                                  <li key={i} className="block overflow-hidden">
                                    <m.span variants={reveal} className="block">
                                      <ConditionalWrap
                                        condition={!!e.url}
                                        wrap={children => (
                                          <a href={e.url} target="_blank" rel="noopener noreferrer" className="underline block hover:text-burnt-yellow focus:text-burnt-yellow transition-colors ease-in-out duration-300">
                                            {children}
                                          </a>
                                        )}
                                      >
                                        {e.title}
                                      </ConditionalWrap>
                                    </m.span>
                                  </li>
                                )
                              })}
                            </m.ul>
                          </div>
                            
                          <div className="w-full md:w-1/2 md:px-4">
                            <span className="block overflow-hidden mb-[2vh]">
                              <m.span variants={reveal} className="font-mono uppercase tracking-wider text-[11px] md:text-[13px] block">(Publications)</m.span>
                            </span>
                            <m.ul
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              className=""
                              variants={{
                                enter: { transition: { delayChildren: 0.25 } }
                              }}
                              className="mb-[3vh] font-mono uppercase tracking-wider text-[11px] md:text-[13px]"
                            >

                              {publications.map((e,i) => {
                                return (
                                  <li key={i} className="block overflow-hidden">
                                    <m.span variants={reveal} className="block">
                                      <ConditionalWrap
                                        condition={!!e.url}
                                        wrap={children => (
                                          <a href={e.url} target="_blank" rel="noopener noreferrer" className="underline block hover:text-burnt-yellow focus:text-burnt-yellow transition-colors ease-in-out duration-300">
                                            {children}
                                          </a>
                                        )}
                                      >
                                        {e.title}
                                      </ConditionalWrap>
                                    </m.span>
                                  </li>
                                )
                              })}
                            </m.ul>
                          </div>
                        </div>
                      </div>
                      
                      <m.div variants={fade} className="w-full h-[65vh] md:h-[65vh] 2xl:h-[50vh] mt-auto order-1 md:order-2 relative bg-white">
                        <div className="relative overflow-hidden w-full h-full mix-blend-multiply bg-blend-multiply">
                          <m.div variants={slightScale} className="absolute inset-0 w-full h-full mix-blend-multiply bg-blend-multiply">
                            <Image
                              src={biographyImage.asset.url}
                              alt="Jason O'Rear Biography Image"
                              layout="fill"
                              className={`w-full h-full object-cover object-center mix-blend-multiply bg-blend-multiply will-change bg-white`}
                              placeholder="blur"
                              blurDataURL={biographyImage.asset.metadata.lqip}
                            />
                          </m.div>
                        </div>

                        <h1 className="block text-upright uppercase font-semibold text-[40vw] md:text-[20vh] lg:text-[24vh] xl:text-[32vh] 2xl:text-[35vh] leading-[0.825] absolute bottom-[-2vh] md:bottom-0 right-0 z-30 mb-[-10vw] md:mb-0 xl:mr-[-4.8vw] 2xl:mr-[-5.75vw] text-[#101010] overflow-hidden">
                          <m.span variants={revealHori} className="block">
                            Info
                          </m.span>
                        </h1>
                      </m.div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3 lg:px-5 lg:ml-auto text-[16px] lg:text-[18px] xl:text-[20px] leading-tight flex flex-col items-start mb-4 lg:mb-0">
                    <div className="w-10/12 lg:w-full lg:max-w-[280px] xl:max-w-[345px] 2xl:max-w-[380px] md:mx-auto mb-8">
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-[17px] md:mb-10">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Biography)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full content max-w-[480px] lg:max-w-none">
                        <BlockContent serializers={{ container: ({ children }) => children }} blocks={biographyText} />
                      </m.div>
                    </div>

                    <div className="w-10/12 lg:w-full lg:max-w-[280px] xl:max-w-[345px] 2xl:max-w-[380px] md:mx-auto mt-auto mb-[2vh]">
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-[17px] md:mb-10">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Contact)</m.span>
                        </div>
                      </div>
                      
                      {/* Phone */}
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-2">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Phone)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full mb-6">
                        <a href="#" className="block uppercase text-[13px] md:text-[15px] lg:text-[16px] ml-[10px] md:ml-[20px] underline transition-colors ease-in-out duration-300 hover:text-burnt-yellow focus:text-burnt-yellow">01020123213</a>
                      </m.div>
                      
                      {/* Phone */}
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-2">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Email)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full mb-6">
                        <a href="#" className="block uppercase text-[13px] md:text-[15px] lg:text-[16px] ml-[10px] md:ml-[20px] underline transition-colors ease-in-out duration-300 hover:text-burnt-yellow focus:text-burnt-yellow">efwef@wefwef.com</a>
                      </m.div>

                      {/* Address */}
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-2">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Address)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full mb-6">
                        <span className="block uppercase text-[13px] md:text-[15px] lg:text-[16px] ml-[10px] md:ml-[20px]">34 CERVANTES BLVD.<br/>SAN FRANCISCO, CA<br/>94123</span>
                      </m.div>

                      {/* Social */}
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-2">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Social)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full">
                        <a href="#" className="block uppercase text-[13px] md:text-[15px] lg:text-[16px] ml-[10px] md:ml-[20px] underline transition-colors ease-in-out duration-300 hover:text-burnt-yellow focus:text-burnt-yellow">Instagram</a>
                      </m.div>

                    </div>
                  </div>
                </div>
              </div>
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