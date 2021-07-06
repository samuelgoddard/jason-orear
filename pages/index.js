import { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import homeImage from '@/public/images/007.jpg'
import homeImage2 from '@/public/images/home2.jpg'
import homeImage3 from '@/public/images/home3.jpg'
import homeImage4 from '@/public/images/home4.jpg'
import homeImage5 from '@/public/images/home5.jpg'

export default function Home() {
  const [currentProject, setCurrentProject] = useState(1);

  let imageUrl = homeImage
  let coords = `37°46'09.3"N 122°23'20.5"`
  let number = `16`
  let name = `Jason O'Rear`

  if (currentProject == 2) {
    imageUrl = homeImage2
    coords = `22°35'12.5"N 102°81'98.3"`
    number = `8`
    name = `Mira`
  } else if (currentProject == 3) {
    imageUrl = homeImage3
    coords = `88°12'36.2"N 821°90'23.6"`
    number = `14`
    name = `Nvidia`
  } else if (currentProject == 4) {
    imageUrl = homeImage4
    coords = `66°23'81.8"N 10°92'66.1"`
    number = `10`
    name = `Google`
  } else if (currentProject == 5) {
    imageUrl = homeImage5
    coords = `48°23'17.1"N 12°72'87.0"`
    number = `12`
    name = `Another Project`
  }


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
                <div className="absolute inset-0 flex flex-wrap z-[6]">
                  
                  <Link href="/work">
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(1)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href="/work">
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(2)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href="/work">
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(3)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href="/work">
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(4)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href="/work">
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(5)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                </div>
                
                <Image
                  src={imageUrl}
                  alt="Placeholder"
                  layout="fill"
                  className="w-full h-full object-cover object-center [z-2]"
                  placeholder="blur"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-end relative">
              <span className="w-full md:w-auto text-[18px] md:text-[22px] tracking-tight transition-all ease-in-out duration-300 leading-none md:fixed bottom-0 left-0 mb-1 md:m-[20px]">{coords}</span>

              <span className="w-full md:w-auto text-[18px] md:text-[22px] tracking-tight ml-auto leading-none uppercase md:fixed md:ml-[45vw] xl:ml-[60vw]">{name}</span>

              <span className="text-[60px] md:text-[180px] xl:text-[230px] leading-none mb-[9px] md:mb-[-20px] mr-[20px] ml-auto font-semibold tracking-tight fixed bottom-0 right-0">{number}</span>
            </div>
          </m.div>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}
