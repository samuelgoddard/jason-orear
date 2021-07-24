export const fade = {
	initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    opacity: 0,
		transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
	}
}

export const reveal = {
	initial: { y: '100%' },
  enter: { 
    y: 0,
    transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    y: '100%',
		transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
	}
}

export const revealIn = {
	initial: { y: '100%' },
  enter: { 
    y: 0,
    transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    y: '100%',
		transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
	}
}

export const revealHori = {
	initial: { x: '100%' },
  enter: { 
    x: 0,
    transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    x: '100%',
		transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
	}
}

export const growHeight = {
	initial: { height: 0 },
  enter: { 
    height: '100%',
    transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    height: 0,
		transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
	}
}

export const slightScale = {
	initial: { scale: 1.125 },
  enter: { 
    scale: 1,
    transition: { duration: 1.25, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    scale: 1.2,
		transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] }
	}
}