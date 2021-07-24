import { m } from "framer-motion"

export const reveal = {
	initial: { y: '100%' },
  enter: { 
    y: 0,
    transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    y: '100%',
		transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] }
	}
}

export default function SplitText({ copy, role }) {
  return (
    <m.div
      initial="initial"
      animate="enter"
      exit="exit"
      className=""
      variants={{
        enter: { transition: { delayChildren: 0.25 } }
      }}
    >
      <span aria-label={copy} role={role} className="block mb-6 leading-[1.1]">
        {copy.split(" ").map(function(char, index){
          return (
            <span className="inline-block overflow-hidden" key={index}>
              <m.span className="inline-block" variants={reveal} aria-hidden="true">
                {char}&nbsp;
              </m.span>
            </span>
          )
        })}
      </span>
    </m.div>
  );
}