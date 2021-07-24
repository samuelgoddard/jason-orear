import { useContext, useEffect, useRef } from 'react'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import SanityPageService from '@/services/sanityPageService'
import BlockContent from '@sanity/block-content-to-react'
import { Context } from '../context/state'

const query = `*[_type == "info"][0]{
  seo {
    ...,
    shareGraphic {
      asset->
    }
  },
  title,
  biographyText,
  clients,
  biographyImage {
    asset -> {
      ...
    }
  }
}`

const pageService = new SanityPageService(query)

export default function Info(initialData) {
  const { data: { title, seo, biographyText, clients, biographyImage }  } = pageService.getPreviewHook(initialData)()
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
            >
              <m.div variants={fade} className={`text-black min-h-screen flex flex-col p-[20px] pt-28 md:pt-32 justify-end bg-pink selection:bg-black selection:text-pink`}>
                <div className="flex flex-wrap h-full lg:-mx-5">
                  <div className="w-full lg:w-2/3 lg:px-5 relative mb-12 lg:mb-0">
                    <div className="flex flex-wrap">
                      <div className="order-2 md:order-1">
                        <span className="font-mono uppercase tracking-wider text-[11px] md:text-[13px] block mb-[3vh]">(Clients)</span>

                        <div className="text-cols mb-[3vh] font-mono uppercase tracking-wider text-[11px] md:text-[13px]">

                          <BlockContent serializers={{ container: ({ children }) => children }} blocks={clients} />


                          {/* <ul className="w-auto px-3 lg:px-8 font-mono uppercase tracking-wider text-[11px] md:text-[13px]">
                            <li>Adamson Associate</li>
                            <li>Architect Magazine</li>
                            <li>Architectural Record</li>
                            <li>Arktura</li>
                            <li>ARUP</li>
                            <li>Civil Engineering Magazine</li>
                            <li>Fergus Garber Young Architects</li>
                            <li>Gensler</li>
                            <li>Godfrey Dadich</li>
                            <li>GOOGLE</li>
                            <li>Hiram banks Lighting</li>
                            <li>Heller Manus Architects</li>
                            <li>HOK</li>
                            <li>Heyhush</li>
                            <li>Interior Design Magazine</li>
                          </ul>

                          <ul className="w-auto px-3 lg:px-8 font-mono uppercase tracking-wider text-[11px] md:text-[13px]">
                            <li>Jay Paul Company</li>
                            <li>Kendall/Heaton Architects</li>
                            <li>Kuth Ranieri Architects</li>
                            <li>Level 10</li>
                            <li>Luma</li>
                            <li>Magnusson Klemencic Associates</li>
                            <li>Metropolis</li>
                            <li>Morrison Hershielfd</li>
                            <li>Obermoser Architects</li>
                            <li>Owens Corning</li>
                            <li>Pelli Clarke</li>
                            <li>Pelli Architects</li>
                            <li>SOSSEGO</li>
                            <li>Symantec</li>
                            <li>Turner</li>
                            <li>VISA</li>
                          </ul> */}
                        </div>
                      </div>

                      <div className={`w-full h-[65vh] md:h-[50vh] bg-red-500 mt-auto order-1 md:order-2 relative bg-pink`}>
                        <div className="">
                          <Image
                            src={biographyImage.asset.url}
                            alt="Jason O'Rear Biography Image"
                            layout="fill"
                            className={`w-full h-full object-cover object-center mix-blend-multiply will-change bg-pink`}
                            placeholder="blur"
                            blurDataURL={biographyImage.asset.metadata.lqip}
                          />
                        </div>

                        <h1 className="block text-upright uppercase font-semibold text-[32vw] md:text-[20vh] lg:text-[24vh] xl:text-[27vh] 2xl:text-[38vh] leading-none absolute bottom-0 right-0 z-30 mb-[-10vw] md:mb-0 2xl:mr-[-7vw] text-[#101010]">Info</h1>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3 lg:px-5 text-[16px] lg:text-[18px] xl:text-[20px] leading-tight flex items-center mb-12 lg:mb-0">
                    <div className="w-full content max-w-md mx-auto">
                      <BlockContent serializers={{ container: ({ children }) => children }} blocks={biographyText} />
                    </div>
                  </div>
                </div>
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