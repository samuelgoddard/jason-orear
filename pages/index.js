import Head from 'next/head'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Image from 'next/image'
import homeImage from '@/public/images/home.jpg'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Nextjs boilerplate - Home</title>
      </Head>
      
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <m.div variants={fade} className="min-h-screen flex flex-col p-[20px]">

            <div className="text-white my-auto">
              <div className="w-full h-[50vh] relative">
                <Image
                  src={homeImage}
                  alt="Placeholder"
                  layout="fill"
                  className="w-full h-full object-cover object-center"
                  placeholder="blur"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-end relative">
              <span className="w-full md:w-auto text-[18px] md:text-[22px] tracking-tight hover:tracking-widest transition-all ease-in-out duration-300 leading-none mb-1 md:mb-0">37°46'09.3"N 122°23'20.5"</span>

              <span className="w-full md:w-auto text-[18px] md:text-[22px] tracking-tight ml-auto md:mx-auto leading-none uppercase">JasonORear</span>

              <span className="text-[60px] md:text-[180px] xl:text-[230px] leading-none mb-[9px] md:mb-[-20px] mr-[20px] ml-auto font-semibold tracking-tight fixed bottom-0 right-0">16</span>
            </div>
          </m.div>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}
