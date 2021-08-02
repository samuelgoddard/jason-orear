import { revealHoriReverse } from '@/helpers/transitions';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link'
import { useContext } from 'react';
import { Context } from '../context/state'

export default function Header({route}) {
  const [introContext, setIntroContext] = useContext(Context);

  const reveal = {
    initial: { y: '-100%' },
    enter: { 
      y: 0,
      transition: { delay: route == '/' ? 3 : 0, duration: 1.25, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '100%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const nav = {
    initial: { width: '0' },
    enter: { 
      width: '66%',
      transition: { delay: route == '/' ? 3.2 : 0, duration: 1.25, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '66%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const navFull = {
    initial: { width: '0' },
    enter: { 
      width: '100%',
      transition: { delay: route == '/' ? 3.2 : 0, duration: 1, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '66%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }
  
  return (
      <LazyMotion features={domAnimation}>
        <m.header
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <Link href="/">
            <a className={`fixed top-0 left-0 m-[20px] md:m-[20px] block w-[65px] md:w-[90px] transition-colors ease-in-out duration-300 z-40 overflow-hidden hover:text-burnt-yellow ${route == '/wayfinder' ? '' : ''}`}>
              <m.div variants={revealHoriReverse}>
                <svg className="block w-full" viewBox="0 0 90 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.402 13.34l-.1 1.62c.82.14 1.54.16 2.34.16 2.74 0 4.66-1.28 4.66-4.18V1h-6.26v1.62h4.44V11c0 1.9-1.08 2.52-3 2.52-.82 0-1.4-.04-2.08-.18zM17.114 3.68l2.14 6.14h-4.28l2.14-6.14zM11.334 15h1.82l1.24-3.56h5.44l1.24 3.56h1.84l-4.98-14h-1.62l-4.98 14zM30.166 15.16c2.96 0 4.96-1.56 4.96-3.94 0-5.6-7.8-3.52-7.8-6.72 0-1.26 1.06-2.04 2.78-2.04 1.68 0 2.9.96 3.16 2.48l1.66-.64c-.36-2.04-2.28-3.46-4.82-3.46-2.7 0-4.64 1.48-4.64 3.66 0 4.96 7.78 3 7.78 6.74 0 1.4-1.24 2.3-3.06 2.3-1.78 0-3.28-1.28-3.52-3.24l-1.76.56c.46 2.56 2.6 4.3 5.26 4.3zM43.098 15.16c3.4 0 5.56-2.76 5.56-7.16S46.498.84 43.098.84c-3.4 0-5.56 2.76-5.56 7.16s2.16 7.16 5.56 7.16zM39.418 8c0-3.38 1.32-5.54 3.68-5.54 2.36 0 3.68 2.16 3.68 5.54s-1.32 5.52-3.68 5.52c-2.36 0-3.68-2.14-3.68-5.52zM51.17 15h1.76V4l6.12 11h1.96V1h-1.78v11l-6.1-11h-1.96v14zM7.162 23.72L1.842 38H.122l5.32-14.28h1.72zM27.355 38.16c3.4 0 5.56-2.76 5.56-7.16s-2.16-7.16-5.56-7.16c-3.4 0-5.56 2.76-5.56 7.16s2.16 7.16 5.56 7.16zM23.675 31c0-3.38 1.32-5.54 3.68-5.54 2.36 0 3.68 2.16 3.68 5.54s-1.32 5.52-3.68 5.52c-2.36 0-3.68-2.14-3.68-5.52zM37.607 23.94a20.4 20.4 0 01-.76 2.34 38.22 38.22 0 01-.96 2.34h-1.3c.134-.507.26-1.047.38-1.62.134-.587.254-1.16.36-1.72.107-.573.194-1.093.26-1.56h1.88l.14.22zM40.184 38h1.84v-6.24h2.86l3.56 6.24h2.08l-3.8-6.52c1.54-.56 2.5-1.88 2.5-3.6 0-2.34-1.68-3.88-4.2-3.88h-4.84v14zm1.82-7.88v-4.5h2.82c1.6 0 2.56.84 2.56 2.26s-.96 2.24-2.56 2.24h-2.82zM53.476 38h9.42v-1.64h-7.6v-4.98h6.08v-1.64h-6.08v-4.12h7.38V24h-9.2v14zM70.828 26.68l2.14 6.14h-4.28l2.14-6.14zM65.048 38h1.82l1.24-3.56h5.44l1.24 3.56h1.84l-4.98-14h-1.62l-4.98 14zM79.16 38H81v-6.24h2.86L87.42 38h2.08l-3.8-6.52c1.54-.56 2.5-1.88 2.5-3.6 0-2.34-1.68-3.88-4.2-3.88h-4.84v14zm1.82-7.88v-4.5h2.82c1.6 0 2.56.84 2.56 2.26s-.96 2.24-2.56 2.24h-2.82z" fill="currentColor"/></svg>
              </m.div>
            </a>
          </Link>
          
          <div className={`fixed top-0 left-0 right-0 w-full z-30 flex flex-wrap justify-center mt-[25px] md:mt-[17px] transition ease-in-out duration-500 pointer-events-none font-mono md:text-[20px] leading-none ${route.includes('works') ? 'opacity-0' : 'opacity-100 delay-700'}`}>
            +
          </div>

          <Link href="/wayfinder">
            <a className="fixed top-0 right-0 mx-[15px] my-[12px] md:mx-[25px] md:my-[15px] ml-auto hover:outline-none focus:outline-none block w-[40px] md:w-[64px] group py-3 z-40 group">
              <m.span variants={navFull} className={`origin-top-left transition ease-in-out duration-300 block w-full h-[3px] md:h-1 bg-black mb-2 md:mb-3 group-hover:scale-x-75 group-hover:bg-burnt-yellow ${route == '/wayfinder' ? '' : ''}`}></m.span>

              <m.span variants={nav} className={`origin-top-left transition ease-in-out duration-300 block h-[3px] md:h-1 bg-black group-hover:scale-x-50 group-hover:bg-burnt-yellow ${route == '/wayfinder' ? '' : ''}`}></m.span>
            </a>
          </Link>
        </m.header>
      </LazyMotion>
  )
}