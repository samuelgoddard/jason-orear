import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade, reveal, slightScale } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Image from 'next/image'
import workImage from '@/public/images/work-slug.webp'
import work2 from '@/public/images/work-2.webp'
import work3 from '@/public/images/work-3.webp'
import work4 from '@/public/images/work-4.webp'
import ReactFullpage from '@fullpage/react-fullpage';
import SanityPageService from '@/services/sanityPageService'
import { NextSeo } from 'next-seo'
import { Context } from '../../context/state'
import Photo from '@/components/photo';
import Div100vh from 'react-div-100vh';

const pluginWrapper = () => {
  require('../../static/fullpage.scrollHorizontally.min.js');
};

const query = `*[_type == "work" && slug.current == $slug][0]{
  seo {
    ...,
    shareGraphic {
      asset->
    }
  },
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
  'next': *[indexNumber > ^.indexNumber] | order(indexNumber asc) [0] {
    title,
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
  },
  slug {
    current
  }
}`

const pageService = new SanityPageService(query)

export default function WorksSlug(initialData) {
  const { data: { title, seo, slug, indexNumber, client, location, gps, year, imageSlides, next }  } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(Context);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title={title} />
      
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
          id="inner-container"
          data-scroll-section
        >
          <Div100vh className="flex flex-col p-[14px] md:p-[20px]">
            <ReactFullpage
              navigation={false}
              anchors={['slider']}
              controlArrows={false}
              pluginWrapper={pluginWrapper}
              licenseKey={'3E8E8C87-B0B24A84-8C40386A-A5CE366D'}
              // onLeave={this.onLeave.bind(this)}
              scrollingSpeed = {800}
              loopHorizontal={false}
              scrollHorizontally={true}
              scrollHorizontallyKey={'dmVyY2VsLmFwcF9icnZjMk55YjJ4c1NHOXlhWHB2Ym5SaGJHeDUwcHo='}
              render={({ state, fullpageApi }) => {
                return (
                  <ReactFullpage.Wrapper>
                    <m.div variants={fade} className="section">
                    {imageSlides.map((f, i) => {
                      
                      let layoutOuterWrapper = 'w-10/12 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]';

                      let layoutWrapper = 'flex items-center h-full';
                      
                      if (f.layout == 'full-portrait') {
                        layoutWrapper = 'overflow-hidden w-7/12 md:w-[32%] xl:w-[28%] 2xl:w-[28%] h-[55vh] md:h-[62vh] xl:h-[69vh] relative mx-auto will-change mt-[-6vh]';
                        layoutOuterWrapper = 'my-auto flex items-center max-w-screen-2xl mx-auto';
                      } else if (f.layout == 'full-landscape') {
                        layoutWrapper = 'overflow-hidden w-9/12 md:w-8/12 h-[55vh] md:h-[63vh] xl:h-[66vh] 2xl:h-[62vh] relative mx-auto will-change mt-[-6vh]';
                        layoutOuterWrapper = 'flex items-center h-full';
                      } else if (f.layout == 'two-portrait') {
                        layoutWrapper = 'overflow-hidden w-1/2 md:w-1/2 h-[55vh] md:h-[62vh] xl:h-[69vh] relative mx-auto will-change mt-[-6vh]';
                        layoutOuterWrapper = 'my-auto flex w-8/12 md:w-[40%] xl:md:w-[55%] mx-auto space-x-[5vw] max-w-screen-xl';
                      }
                      
                      return (
                        <div className="slide will-change flex items-center TEST" id={i} data-anchor={`slide${i}`} key={i}>
                          <div className={layoutOuterWrapper}>
                            { f.images.map((g, i) => {
                              let width = g.asset.metadata.dimensions.width / 2
                              let optimisedWidth = Math.round(width);
                              let height = g.asset.metadata.dimensions.height / 2
                              let optimisedHeight = Math.round(height);

                              return (
                                <div className={layoutWrapper} key={i}>
                                  <m.div variants={slightScale} className="absolute inset-0">
                                    <Photo
                                      photo={g}
                                      width={optimisedWidth}
                                      height={optimisedHeight}
                                      sizes="(min-width: 1920px) 100vw, (min-width: 1600px) 100vw, (min-width: 1280px) 90vw, (min-width: 768px) 90vw, 200vw"
                                      layout="fill"
                                      className="w-full h-full object-cover object-center will-change"
                                    />
                                  </m.div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}

                      {/* <div className="slide will-change flex items-center" id="slide-1">
                        <div className="flex items-center h-full">
                          <div className="w-10/12 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]">
                            <Image
                              src={workImage}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="slide will-change" id="slide-2">
                        <div className="my-auto flex items-center max-w-screen-2xl mx-auto">
                          <div className="w-7/12 md:w-6/12 xl:w-5/12 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]">
                            <Image
                              src={work2}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="slide will-change" id="slide-3">
                        <div className="my-auto flex w-8/12 mx-auto space-x-[5vw] max-w-screen-xl">
                          <div className="w-1/2 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]">
                            <Image
                              src={work3}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </div>
                          <div className="w-1/2 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]">
                            <Image
                              src={work4}
                              alt="Placeholder"
                              layout="fill"
                              className="w-full h-full object-cover object-center will-change"
                              placeholder="blur"
                            />
                          </div>
                        </div>
                      </div> */}

                      <div className="slide will-change relative" id="slide-4">
                        { next ? (
                          <>
                            <div className="font-mono text-[12px] md:text-[13px] uppercase absolute top-auto bottom-0 md:bottom-auto md:top-0 left-0 mb-[78vw] md:mb-0 md:mt-20">
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(Client)</span>
                                <span className="block md:ml-3">“{next.client}”</span>
                              </div>
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(Location)</span>
                                <span className="block md:ml-3">“{next.location}”</span>
                              </div>
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(GPS)</span>
                                <span className="block md:ml-3">“{next.gps}”</span>
                              </div>
                              <div className="w-full mb-[2px] md:mb-2">
                                <span className="hidden md:block mb-px md:mb-0">(Year)</span>
                                <span className="block md:ml-3">“{next.year}”</span>
                              </div>
                            </div>
                            
                            <div className="my-auto mt-[-30vw] md:mt-0 flex w-full mx-auto space-x-[5vw] max-w-screen-xl items-center justify-center">
                              <Link href={`/works/${next.slug.current}`}>
                                <a className="will-change mt-[-6vh] block text-center md:text-left">
                                  <span className="block uppercase text-[14px] md:text-[20px] leading-none mb-[12px] md:mb-[20px] 2xl:mb-[28px]">Next Project</span>
                                  <span className="block text-[8vw] md:text-[11vw] 2xl:text-[12vw] uppercase font-semibold leading-[0.875] ml-[-1vw] 2xl:ml-[-18px] -mt-px md:-mt-1 2xl:-mt-3">{next.title}</span>
                                </a>
                              </Link>
                            </div>

                            <div className="w-full md:w-[25vw] h-[30vh] md:h-[24vh] mx-auto will-change absolute bottom-0 right-0 left-0 md:left-auto mb-[65px] md:mb-[48px]">
                              <Photo
                                photo={next.imageSlides[0].images[0]}
                                width={next.imageSlides[0].images[0].asset.metadata.dimensions.width / 3}
                                height={next.imageSlides[0].images[0].asset.metadata.dimensions.height / 3}
                                srcSizes={[900]}
                                sizes="(min-width: 900px) 100vw, 100vw"
                                layout="fill"
                                className="w-full h-full object-cover object-center will-change "
                              />
                            </div>
                          </>
                        ) : (
                          <>                            
                            <div className="my-auto mt-[-30vw] md:mt-0 flex w-full mx-auto space-x-[5vw] max-w-screen-xl items-center justify-center">
                              <Link href={`/works`}>
                                <a className="will-change mt-[-6vh] block text-center md:text-left">
                                  <span className="block uppercase text-[14px] md:text-[20px] leading-none mb-[12px] md:mb-[20px] 2xl:mb-[28px]">Back To</span>
                                  <span className="block text-[8vw] md:text-[11vw] 2xl:text-[12vw] uppercase font-semibold leading-[0.875] ml-[-1vw] 2xl:ml-[-18px] -mt-px md:-mt-1 2xl:-mt-3">All Projects</span>
                                </a>
                              </Link>
                            </div>

                            {/* <div className="w-full md:w-[25vw] h-[30vh] md:h-[24vh] mx-auto will-change absolute bottom-0 right-0 left-0 md:left-auto mb-[65px] md:mb-[48px]">
                              <Image
                                src={workImage}
                                alt="Placeholder"
                                layout="fill"
                                className="w-full h-full object-cover object-center will-change"
                                placeholder="blur"
                              />
                            </div> */}
                          </>
                        )}
                      </div>
                    </m.div>
                  </ReactFullpage.Wrapper>
                );
              }}
            />
          
          <m.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              enter: { transition: { delayChildren: 0.25 } }
            }}
          >
              <div data-scroll data-scroll-sticky data-scroll-target="#inner-container" className="fixed md:absolute bottom-0 left-0 z-40 w-auto text-center">
                <span className="block overflow-hidden m-[14px] md:m-[18px]">
                  <m.span variants={reveal} className="block">
                    <Link href="/works">
                      <a className="text-center uppercase text-[15px] md:text-[19px] xl:text-[22px] w-auto relative inline-block group">
                        <span className="inline-block">Back</span>
                        <span className="block transition-all ease-in-out duration-500 w-full scale-x-0 group-hover:scale-x-100 h-[2px] bg-black"></span>
                      </a>
                    </Link>
                  </m.span>
                </span>
              </div>

              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute bottom-0 left-0 right-0 z-30 mb-[50px] md:mb-[18px] w-auto text-center mx-auto">
                <span className="block overflow-hidden">
                  <m.h1 variants={reveal} className="text-center uppercase text-[23px] md:text-[30px] xl:text-[40px] 2xl:text-[55px] leading-[1.125] w-auto relative inline-block group m-0 p-0">
                    {title}
                  </m.h1>
                </span>
              </div>

              <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute bottom-0 right-0 z-40 m-[14px] md:m-[18px] w-auto text-center">
                <span className="block overflow-hidden">
                  <m.span variants={reveal} className="text-center uppercase text-[15px] md:text-[19px] xl:text-[22px] w-auto relative inline-block group">
                    1/7
                  </m.span>
                </span>
              </div>
            </m.div>
          </Div100vh>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return {
    props
  };
}

export async function getStaticPaths() {
  const paths = await pageService.fetchPaths('work')
  return {
    paths: paths,
    fallback: false,
  };
}