import React, { RefObject } from "react";

export interface LayerPropsInterface {
  index?: number,
  node: RefObject<HTMLDivElement>,
  disallow?: string,
  deep?: number,
  origin?: string,
  factorX?: number,
  factorY?: number,
}

const Layer = (props: LayerPropsInterface) => {
  const { node, index} = props
  return <div ref={node} className={`parallax-layer parallax-layer__${index}`}/>
}

export default Layer