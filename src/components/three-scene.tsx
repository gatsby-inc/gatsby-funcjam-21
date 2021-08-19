import React, { FunctionComponent, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
import { Box } from 'theme-ui'

import theme from '../gatsby-plugin-theme-ui'

import ThreeMesh from './three-mesh'

const ThreeScene: FunctionComponent = () => {
  const [hasLoaded, setHasLoaded] = useState(false)

  const {
    allLocations: { nodes },
  } = useStaticQuery(graphql`
    query {
      allLocations {
        nodes {
          city
          country
          country_code
          count
          lat
          lng
        }
      }
    }
  `)

  const handleLoad = () => {
    setHasLoaded(true)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: (theme: any) => theme.sizes.header,
        left: 0,
        width: '100%',
        zIndex: 'canvas',
        canvas: {
          width: '100%',
          height: ['auto', 'canvas'],
          cursor: 'move',
          opacity: hasLoaded ? 1 : 0,
        },
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: false }}
        camera={{
          fov: 45,
          position: [0, 100, 300],
        }}
        onCreated={handleLoad}
      >
        <color attach="background" args={[theme.colors.three.background]} />
        {/* <OrbitControls
          enableRotate={true}
          enableZoom={false}
          enablePan={false}
        /> */}
        <ambientLight intensity={0.5} />
        <ThreeMesh locations={nodes} />
      </Canvas>
    </Box>
  )
}

export default ThreeScene
