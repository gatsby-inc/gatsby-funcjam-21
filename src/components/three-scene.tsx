import React, { FunctionComponent, useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
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
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 'canvas',
        canvas: {
          width: '100%',
          height: '100vh',
          // height: ['auto', 'canvas'],
          cursor: 'move',
          opacity: hasLoaded ? 1 : 0,
        },
      }}
    >
      <Canvas
        gl={{ antialias: false, alpha: false }}
        camera={{
          fov: 45,
          position: [0, 10, 300],
        }}
        onCreated={handleLoad}
      >
        <color attach="background" args={[theme.colors.three.background]} />
        <OrbitControls
          enableRotate={true}
          enableZoom={false}
          enablePan={false}
        />
        <pointLight args={[0, 15, 180]} color="#ffffff" />
        <ambientLight intensity={0.04} />
        <ThreeMesh locations={nodes} />
      </Canvas>
    </Box>
  )
}

export default ThreeScene
