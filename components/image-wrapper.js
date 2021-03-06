import Img from 'next/image';
import { imageUrlBuilder, useNextSanityImage } from 'next-sanity-image';
import sanity from '../services/sanity';

const customImageBuilder = (imageUrlBuilder, options, baseWidth, baseHeight, fill, ignoreCropping, focalPoint) => {
  return ignoreCropping ? imageUrlBuilder.fit('clip') : imageUrlBuilder
    .size(baseWidth || options.originalImageDimensions.width, baseHeight || options.originalImageDimensions.height)
    .fit(focalPoint ? 'crop' : 'clip')
    .crop(focalPoint ? `focalpoint` : `center`)
    .focalPoint(focalPoint ? `${focalPoint.x}, ${focalPoint.y}` : 0,0)
    .quality(90);
};

function ImageWrapper({ image, sizes, className, alt, baseWidth, baseHeight, noPlaceholder, fill, objectFit, ignoreCropping, priority, next, lqip, focalPoint }) {
  // if (next && !(image?.asset?.metadata?.dimensions || image?.asset?._ref)) return <></>
  const imageProps =  useNextSanityImage(
    sanity.client,
    image,
    { imageBuilder: (imageUrlBuilder, options, focalPoint) => customImageBuilder(imageUrlBuilder, options, baseWidth, baseHeight, fill, ignoreCropping, focalPoint)} 
  ) 

  // console.log(focalPoint)

  let setBaseWidth = imageProps.width
  let removeWidth = false

  if (ignoreCropping) {
    setBaseWidth =  imageProps.width
  } else if (fill) {
    removeWidth = true
  } else if (baseWidth) {
    setBaseWidth = baseWidth
  }

  let setBaseHeight =  imageProps.height
  let removeHeight = false
  
  if (ignoreCropping) {
    setBaseHeight =  imageProps.height
  } else if (fill) {
    removeHeight = true
  } else if (baseHeight) {
    setBaseHeight = baseHeight
  }

  return (
    <div className={`${className} ${ noPlaceholder ? '' : ''}`}>
    {/* <div className="absolute top-0 left-0 ml-12 mt-12 z-[10000]">{JSON.stringify(focalPoint)} efwff</div> */}
      <Img
        src={imageProps.src}
        { ...( !removeWidth && { width: setBaseWidth } ) }
        { ...( !removeHeight && { height:  setBaseHeight } ) }
        className={className}
        alt={alt}
        layout={fill ? 'fill' : 'responsive'}
        objectFit={fill ? 'cover' : null}
        objectPosition={focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : `50% 50%`}
        priority={priority ? priority : false}
        { ...( lqip && { placeholder: "blur" })}
        { ...( lqip && { blurDataURL: lqip })}
      />
    </div>
  )
}

export default ImageWrapper;