import { useState, useEffect, useContext } from 'react'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import SanityPageService from '@/services/sanityPageService'
import { Context } from '../context/state'

const query = `{
  "home": *[_type == "home"][0]{
    title,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
    featuredWork[]->{
      slug {
        current
      },
      title,
      gps,
      indexNumber,
      homeCarouselImage {
        asset ->
      },
      imageSlides[]{
        layout,
        images[] {
          asset-> {
            ...
          }
        }
      }
    }
  },
}`

const pageService = new SanityPageService(query)

export default function Home(initialData) {
  const { data: { home }  } = pageService.getPreviewHook(initialData)()
  const [currentProject, setCurrentProject] = useState(1);
  const [introContext, setIntroContext] = useContext(Context);
  
  let numberSplit = home.featuredWork[0].indexNumber.split("")
  let numberSplit1 = home.featuredWork[1].indexNumber.split("")
  let numberSplit2 = home.featuredWork[2].indexNumber.split("")
  let numberSplit3 = home.featuredWork[3].indexNumber.split("")
  let numberSplit4 = home.featuredWork[4].indexNumber.split("")
  let coords = ''
  let numberRoll = ''

  if (currentProject == 2) {
    coords = 'md:translate-y-[-22px]'
    numberRoll = 'md:translate-y-[-160px] 2xl:translate-y-[-230px]'
  } else if (currentProject == 3) {
    coords = 'md:translate-y-[-44px]'
    numberRoll = 'md:translate-y-[-320px] 2xl:translate-y-[-460px]'
  } else if (currentProject == 4) {
    coords = 'md:translate-y-[-66px]'
    numberRoll = 'md:translate-y-[-480px] 2xl:translate-y-[-690px]'
  } else if (currentProject == 5) {
    coords = 'md:translate-y-[-88px]'
    numberRoll = 'md:translate-y-[-640px] 2xl:translate-y-[-920px]'
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIntroContext(true)
    }, 6000);
  },[]);

  const reveal = {
    initial: { y: '100%' },
    enter: { 
      y: 0,
      transition: { delay: introContext ? 0 : 5.25, duration: 1, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '100%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }

  return (
    <Layout>
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <div className="min-h-screen flex flex-col p-[20px]">
          {/* {home.featuredWork.map((e, i) => {
            e.imageSlides.map(e, i) => {
              return (

              )
            })
            })} */}
            
            <m.div variants={fade} className="text-white my-auto">
              <div className="w-full h-[60vh] md:h-[63vh] relative mt-[-2vw]">
                <div className="absolute inset-0 flex flex-wrap z-[6]">
                  
                  <Link href={`/works/${home.featuredWork[0].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(1)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[1].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(2)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[2].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(3)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[3].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(4)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[4].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(5)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                </div>
                
                <Image
                  src={home.featuredWork[0].homeCarouselImage.asset.url}
                  alt="Placeholder"
                  layout="fill"
                  className={`w-full h-full object-cover object-center [z-2] home-image md:opacity-0 ${currentProject === 1 ? 'md:opacity-100 md:scale-[1.005]' : 'md:opacity-0 md:scale-[1.0275]'}`}
                  placeholder="blur"
                  blurDataURL={home.featuredWork[0].homeCarouselImage.asset.metadata.lqip}
                />

                <div className="hidden md:block">
                  <Image
                    src={home.featuredWork[1].homeCarouselImage.asset.url}
                    alt="Placeholder"
                    layout="fill"
                    className={`w-full h-full object-cover object-center [z-1] opacity-0 home-image ${currentProject === 2 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                    placeholder="blur"
                    blurDataURL={home.featuredWork[1].homeCarouselImage.asset.metadata.lqip}
                  />
                </div>

                <div className="hidden md:block">
                  <Image
                    src={home.featuredWork[2].homeCarouselImage.asset.url}
                    alt="Placeholder"
                    layout="fill"
                    className={`w-full h-full object-cover object-center [z-2] opacity-0 home-image ${currentProject === 3 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                    placeholder="blur"
                    blurDataURL={home.featuredWork[2].homeCarouselImage.asset.metadata.lqip}
                  />
                </div>
                
                <div className="hidden md:block">
                  <Image
                    src={home.featuredWork[3].homeCarouselImage.asset.url}
                    alt="Placeholder"
                    layout="fill"
                    className={`w-full h-full object-cover object-center [z-3] opacity-0 home-image ${currentProject === 4 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                    placeholder="blur"
                    blurDataURL={home.featuredWork[3].homeCarouselImage.asset.metadata.lqip}
                  />
                </div>
                
                <div className="hidden md:block">
                  <Image
                    src={home.featuredWork[4].homeCarouselImage.asset.url}
                    alt="Placeholder"
                    layout="fill"
                    className={`w-full h-full object-cover object-center [z-4] opacity-0 home-image ${currentProject === 5 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                    placeholder="blur"
                    blurDataURL={home.featuredWork[4].homeCarouselImage.asset.metadata.lqip}
                  />
                </div>
              </div>
            </m.div>

            <div className="flex flex-wrap items-end">
              
              <span className={`w-full md:w-auto text-[18px] md:text-[22px] leading-none md:fixed bottom-0 left-0 mb-1 md:m-[20px] variant-numeric tracking-tighter`}>
                <span className="block overflow-hidden md:h-[22px]">
                  <m.span variants={reveal} className="block">
                    <span className={`block ${coords} transition-transform ease-in-out duration-500`}>
                      <span className="block leading-none">{home.featuredWork[0].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[1].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[2].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[3].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[4].gps}</span>
                    </span>
                  </m.span>
                </span>
              </span>

              <span className="w-full text-[18px] md:text-[22px] tracking-tight ml-auto leading-none uppercase md:fixed md:text-center block">
                <span className="block overflow-hidden md:h-[22px]">
                  <m.span variants={reveal} className="block">
                    <span className={`block ${coords} transition-transform ease-in-out duration-500`}>
                      <span className="block leading-none">{home.featuredWork[0].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[1].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[2].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[3].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[4].title}</span>
                    </span>
                  </m.span>
                </span>
              </span>

              <span className="overflow-hidden ml-auto fixed bottom-0 right-0 flex items-end mb-[9px] md:mb-[-7px] 2xl:mb-[-12px] mr-[20px]">
                <m.span variants={reveal} className="block">
                  <span className="text-[60px] md:text-[160px] 2xl:text-[230px] leading-none font-semibold tracking-tight flex items-end"><span className="block text-[18px] md:text-[22px] tracking-tight leading-none mb-[33px] md:mb-[27px] 2xl:mb-[33px] uppercase font-normal">p /</span>
                    <span className="block tracking-tighter">
                      <span className="block overflow-hidden md:h-[160px] 2xl:h-[230px]">
                        <span className={`block`}>
                          <span className="block leading-none">
                            {numberSplit.map((e, i) => {
                              return (
                                <span className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit1.map((e, i) => {
                              return (
                                <span className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit2.map((e, i) => {
                              return (
                                <span className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit3.map((e, i) => {
                              return (
                                <span className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit4.map((e, i) => {
                              return (
                                <span className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </m.span>
              </span>
            </div>
          </div>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}