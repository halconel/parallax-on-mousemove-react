import React from "react";
import Layer from './Layer'
import { ILayerSetup } from './parallax'
import '../../styles/Wrapper.scss'
import { useInitGyroscope, useOrientation, useParallax } from "./hooks";

export interface IWrapperProps {
  layers: ILayerSetup[]
}

const Wrapper = (props: IWrapperProps) => {
  const { layers } = props
  // Portrait and landscape orientation
  const orientation = useOrientation()
  // Check for gyroscope and init gyroscope state
  const gyro = useInitGyroscope()
  // Add parallax function on mouse & device events
  const ref = useParallax(layers, orientation, gyro)

  return (
    <div className="parallax" ref={ref}>
      {layers.map((layer, index) =>
        <Layer node={layer.node} key={index} index={index} name={layer.name} />)}
    </div>
  )
}

export default Wrapper