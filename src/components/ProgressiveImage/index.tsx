import React, { ImgHTMLAttributes, useState } from "react";
import '../../styles/ProgressiveImage.scss'

interface IPropsMap {
  [key: string]: any;
}

const omit = (props: IPropsMap, omitKey: string): IPropsMap =>
  Object.keys(props).reduce((result: IPropsMap, key: string) => {
    if (key !== omitKey) {
      result[key] = props[key];
    }
    return result;
  }, {});

export interface IProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  overlay?: string,
  image?: string,
  name: string,
  className?: string,
  index: number,
}

const ProgressiveImage = (props: IProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const { overlay, image, name, index, ...imgProps } = props
  const className = props.className || 'progressive-image'
  const filteredProps = omit(imgProps, 'src')

  function importAll(context: __WebpackModuleApi.RequireContext) {
    return Object.fromEntries(
      context.keys().map((key: string) =>
        [key, context(key)]
      )
    )
  }

  const images = importAll(
    require.context('./images/', false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <>
      <img
        alt='high resolution'
        loading='lazy'
        className={className}
        srcSet={filteredProps.sizes || `
          ${images['./' + name + '-375.png']} 375w,
          ${images['./' + name + '-768.png']} 768w,
          ${images['./' + name + '-1020.png']} 1020w,
          ${images['./' + name + '-1440.png']} 1440w,
          ${images['./' + name + '-1920.png']} 1920w,
          ${images['./' + name + '-2304.png']} 2304w
        `}
        sizes={filteredProps.sizes || `(max-width: 375px) 375px,
          (max-width: 768px) 768px,
          (max-width: 1020px) 1020px,
          (max-width: 1440px) 1440px,
          (max-width: 1920px) 1920px,
          2304px
        `}
        onLoad={() => setLoaded(true)}
        src={image || `${name}-1020.png`}
        {...loaded && { style: { opacity: '1' } }}
        {...filteredProps}
      />
      <img
        alt='low resolution'
        className={`${className}-overlay ${className}-overlay__${index}`}
        src={overlay || `${images['./' + name + '-blured-compressed-375.png']}`}
        {...loaded && { style: { opacity: '0' } }}
        {...filteredProps}
      />
    </>
  );
}

export default ProgressiveImage
