import React, { useCallback, useLayoutEffect, useRef } from "react";
import Layer, { LayerPropsInterface } from './Layer'
import getParallaxFuction from './parallax'
import '../../styles/Wrapper.scss'

export interface LayersArray {
  layers: LayerPropsInterface[]
}

const Wrapper = (props: LayersArray) => {
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
      {layers.map((layer, index) => <Layer node={layer.node} key={index} index={index}/>)}
    </div>
  )
}

export default Wrapper