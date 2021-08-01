import React, { useState, useEffect, useRef } from 'react'
import { useIntersection } from 'use-intersection'
import cx from 'classnames'

import { buildSrcSet, buildSrc } from '@/helpers/helpers'

const Photo = ({
  photo,
  width,
  height,
  srcSizes = [400, 600, 800, 1000, 1200, 1600, 1920],
  sizes = '(min-width: 940px) 50vw, 100vw',
  layout = 'intrinsic',
  quality = 60,
  forceLoad,
  onLoad,
  className,
}) => {
  if (!photo?.asset) return null

  const imageRef = useRef()
  const [isLoaded, setIsLoaded] = useState(false)
  const isIntersecting = useIntersection(imageRef, {
    once: true,
    threshold: 0.1,
  })

  // define our aspect ratio if not a background fill
  const aspect =
    typeof width === 'number' && typeof height === 'number'
      ? (height / width) * 100
      : 100 / (photo.customRatio || photo.aspectRatio)

  const aspectCustom =
    layout === 'intrinsic' ? { paddingTop: `${aspect}%` } : null

  // define our src and srcset
  const src = buildSrc(photo, {
    ...{ width },
    ...{ height },
    ...{ quality },
  })

  const srcset = buildSrcSet(photo, {
    ...{ srcSizes },
    ...{ aspect },
    ...{ quality },
  })

  // handle our image onLoad
  function handleLoad() {
    requestAnimationFrame(() => {
      setIsLoaded(true)
    })
  }

  // trigger any onLoad callbacks
  useEffect(() => {
    if (isLoaded && onLoad) onLoad()
  }, [isLoaded])

  return (
    <figure className={className ? `${className} bg-gray-100` : `bg-gray-100`}>
      <div
        className={cx('ar', {
          'has-fill': layout === 'fill' || layout === 'contain',
        })}
        style={aspectCustom}
      >
        <picture>
          <img
            ref={imageRef}
            width={width}
            height={height}
            src={forceLoad || isIntersecting ? src : null}
            srcSet={forceLoad || isIntersecting ? srcset : null}
            sizes={sizes}
            decoding="async"
            onLoad={handleLoad}
            alt={photo.alt || photo.asset?.altText}
            className={cx(getSize(layout), { 'is-loaded': isLoaded })}
          />
        </picture>
      </div>
    </figure>
  )
}

const getSize = (layout) => {
  switch (layout) {
    case 'intrinsic':
      return 'object-cover will-change'
    case 'fill':
      return 'object-cover will-change'
    case 'contain':
      return 'object-contain will-change'
  }
}

export default Photo