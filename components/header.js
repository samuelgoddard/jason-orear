import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link'
import { useContext } from 'react';
import { Context } from '../context/state'

export default function Header({route}) {
  const [introContext, setIntroContext] = useContext(Context);

  const reveal = {
    initial: { y: '-100%' },
    enter: { 
      y: 0,
      transition: { delay: route == '/' ? 4.2 : 0, duration: 1.25, ease: [0.83, 0, 0.17, 1] }
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
      transition: { delay: route == '/' ? 4.2 : 0, duration: 1.25, ease: [0.83, 0, 0.17, 1] }
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
      transition: { delay: route == '/' ? 4.2 : 0, duration: 1, ease: [0.83, 0, 0.17, 1] }
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
            <a className={`fixed top-0 left-0 m-[14px] md:m-[20px] block w-[38px] md:w-[48px] hover:-rotate-45 transition ease-in-out duration-300 z-40 overflow-hidden ${route == '/wayfinder' || route == '/info' ? '' : 'hover:text-pink'}`}>
              <m.div variants={reveal}>
                <svg className="block w-full" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32zm5.441-31.321v11.953H26.105V31.818L32 18.526h5.895L32.453 32.68h4.988z" fill="currentColor"/><path d="M60.633 0a3.368 3.368 0 110 6.737 3.368 3.368 0 010-6.737zm0 .674a2.695 2.695 0 100 5.39 2.695 2.695 0 000-5.39zm.168 1.01a1.179 1.179 0 01.613 2.186l.859 1.183h-.833l-.734-1.01h-.747v1.01h-.673V1.684H60.8zm0 .674h-.842v1.01h.842a.505.505 0 00.503-.456l.003-.049a.506.506 0 00-.506-.505z" fill="currentColor"/></svg>
              </m.div>
            </a>
          </Link>
          
          <div className={`fixed top-0 left-0 right-0 w-full z-30 flex flex-wrap justify-center mt-5 transition ease-in-out duration-500 pointer-events-none ${route.includes('works') ? 'opacity-0' : 'opacity-100 delay-700'}`}>
            <svg className="w-[105px] md:w-36 xl:w-40 h-[30px]" viewBox="0 0 163 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M99.182 0v1.923h.892L99.101 4.2h1.055l1.054-2.138V0h-2.028zM0 15.475C0 18.987 1.954 21 5.346 21c3.369 0 5.323-2.08 5.323-5.592V4.49h-2.56v10.894c0 2.617-1.258 3.535-2.763 3.535-1.685 0-2.875-1.186-2.875-3.445H0zM20.118 4.49l-6.042 16.22h2.606l1.258-3.558h7.075l1.28 3.557h2.785L22.948 4.491h-2.83zm-1.415 10.515l2.74-7.74 2.786 7.74h-5.526zM35.93 13.193l2 .402c1.751.358 3.368 1.03 3.368 2.707 0 1.566-1.482 2.573-3.593 2.573-2.291 0-3.796-1.141-4.268-3.356h-2.516c.382 3.4 2.92 5.481 6.694 5.481 3.167 0 6.266-1.678 6.266-4.9 0-3.265-2.852-4.25-5.458-4.786l-1.931-.403c-1.393-.29-2.471-.984-2.471-2.326 0-1.7 2.044-2.26 3.234-2.26 1.55 0 3.325.582 3.841 2.506h2.47C42.939 5.565 40.356 4.2 37.369 4.2c-2.74 0-5.953 1.432-5.953 4.496 0 2.73 2.202 4.027 4.515 4.497zM54.629 21c4.717 0 7.681-3.467 7.681-8.411 0-4.944-2.965-8.389-7.681-8.389-4.74 0-7.704 3.445-7.704 8.389 0 4.944 2.964 8.411 7.704 8.411zm0-2.125c-2.853 0-5.076-2.215-5.076-6.286 0-4.072 2.223-6.264 5.076-6.264 2.83 0 5.053 2.192 5.053 6.264 0 4.071-2.223 6.286-5.053 6.286zM76.017 20.71h3.572V4.49h-2.516v13.4l-7.188-13.4h-3.57v16.22h2.515V7.286l7.187 13.422zM91.29 21c4.717 0 7.682-3.467 7.682-8.411 0-4.944-2.965-8.389-7.682-8.389-4.739 0-7.704 3.445-7.704 8.389 0 4.944 2.965 8.411 7.704 8.411zm0-2.125c-2.852 0-5.076-2.215-5.076-6.286 0-4.072 2.224-6.264 5.076-6.264 2.83 0 5.054 2.192 5.054 6.264 0 4.071-2.224 6.286-5.054 6.286zM109.4 13.864l3.481 6.845h2.875l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594zM119.343 4.49v16.22h11.276v-2.17h-8.715v-5.101h8.221V11.29h-8.221v-4.63h8.715V4.49h-11.276zM139.012 4.49l-6.042 16.22h2.605l1.258-3.558h7.075l1.28 3.557h2.786l-6.132-16.218h-2.83zm-1.415 10.515l2.74-7.74 2.785 7.74h-5.525zM156.644 13.864l3.481 6.845H163l-3.751-7.27c2.022-.627 3.145-1.946 3.145-4.273 0-3.758-2.628-4.675-7.008-4.675h-5.166v16.218h2.56v-6.823h2.808c.359 0 .719 0 1.056-.022zm-3.864-7.27h2.898c2.313 0 4.088.29 4.088 2.617 0 2.237-1.64 2.595-4.043 2.595h-2.943V6.594z" fill="currentColor"/></svg>
          </div>

          <Link href="/wayfinder">
            <a className="fixed top-0 right-0 m-[14px] md:m-[20px] ml-auto hover:outline-none focus:outline-none block w-[40px] md:w-[64px] group py-3 z-40 group">
              <m.span variants={navFull} className={`origin-top-left transition ease-in-out duration-300 block w-full h-[3px] md:h-1 bg-black mb-2 md:mb-3 group-hover:scale-x-75 ${route == '/wayfinder' || route == '/info' ? '' : 'group-hover:bg-pink'}`}></m.span>

              <m.span variants={nav} className={`origin-top-left transition ease-in-out duration-300 block h-[3px] md:h-1 bg-black group-hover:scale-x-50 ${route == '/wayfinder' || route == '/info' ? '' : 'group-hover:bg-pink'}`}></m.span>
            </a>
          </Link>
        </m.header>
      </LazyMotion>
  )
}