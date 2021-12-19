import { LayerPropsInterface } from "./Layer"

export interface LayerProperties {
  deep?: string,     // number: -5000...5000
  origin?: string,   // number: 0...width
  factorX?: string,  // float: 0...5, perspective coefficient
  factorY?: string,  // float: 0...5, perspective coefficient
  disallow?: string, // string: 'x' || 'y' || 'both'
}

// Return a callback function for `mousemove` event, 
// which changes the transform attribute in the layer style
const getParallaxFuction = (wrapper: HTMLDivElement, layers: LayerPropsInterface[]) => {
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
