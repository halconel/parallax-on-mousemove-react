import { useLayoutEffect, useRef, useState } from "react";
import { getParallaxFuctionForDeviceEvent, getParallaxFuctionForMouseEvent, ILayerSetup } from "./parallax";

export interface IGyroInitState {
  alpha: number,
  beta: number,
  gamma: number,
}

interface IGyro {
  isPresent: boolean,
  initState: IGyroInitState
}

// Detect portrait and landscape orientation of device
export function useOrientation() {
  const [orientation, setOrientation] = useState<ScreenOrientation>(window.screen.orientation)

  useLayoutEffect(() => {
    const onOrientationChange = () => {
      if (orientation.type !== window.screen.orientation.type) {
        setOrientation(window.screen.orientation)
      }
    }
    window.addEventListener('orientationchange', onOrientationChange);
  }, [orientation])

  return orientation
}

// Check if gyroscope presents on device and init gyroscope state
export function useInitGyroscope(): IGyro {
  const [isPresent, setIsPresent] = useState<boolean>(false)
  const [initState, setInitState] = useState({ alpha: 0, beta: 0, gamma: 0 })

  useLayoutEffect(() => {
    function handler(event: DeviceOrientationEvent) {
      setIsPresent(typeof event.alpha === 'number'
        && typeof event.beta === 'number'
        && typeof event.gamma === 'number')
      setInitState({ alpha: event.alpha || 0, beta: event.beta || 0, gamma: event.gamma || 0 })
      window.removeEventListener('deviceorientation', handler);
    }
    window.addEventListener('deviceorientation', handler, false);
  }, [])

  return {isPresent, initState}
}

// Add parallax function on mouse & device events
export function useParallax(layers: ILayerSetup[], orientation: ScreenOrientation, gyro: IGyro) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      const node = ref.current
      const parallaxOnMouse = getParallaxFuctionForMouseEvent(node, layers)
      const parallaxOnDevice = getParallaxFuctionForDeviceEvent(node, layers, orientation, gyro.initState)

      if (!gyro.isPresent) node.addEventListener('mousemove', parallaxOnMouse)
      if (gyro.isPresent) window.addEventListener('deviceorientation', parallaxOnDevice)

      return () => {
        if (node) {
          if (!gyro.isPresent) node.removeEventListener('mousemove', parallaxOnMouse)
          if (gyro.isPresent) window.removeEventListener('deviceorientation', parallaxOnDevice)
        }
      }
    }
  }, [layers, orientation, gyro.isPresent, gyro.initState])

  return ref
}
