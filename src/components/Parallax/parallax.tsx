import { RefObject } from "react"

export interface ILayerSetup {
  node: RefObject<HTMLDivElement>, // ref to the layer HTML element
  name: string,      // layer name
  deep: number,      // how far from camera: -5000...5000
  origin?: string,   // transform origin for camera rotation effect: 0...width
  factorX?: number,  // perspective factor for camera rotation effect: 0...5, 
  factorY?: number,  // 
  disallow?: string, // disallow parallay for directions: 'x' || 'y' || 'both'
}

// Return a callback function for `mousemove` event, 
// which changes the transform attribute in the layer style
const getParallaxFuction = (wrapper: HTMLDivElement, layers: ILayerSetup[]) => {
  return (event: MouseEvent) => {
    const { clientX, clientY } = event
    const x = 100 * clientX / wrapper.offsetWidth
    const y = 100 * clientY / wrapper.offsetHeight

    for (let layer of layers) {
      if (!layer.deep || !layer.node.current) return
      
      const disallow = layer.disallow
      if (disallow && disallow === 'both') return

      const element = layer.node.current
      
      const itemX = (disallow && disallow === 'x') ? 0 : x / layer.deep
      const itemY = (disallow && disallow === 'y') ? 0 : y / layer.deep
      element.style.transform = `translateX(${itemX}%) translateY(${itemY}%)`

      if (layer.origin && layer.factorX && layer.factorY) {
        element.style.transformOrigin = layer.origin
        element.style.transform += ` \
          rotateY(${5 + itemX * layer.factorX}deg) \
          rotateX(${15 - (itemY * layer.factorY)}deg) \
          rotateZ(${itemX * (-layer.factorY / 10)}deg)
        `
      }
    }
  }
}

export default getParallaxFuction
