import Link from 'next/link'
import Layout from '@/components/layout'
import { fade, revealIn, revealHori, revealHoriMore, growHeight } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import { useContext, useEffect } from 'react'
import { Context } from '../context/state'
import Div100vh from 'react-div-100vh'

const query = `*[_type == "contact"][0]{
  email
}`

const pageService = new SanityPageService(query)

export default function Wayfinder(initialData) {
  const { data: { email }  } = pageService.getPreviewHook(initialData)()

  const [introContext, setIntroContext] = useContext(Context);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  let bodyColors = [
    // {
    //   background: "bg-red",
    //   text: "hover:text-burnt-red"
    // },
    // {
    //   background: "bg-purple",
    //   text: "hover:text-burnt-purple"
    // },
    // {
    //   background: "bg-green",
    //   text: "hover:text-burnt-green"
    // },
    // {
    //   background: "bg-teal",
    //   text: "hover:text-burnt-teal"
    // },
    // {
    //   background: "bg-blue",
    //   text: "hover:text-burnt-blue"
    // },
    {
      background: "bg-yellow",
      text: "hover:text-burnt-yellow"
    }
  ];

  let bodyColor = bodyColors[0];

  return (
    <Layout>
      <NextSeo title="Wayfinder" />
      
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <Div100vh className="flex flex-row w-full justify-center">
            {/* <m.div variants={fade} className={`absolute inset-0 z-0 ${bodyColor.background}`}></m.div> */}

            <m.nav
              initial="initial"
              animate="enter"
              exit="exit"
              className=""
              variants={{
                enter: { transition: { staggerChildren: 0.015 } }
              }}
             className="w-full"
            >
              <ul className={`flex flex-wrap mx-auto text-black relative z-10 h-full w-full ${bodyColor.text}`}>
                <li className="w-1/3 flex justify-center relative overflow-hidden">
                  <Link href="/info">
                    <a className="w-full flex justify-start items-center text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-[0.835] group hover:text-black wayfinder-text p-[14px] md:p-[22px] pt-[22px] md:pt-[22px]">
                      <div>
                        <div className="overflow-hidden relative">
                          <m.div variants={revealHoriMore}>
                            <span className="block mr-[1.5vw]">Info</span>
                          </m.div>
                        </div>
                        <m.span variants={fade} className="hidden md:block text-base xl:text-xl leading-none font-mono font-normal md:mr-[-0.5%] mt-0 text-black">
                          <span className="opacity-0 group-hover:opacity-100 group-hover:mt-[2.5%]">Biography</span>
                        </m.span>
                      </div>
                    </a>
                  </Link>
                  <m.div variants={revealIn} className="border-r border-white border-opacity-40 w-[1px] my-[14px] md:my-[22px] h-[[100%-14px]] md:h-[[100%-22px]] origin-bottom"></m.div>
                </li>
                <li className="w-1/3 flex justify-center relative overflow-hidden">
                  <Link href="/works">
                    <a className="w-full flex justify-start items-center text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-[0.835] group hover:text-black mb-1 md:mb-2 wayfinder-text p-[14px] md:p-[22px] pt-[22px] md:pt-[22px]">
                      <div>
                        <div className="overflow-hidden relative">
                          <m.div variants={revealHoriMore}>
                            <span className="block mr-[1.5vw]">Works</span>
                          </m.div>
                        </div>
                        <m.span variants={fade} className="hidden md:block text-base xl:text-xl leading-none font-mono font-normal md:mr-[-0.5%] mt-0 text-black">
                          <span className="opacity-0 group-hover:opacity-100 group-hover:mt-[2.5%]">Selected projects</span>
                        </m.span>
                      </div>
                    </a>
                  </Link>
                  <m.div variants={revealIn} className="border-r border-white border-opacity-40 w-[1px] my-[14px] md:my-[22px] h-[[100%-14px]] md:h-[[100%-22px]] origin-bottom"></m.div>
                </li>
                <li className="w-1/3 flex justify-center">
                  <a href={`mailto:${email}`} className="w-full flex justify-start items-center text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-[0.835] group hover:text-black wayfinder-text p-[14px] md:p-[22px] pt-[22px] md:pt-[22px]">
                    <div>
                      <div className="overflow-hidden relative">
                        <m.div variants={revealHoriMore}>
                          <span className="block mr-[1.5vw]">Email</span>
                        </m.div>
                      </div>
                      <m.span variants={fade} className="hidden md:block text-base xl:text-xl leading-none font-mono font-normal md:mr-[-0.5%] mt-0 text-black">
                        <span className="opacity-0 group-hover:opacity-100 group-hover:mt-[2.5%]">Reach Out</span>
                      </m.span>
                    </div>
                  </a>
                </li>
              </ul>
            </m.nav>
          </Div100vh>
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