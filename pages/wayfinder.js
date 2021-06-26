import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"

export default function Wayfinder() {
  return (
    <Layout>
      <Head>
        <title>Nextjs boilerplate - Wayfinder</title>
      </Head>
      
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <m.div variants={fade} className="min-h-screen flex flex-col p-[25px] md:p-[50px] bg-teal pt-32">

            <nav className="mt-auto">
              <ul className="flex flex-wrap max-w-screen-2xl mx-auto">
                <li className="w-1/3 border-r border-black flex justify-center items-end">
                  <Link href="/info"><a className="block text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-none hover:-translate-y-8 transition-all ease-in-out duration-500 text-outline hover:text-outline--active">Info</a></Link>
                </li>
                <li className="w-1/3 border-r border-black flex justify-center items-end">
                  <Link href="/works"><a className="block text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-none hover:-translate-y-8 transition-all ease-in-out duration-500 text-outline hover:text-outline--active">Works</a></Link>
                </li>
                <li className="w-1/3 flex justify-center items-end">
                  <Link href="/"><a className="block text-upright uppercase font-semibold text-[22vw] md:text-[20vh] leading-none hover:-translate-y-8 transition-all ease-in-out duration-500 text-outline hover:text-outline--active">Email</a></Link>
                </li>
              </ul>
            </nav>
          </m.div>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}
