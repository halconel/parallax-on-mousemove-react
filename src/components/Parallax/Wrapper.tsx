import React, { useLayoutEffect, useRef, useState } from "react";
import Layer from './Layer'
import { getParallaxFuctionForDeviceEvent, getParallaxFuctionForMouseEvent, ILayerSetup } from './parallax'
import '../../styles/Wrapper.scss'

export interface IWrapperProps {
  layers: ILayerSetup[]
}

const Wrapper = (props: IWrapperProps) => {
  const { layers } = props

  const [orientation, setOrientation] = useState<ScreenOrientation>(window.screen.orientation)
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const onOrientationChange = () => {
      if (orientation.type !== window.screen.orientation.type) {
        setOrientation(window.screen.orientation)
      }
      console.log(orientation)
    }
    window.addEventListener('orientationchange', onOrientationChange);
  }, [orientation])

  useLayoutEffect(() => {
    if (ref.current) {
      const node = ref.current
      const parallaxOnMouse = getParallaxFuctionForMouseEvent(node, layers)
      const parallaxOnDevice = getParallaxFuctionForDeviceEvent(node, layers, orientation)

      node.addEventListener('mousemove', parallaxOnMouse)
      window.addEventListener('deviceorientation', parallaxOnDevice)

      return () => {
        if (node) {
          node.removeEventListener('mousemove', parallaxOnMouse)
          window.removeEventListener('deviceorientation', parallaxOnDevice)
        }
      }
    }
  }, [layers, orientation])

  return (
    <div className="parallax" ref={ref}>
      {layers.map((layer, index) =>
        <Layer node={layer.node} key={index} index={index} name={layer.name} />)}
    </div>
  )
}

export default Wrapper