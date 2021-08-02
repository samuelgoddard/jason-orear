import { useContext, useEffect, useRef, useState } from 'react'
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

const query = `{
  "info": *[_type == "info"][0]{
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
  },
  "contact": *[_type == "contact"][0]{
    email,
    instagramUrl,
    phone,
    address
  }
}`

const pageService = new SanityPageService(query)

export default function Info(initialData) {
  const { data: { info, contact }  } = pageService.getPreviewHook(initialData)()
  const containerRef = useRef(null)
  const [introContext, setIntroContext] = useContext(Context);
  const [clientsExpanded, setClientsExpanded] = useState(false)
  const [publicationsExpanded, setPublicationsExpanded] = useState(false)

  const toggleClients = () => setClientsExpanded(!clientsExpanded);
  const togglePublications = () => setPublicationsExpanded(!publicationsExpanded);

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
              <div className={`text-black min-h-screen flex flex-col p-[14px] md:p-[20px] pt-20 md:pt-32 lg:pt-[100px] 2xl:pt-[118px] justify-end relative`}>

                {/* <m.div variants={fade} className="absolute inset-0 z-0 bg-yellow"></m.div> */}
                
                <div className="flex flex-wrap h-full lg:-mx-5 relative z-10">
                  <div className="w-full lg:w-[62%] lg:px-5 relative mb-12 lg:mb-0">
                    <div className="flex flex-wrap w-full">
                      <div className="order-2 md:order-1 w-8/12 md:w-10/12 xl:w-9/12">
                        <div className="flex flex-wrap w-full md:-mx-4">
                          <div className="w-full md:w-1/2 md:px-4 mb-5 md:mb-0">
                            <span className="block overflow-hidden mb-[2vh] mt-8 md:mt-0">
                              <m.span variants={reveal} className="font-mono uppercase text-[11px] md:text-[13px] block">(Clients)</m.span>
                            </span>

                            <m.ul
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              className=""
                              variants={{
                                enter: { transition: { delayChildren: 0.25 } }
                              }}
                              className="mb-[3vh] font-mono uppercase tracking-wide text-[11px] md:text-[12px] 2xl:text-[13px] lg:hidden 2xl:block"
                            >

                              {info.clients.map((e,i) => {
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

                            {/* Small Screen... */}
                            <m.ul
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              className=""
                              variants={{
                                enter: { transition: { delayChildren: 0.25 } }
                              }}
                              className="mb-[3vh] font-mono uppercase tracking-wide text-[11px] md:text-[12px] 2xl:text-[13px] hidden lg:block 2xl:hidden"
                            >

                              {info.clients.slice(0,4).map((e,i) => {
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
                              {info.clients.slice(4).map((e,i) => {
                                return (
                                  <li key={i} className={`overflow-hidden hidden 2xl:hidden ${clientsExpanded ? 'lg:block' : 'lg:hidden'}`}>
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
                              <li>
                                <span className="block overflow-hidden">
                                  <m.span variants={reveal} className="block">
                                    <button className="block uppercase border-none outline-none focus:outline-none focus:border-none hover:text-burnt-yellow transition-colors ease-in-out duration-300" onClick={toggleClients}>+ {info.clients.length - 4} More</button>
                                  </m.span>
                                </span>
                              </li>
                            </m.ul>
                          </div>
                            
                          <div className="w-full md:w-1/2 md:px-4">
                            <span className="block overflow-hidden mb-[2vh]">
                              <m.span variants={reveal} className="font-mono uppercase text-[11px] md:text-[13px] block">(Publications)</m.span>
                            </span>
                            <m.ul
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              className=""
                              variants={{
                                enter: { transition: { delayChildren: 0.25 } }
                              }}
                              className="mb-[3vh] font-mono uppercase tracking-wide text-[11px] md:text-[12px] 2xl:text-[13px] lg:hidden 2xl:block"
                            >

                              {info.publications.map((e,i) => {
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
                            
                            {/* Small Screen... */}
                            <m.ul
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              className=""
                              variants={{
                                enter: { transition: { delayChildren: 0.25 } }
                              }}
                              className="mb-[3vh] font-mono uppercase tracking-wide text-[11px] md:text-[12px] 2xl:text-[13px] hidden lg:block 2xl:hidden"
                            >

                              {info.publications.slice(0,4).map((e,i) => {
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
                              {info.publications.slice(4).map((e,i) => {
                                return (
                                  <li key={i} className={`overflow-hidden hidden 2xl:hidden ${publicationsExpanded ? 'lg:block' : 'lg:hidden'}`}>
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
                              <li>
                                <span className="block overflow-hidden">
                                  <m.span variants={reveal} className="block">
                                    <button className="block uppercase border-none outline-none focus:outline-none focus:border-none hover:text-burnt-yellow transition-colors ease-in-out duration-300" onClick={togglePublications}>+ {info.publications.length - 4} More</button>
                                  </m.span>
                                </span>
                              </li>
                            </m.ul>
                          </div>
                        </div>
                      </div>
                      
                      <m.div variants={fade} className="w-full h-[65vh] md:h-[65vh] lg:h-[58vh] 2xl:h-[50vh] mt-auto order-1 md:order-2 relative bg-white">
                        <div className="relative overflow-hidden w-full h-full mix-blend-multiply bg-blend-multiply">
                          <m.div variants={slightScale} className="absolute inset-0 w-full h-full mix-blend-multiply bg-blend-multiply">
                            <Image
                              src={info.biographyImage.asset.url}
                              alt="Jason O'Rear Biography Image"
                              layout="fill"
                              className={`w-full h-full object-cover object-center mix-blend-multiply bg-blend-multiply will-change bg-white`}
                              placeholder="blur"
                              blurDataURL={info.biographyImage.asset.metadata.lqip}
                            />
                          </m.div>
                        </div>

                        <h1 className="block text-upright uppercase font-semibold text-[40vw] md:text-[20vh] lg:text-[38vh] xl:text-[38vh] 2xl:text-[35vh] leading-[0.825] absolute bottom-[-2vh] md:bottom-0 right-0 z-30 mb-[-10vw] md:mb-0 lg:mr-[-5.2vw] xl:mr-[-4.8vw] 2xl:mr-[-5.75vw] text-[#101010] overflow-hidden">
                          <m.span variants={revealHori} className="block">
                            Info
                          </m.span>
                        </h1>
                      </m.div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3 lg:px-5 lg:ml-auto text-[16px] lg:text-[16px] 2xl:text-[20px] leading-tight flex flex-col items-start mb-4 lg:mb-0">
                    <div className="w-10/12 lg:w-full lg:max-w-[280px] xl:max-w-[345px] 2xl:max-w-[380px] md:mx-auto mb-8">
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-[17px] md:mb-6">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Biography)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full content max-w-[480px] lg:max-w-none">
                        <BlockContent serializers={{ container: ({ children }) => children }} blocks={info.biographyText} />
                      </m.div>
                    </div>

                    <div className="w-10/12 lg:w-full lg:max-w-[280px] xl:max-w-[345px] 2xl:max-w-[380px] md:mx-auto mt-auto mb-[2vh]">
                      
                      {/* Phone */}
                      {contact.phone && (
                        <>
                          <div className="w-full">
                            <div className="relative block overflow-hidden mb-2">
                              <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Phone)</m.span>
                            </div>
                          </div>
                          <m.div variants={fade} className="w-full mb-6">
                            <a href={`tel:${contact.phone}`} className="block uppercase text-[13px] md:text-[15px] 2xl:text-[16px] lg:text-[14px] ml-[10px] md:ml-[20px] underline transition-colors ease-in-out duration-300 hover:text-burnt-yellow focus:text-burnt-yellow">{contact.phone}</a>
                          </m.div>
                        </>
                      )}
                      
                      {/* Email */}
                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-2">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Email)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full mb-6">
                        <a href={`mailto:${contact.email}`} className="block uppercase text-[13px] md:text-[15px] 2xl:text-[16px] lg:text-[14px] ml-[10px] md:ml-[20px] underline transition-colors ease-in-out duration-300 hover:text-burnt-yellow focus:text-burnt-yellow">{contact.email}</a>
                      </m.div>

                      {/* Address */}
                      {contact.address && (
                        <>
                          <div className="w-full">
                            <div className="relative block overflow-hidden mb-2">
                              <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Address)</m.span>
                            </div>
                          </div>
                          <m.div variants={fade} className="w-full mb-6">
                            <span className="block uppercase text-[13px] md:text-[15px] 2xl:text-[15px] lg:text-[14px] ml-[10px] md:ml-[20px] max-w-[200px]">{contact.address}</span>
                          </m.div>
                        </>
                      )}

                      {/* Social */}
                      {contact.instagramUrl && (
                        <>
                          <div className="w-full">
                            <div className="relative block overflow-hidden mb-2">
                              <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Social)</m.span>
                            </div>
                          </div>
                          <m.div variants={fade} className="w-full mb-6">
                            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="block uppercase 6ext-[13px] md:text-[15px] 2xl:text-[15px] lg:text-[14px] ml-[10px] md:ml-[20px] underline transition-colors ease-in-out duration-300 hover:text-burnt-yellow focus:text-burnt-yellow">Instagram</a>
                          </m.div>
                        </>
                      )}

                      <div className="w-full">
                        <div className="relative block overflow-hidden mb-2">
                          <m.span variants={reveal} className="font-mono block uppercase text-[11px] md:text-[13px]">(Site Credit)</m.span>
                        </div>
                      </div>
                      <m.div variants={fade} className="w-full">
                        <a href="https://shiftwalk.studio" target="_blank" rel="noopener noreferrer" className="block uppercase 6ext-[13px] md:text-[15px] 2xl:text-[15px] lg:text-[14px] ml-[10px] md:ml-[20px] underline transition-colors ease-in-out duration-300 hover:text-burnt-yellow focus:text-burnt-yellow">ShiftWalk&trade;</a>
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