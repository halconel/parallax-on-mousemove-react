import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Layer from './Layer'
import { getParallaxFuctionForDeviceEvent, getParallaxFuctionForMouseEvent, ILayerSetup } from './parallax'
import '../../styles/Wrapper.scss'

export interface IWrapperProps {
  layers: ILayerSetup[]
}

const Wrapper = (props: IWrapperProps) => {
  const { layers } = props

  const [orientation, setOrientation] = useState(0)
  const node = useRef<HTMLDivElement>(null)
  const parallaxOnMouse = useCallback(getParallaxFuctionForMouseEvent, [])
  const parallaxOnDevice = useCallback(getParallaxFuctionForDeviceEvent, [])

  useLayoutEffect(() => {
    const onOrientationChange = () => {
      if(orientation !== window.orientation) {
        setOrientation(window.orientation)
      }
    }
    window.addEventListener('orientationchange', onOrientationChange);
  }, [orientation])

  useLayoutEffect(() => {
    if (node.current) {
      node.current.addEventListener('mousemove', parallaxOnMouse(node.current, layers))
      return node.current.removeEventListener('mousemove', parallaxOnMouse(node.current, layers))
    }
  }, [layers, parallaxOnMouse])

  useLayoutEffect(() => {
    if (node.current) {
      window.addEventListener('deviceorientation', parallaxOnDevice(layers, orientation))
      return window.removeEventListener('deviceorientation', parallaxOnDevice(layers, orientation))
    }
  }, [layers, parallaxOnDevice, orientation])

  return (
    <div className="parallax" ref={node}>
      {layers.map((layer, index) => 
        <Layer node={layer.node} key={index} index={index} name={layer.name}/>)}
    </div>
  )
}

export default Wrapper