import { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/layout'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import SanityPageService from '@/services/sanityPageService'

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

  let imageUrl = home.featuredWork[0].homeCarouselImage.asset.url
  let imageLqipUrl = home.featuredWork[0].homeCarouselImage.asset.metadata.lqip
  let coords = home.featuredWork[0].gps
  let number = home.featuredWork[0].indexNumber
  let name = home.featuredWork[0].title

  if (currentProject == 2) {
    imageUrl = home.featuredWork[1].homeCarouselImage.asset.url
    imageLqipUrl = home.featuredWork[1].homeCarouselImage.asset.metadata.lqip
    coords = home.featuredWork[1].gps
    number = home.featuredWork[1].indexNumber
    name = home.featuredWork[1].title
  } else if (currentProject == 3) {
    imageUrl = home.featuredWork[2].homeCarouselImage.asset.url
    imageLqipUrl = home.featuredWork[2].homeCarouselImage.asset.metadata.lqip
    coords = home.featuredWork[2].gps
    number = home.featuredWork[2].indexNumber
    name = home.featuredWork[2].title
  } else if (currentProject == 4) {
    imageUrl = home.featuredWork[3].homeCarouselImage.asset.url
    imageLqipUrl = home.featuredWork[3].homeCarouselImage.asset.metadata.lqip
    coords = home.featuredWork[3].gps
    number = home.featuredWork[3].indexNumber
    name = home.featuredWork[3].title
  } else if (currentProject == 5) {
    imageUrl = home.featuredWork[4].homeCarouselImage.asset.url
    imageLqipUrl = home.featuredWork[4].homeCarouselImage.asset.metadata.lqip
    coords = home.featuredWork[4].gps
    number = home.featuredWork[4].indexNumber
    name = home.featuredWork[4].title
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
          <m.div variants={fade} className="min-h-screen flex flex-col p-[20px]">

          {/* {home.featuredWork.map((e, i) => {
            e.imageSlides.map(e, i) => {
              return (

              )
            })
            })} */}

            <div className="text-white my-auto">
              <div className="w-full h-[60vh] md:h-[60vh] xl:h-[65vh] relative mt-[-2vw]">
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
                  src={imageUrl}
                  alt="Placeholder"
                  layout="fill"
                  className="w-full h-full object-cover object-center [z-2]"
                  placeholder="blur"
                  blurDataURL={imageLqipUrl}
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

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}