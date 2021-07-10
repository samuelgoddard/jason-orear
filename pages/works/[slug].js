import React from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Image from 'next/image'
import workImage from '@/public/images/work-slug.webp'
import work2 from '@/public/images/work-2.webp'
import work3 from '@/public/images/work-3.webp'
import work4 from '@/public/images/work-4.webp'
import ReactFullpage from '@fullpage/react-fullpage';
import SanityPageService from '@/services/sanityPageService'

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
  slug {
    current
  }
}`

const pageService = new SanityPageService(query)

export default function WorksSlug(initialData) {
  const { data: { title, seo, slug, indexNumber, client, location, gps, year, imageSlides }  } = pageService.getPreviewHook(initialData)()
  return (
    <Layout>
      <Head>
        <title>Nextjs boilerplate - Work</title>
      </Head>
      
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
          id="inner-container"
          data-scroll-section
        >
          <m.div variants={fade} className="min-h-screen flex flex-col p-[20px]">
            <ReactFullpage
              navigation={false}
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
                    <div className="section">



                    {imageSlides.map((f, i) => {
                      
                      let layoutOuterWrapper = 'w-10/12 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]';

                      let layoutWrapper = 'flex items-center h-full';
                      
                      if (f.layout == 'full-portrait') {
                        layoutWrapper = 'w-7/12 md:w-6/12 xl:w-5/12 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]';
                        layoutOuterWrapper = 'my-auto flex items-center max-w-screen-2xl mx-auto';
                      } else if (f.layout == 'full-landscape') {
                        layoutWrapper = 'w-10/12 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]';
                        layoutOuterWrapper = 'flex items-center h-full';
                      } else if (f.layout == 'two-portrait') {
                        layoutWrapper = 'w-1/2 h-[55vh] md:h-[72vh] relative mx-auto will-change mt-[-6vh]';
                        layoutOuterWrapper = 'my-auto flex w-8/12 mx-auto space-x-[5vw] max-w-screen-xl';
                      }
                      
                      return (
                        <div className="slide will-change flex items-center" id={i} key={i}>
                          <div className={layoutOuterWrapper}>
                            { f.images.map((g, i) => {
                              return (
                                <div className={layoutWrapper} key={i}>
                                  <Image
                                    src={g.asset.url}
                                    alt="Placeholder"
                                    layout="fill"
                                    className="w-full h-full object-cover object-center will-change"
                                  />
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
                        <div className="font-mono text-[13px] uppercase absolute top-0 left-0 mt-20">
                          <div className="w-full mb-3">
                            <span className="block mb-px md:mb-0">(Client)</span>
                            <span className="block md:ml-3">“Gensler Architects”</span>
                          </div>
                          <div className="w-full mb-3">
                            <span className="block mb-px md:mb-0">(Location)</span>
                            <span className="block md:ml-3">“San Francisco”</span>
                          </div>
                          <div className="w-full mb-3">
                            <span className="block mb-px md:mb-0">(GPS)</span>
                            <span className="block md:ml-3">“37°46'09.3"N 122°23'20.5"W”</span>
                          </div>
                          <div className="w-full mb-3">
                            <span className="block mb-px md:mb-0">(Year)</span>
                            <span className="block md:ml-3">“2021”</span>
                          </div>
                        </div>

                        <div className="my-auto flex w-8/12 mx-auto space-x-[5vw] max-w-screen-xl items-center justify-center">
                          <Link href="/work">
                            <a className="will-change mt-[-6vh] block">
                              <span className="block uppercase font-semibold text-[17px] md:text-[20px] leading-none">Next Project</span>
                              <span className="block text-[22vw] 2xl:text-[340px] uppercase font-semibold leading-none ml-[-1vw] 2xl:ml-[-18px] -mt-px md:-mt-1 2xl:-mt-3">{title}</span>
                            </a>
                          </Link>
                        </div>

                        <div className="w-[30vw] xl:w-[25vw] h-[25vh] md:h-[24vh] mx-auto will-change absolute bottom-0 right-0 mb-[48px]">
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
                  </ReactFullpage.Wrapper>
                );
              }}
            />

            <div data-scroll data-scroll-sticky data-scroll-target="#inner-container" className="fixed md:absolute bottom-0 left-0 z-40 m-[18px] w-auto text-center">
              <Link href="/works">
                <a className="text-center uppercase text-[15px] md:text-[19px] xl:text-[22px] w-auto relative inline-block group">
                  <span className="hidden md:inline-block">Back To</span><span className="inline-block md:hidden">all</span> Works
                  <span className="block transition-all ease-in-out duration-500 w-full scale-x-0 group-hover:scale-x-100 h-[2px] bg-black"></span>
                </a>
              </Link>
            </div>

            <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute bottom-0 left-0 right-0 z-30 mb-[-7px] w-auto text-center mx-auto">
              <h1 className="text-center uppercase text-[35px] md:text-[45px] xl:text-[60px] leading-none w-auto relative inline-block group">
                {title}
              </h1>
            </div>

            <div data-scroll data-scroll-sticky data-scroll-target="#scroll-container" className="fixed md:absolute bottom-0 right-0 z-40 m-[18px] w-auto text-center">
              <span className="text-center uppercase text-[15px] md:text-[19px] xl:text-[22px] w-auto relative inline-block group">
                1/7
              </span>
            </div>
          </m.div>
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