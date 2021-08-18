const theme = {
  colors: {
    text: '#ff0099',
    background: '#000000',
    three: {
      background: '#080808',
      // sphere: '#ffffff',
      sphere: '#ff0044',
      // marker: '#ff0099',
      marker: '#33ffcc',
      geometry: '#ff0077',
      graticule: '#ff0044',
    },
  },

  fonts: {
    heading: 'system-ui',
    body: 'system-ui',
  },

  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
    },
  },

  sizes: {
    container: 1140,
    canvas: 500,
  },

  layout: {
    container: {
      px: [3, 4],
    },
  },

  zIndices: {
    canvas: -1,
  },
}

export default theme
