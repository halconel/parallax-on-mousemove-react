import React, { useCallback, useLayoutEffect, useRef } from "react";
import Layer from './Layer'
import getParallaxFuction, { ILayerSetup } from './parallax'
import '../../styles/Wrapper.scss'

export interface IWrapperProps {
  layers: ILayerSetup[]
}

const Wrapper = (props: IWrapperProps) => {
  const { layers } = props

  const node = useRef<HTMLDivElement>(null)
  const parallax = useCallback(getParallaxFuction, [])

  useLayoutEffect(() => {
    if (node.current) {
      node.current.addEventListener('mousemove', parallax(node.current, layers))
      return node.current.removeEventListener('mousemove', parallax(node.current, layers))
    }
  }, [layers, parallax])

  return (
    <div className="parallax" ref={node}>
      {layers.map((layer, index) => 
        <Layer node={layer.node} key={index} index={index} name={layer.name} />)}
    </div>
  )
}

export default Wrapper