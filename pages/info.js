import Head from 'next/head'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Image from 'next/image'
import aboutImage from '@/public/images/about.webp'

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
          <m.div variants={fade} className="bg-red text-black min-h-screen flex flex-col p-[20px] pt-28 md:pt-32 justify-end">
            <div className="flex flex-wrap h-full lg:-mx-5">
              <div className="w-full lg:w-2/3 lg:px-5 relative mb-12 lg:mb-0">
                <div className="flex flex-wrap">
                  <div className="order-2 md:order-1">
                    <span className="font-mono uppercase tracking-wider text-[11px] md:text-[13px] block mb-[3vh]">(Clients)</span>

                    <div className="flex flex-wrap -mx-3 lg:-mx-8 mb-[3vh]">
                      <ul className="w-auto px-3 lg:px-8 font-mono uppercase tracking-wider text-[11px] md:text-[13px]">
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
                      </ul>
                    </div>
                  </div>

                  <div className="w-full h-[65vh] md:h-[50vh] bg-red-500 mt-auto order-1 md:order-2 relative bg-red">
                    <div className="">
                      <Image
                        src={aboutImage}
                        alt="Placeholder"
                        layout="fill"
                        className="w-full h-full object-cover object-center bg-red mix-blend-multiply"
                        placeholder="blur"
                      />
                    </div>

                    <h1 className="block text-upright uppercase font-semibold text-[32vw] md:text-[20vh] lg:text-[24vh] xl:text-[27vh] 2xl:text-[38vh] leading-none absolute bottom-0 right-0 z-30 mb-[-10vw] md:mb-0 2xl:mr-[-7vw] text-[#101010]">Info</h1>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 lg:px-5 text-[16px] lg:text-[18px] xl:text-[20px] leading-tight flex items-center mb-12 lg:mb-0">
                <div className="w-full content max-w-md mx-auto">
                  <p>Jason O’Rear is a professional photographer whose work celebrates the creativity and ingenuity of contemporary architectural design.</p>
                  
                  <p>With a background in architecture, Jason empathizes with the design process and understands the layers of work and innovative thinking required to make a project unique.</p>

                  <p>Known for his keen eye and rigor, Jason spends time with clients from the outset, absorbing their vision and using it to fuel his creativity behind the lens. Every shot is meticulously curated to tell a story of the relationship between building, nature, and human experience.</p>
                  
                  <p>Jason has been commissioned by many of the world’s highly recognized architects and his work is regularly featured in publications such as Architectural Record, Metropolis, and Interior Design, as well as independent art shows and galleries.</p>
                </div>
              </div>
            </div>
          </m.div>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}
