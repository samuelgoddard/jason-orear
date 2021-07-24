import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'

const query = `*[_type == "contact"][0]{
  email
}`

const pageService = new SanityPageService(query)

export default function Wayfinder(initialData) {
  const { data: { email }  } = pageService.getPreviewHook(initialData)()
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
      background: "bg-pink",
      text: "hover:text-burnt-pink"
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
          <m.div variants={fade} className={`min-h-screen flex flex-col p-[25px] md:p-[50px] pt-32 ${bodyColor.background}`}>

            <nav className="mt-auto">
              <ul className={`flex flex-wrap max-w-screen-2xl mx-auto text-black ${bodyColor.text}`}>
                <li className="w-1/3 border-r border-black flex justify-center">
                  <Link href="/info">
                    <a className="w-full flex justify-start items-center text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-none transition-all ease-in-out duration-500 group hover:text-black">
                      <div>
                        Info
                        <span className="hidden md:block text-base xl:text-xl leading-none font-mono font-normal md:mr-[-2.5%] opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-[2.5%] transition-all ease-in-out duration-500 text-black">Biography</span>
                      </div>
                    </a>
                  </Link>
                </li>
                <li className="w-1/3 border-r border-black flex justify-center">
                  <Link href="/works">
                    <a className="w-full flex justify-start items-center text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-none transition-all ease-in-out duration-500 group hover:text-black mb-1 md:mb-2">
                      <div>
                        Works
                        <span className="hidden md:block text-base xl:text-xl leading-none font-mono font-normal md:mr-[-2.5%] opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-[2.5%] transition-all ease-in-out duration-500 text-black">Selected Projects</span>
                      </div>
                    </a>
                  </Link>
                </li>
                <li className="w-1/3 flex justify-center">
                  <a href={`mailto:${email}`} className="w-full flex justify-start items-center text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-none transition-all ease-in-out duration-500 group hover:text-black">
                    <div>
                      Email
                      <span className="hidden md:block text-base xl:text-xl leading-none font-mono font-normal md:mr-[-2.5%] opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-[2.5%] transition-all ease-in-out duration-500 text-black">Reach Out</span>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </m.div>
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