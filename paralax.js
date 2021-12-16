function Parallax(options) {
  // Defines how classes and attributes are named 
  options = options || {}
  this.names = {
    wrapper: options.wrapper || '.parallax',                // string: wrapper class name
    layers: options.layers || '.parallax-layer',            // string: layer class name
    deep: options.deep || 'data-parallax-deep',             // number: -5000 ... 5000
    origin: options.origin || 'data-parallax-origin',           // number: 0 ... width
    disallow: options.disallow || 'data-parallax-disallow', // string: 'x' || 'y' || 'both'
  }

  // Return collection of parallax wrapers
  const getWrappers = () => document.querySelectorAll(this.names.wrapper)

  // Return parallax layers for given wrapper
  const getLayers = (wrapper) => wrapper.querySelectorAll(this.names.layers)

  // Return a callback function for `mousemove` event, 
  // which changes the transform attribute in the layer style
  const getTranslateFuction = (wrapper) => {
    const self = this
    return (event) => {
      const { clientX, clientY} = event
      const x = 100 * clientX / wrapper.offsetWidth
      const y = 100 * clientY / wrapper.offsetHeight
      const layers = getLayers(wrapper)
      for (let layer of layers) {
        const disallow = layer.getAttribute(self.names.disallow)
        const origin = layer.getAttribute(self.names.origin)
        if (disallow && disallow === 'both') return

        const deep = layer.getAttribute(self.names.deep)
        const itemX = (disallow && disallow === 'x') ? 0 : x / deep
        const itemY = (disallow && disallow === 'y') ? 0 : y * 2 / deep

        layer.style.transform = `translateX(${itemX}%) translateY(${itemY}%)`
        if(origin) {
          layer.style['transform-origin'] = origin
          layer.style.transform += ` rotateY(${5+itemX*2}deg) rotateX(${5+itemX*1.8}deg)`
        }
      }
    }
  }

  // Initialization of event listener for all paralax wrappers
  this.init = function () {
    const wrappers = getWrappers()
    for (let wrapper of wrappers) {
      wrapper.addEventListener('mousemove', getTranslateFuction(wrapper))
    }
  }

  this.init()
  return this
}

window.addEventListener('load', function () {
  new Parallax()
})