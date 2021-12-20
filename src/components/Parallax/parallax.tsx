import { RefObject } from "react"
import { IGyroInitState } from "./hooks"

export interface ILayerSetup {
  node: RefObject<HTMLDivElement>,  // ref to the layer HTML element
  name: string,                     // layer name
  deep: number,                     // how far from camera: -5000...5000
  origin?: string,                  // transform origin for camera rotation effect: 0...width
  factorX?: number,                 // perspective factor for camera rotation effect: 0...5, 
  factorY?: number,                 // 
  disallow?: string,                // disallow parallay for directions: 'x' || 'y' || 'both'
}

interface IPosition {
  x: number, // X offset: 0.. 100 percent
  y: number, // Y offset: 0.. 100 percent
}

// Handle device orientation event and return offset on x & y axis in precents
function handleDeviceOrientation(event: DeviceOrientationEvent, wrapper: HTMLDivElement, orientation: ScreenOrientation, initState: IGyroInitState): IPosition {
  const { beta, gamma } = event

  if (beta == null || gamma == null) return { x: 0, y: 0 }

  const deltaBeta = initState.beta - beta
  const deltaGamma = initState.gamma - gamma
  const x = 100 * (deltaBeta) / 45
  const y = 100 * (deltaGamma) / 45

  if (orientation.type === 'portrait-primary') return { x: y, y: x }
  else return { x: x, y: y }
}

// Handle mouse move event and return offset on x & y axis in precents
function handleMouseMove(event: MouseEvent, wrapper: HTMLDivElement): IPosition {
  const { clientX, clientY } = event
  const x = 100 * clientX / wrapper.offsetWidth
  const y = 100 * clientY / wrapper.offsetHeight

  return { x, y }
}

// Changes the transform attributes in the layer style
function setStyles(pos: IPosition, layers: ILayerSetup[]) {
  for (let layer of layers) {
    if (!layer.deep || !layer.node.current) return

    const disallow = layer.disallow
    if (disallow && disallow === 'both') return

    const element = layer.node.current

    const itemX = (disallow && disallow === 'x') ? 0 : pos.x / layer.deep
    const itemY = (disallow && disallow === 'y') ? 0 : pos.y / layer.deep
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

// Returns a callback function for `mousemove` event, 
export const getParallaxFuctionForMouseEvent = (wrapper: HTMLDivElement, layers: ILayerSetup[]) => {
  return (event: MouseEvent) => {
    const pos: IPosition = handleMouseMove(event, wrapper)
    // DEBUG ++
    const output = document.querySelector('.DEBUG');
    if (output) {
      output.textContent = `x : ${pos.x}\n`;
      output.textContent += `y: ${pos.y}\n`;
    }
    // DEBUG --
    setStyles(pos, layers)
  }
}

// Returns a callback function for `deviceorientation` event 
export const getParallaxFuctionForDeviceEvent = (wrapper: HTMLDivElement, layers: ILayerSetup[], orientation: ScreenOrientation, initState: IGyroInitState) => {
  return (event: DeviceOrientationEvent) => {
    const pos: IPosition = handleDeviceOrientation(event, wrapper, orientation, initState)
    // DEBUG ++
    const output = document.querySelector('.DEBUG');
    if (output) {
      output.textContent = `x : ${pos.x}\n`;
      output.textContent += `y: ${pos.y}\n`;
    }
    // DEBUG --
    setStyles(pos, layers)
  }
}
