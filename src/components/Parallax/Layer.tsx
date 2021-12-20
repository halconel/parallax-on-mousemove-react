import React, { RefObject } from "react";
import ProgressiveImage from "../ProgressiveImage";

export interface ILayerProps {
  index: number,
  node: RefObject<HTMLDivElement>,
  name: string,
}

const Layer = (props: ILayerProps) => {
  const { node, index, name } = props
  return (
    <div ref={node} className={`parallax-layer parallax-layer__${index}`}>
      <ProgressiveImage index={index} name={name}/>
    </div>
  )
}

export default Layer