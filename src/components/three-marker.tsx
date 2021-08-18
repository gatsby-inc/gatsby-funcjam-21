import React, { FunctionComponent, useEffect, useRef } from 'react'
import { GradientTexture } from '@react-three/drei'
import * as THREE from 'three'

import theme from '../gatsby-plugin-theme-ui'
import { getVertex } from '../utils'
import { Count, LatLng, Radius } from '../types'

const MAX = 300

interface IThreeMarkerProps {
  lat: LatLng
  lng: LatLng
  count: Count
  radius: Radius
  colors: string[]
}

const ThreeMarker: FunctionComponent<IThreeMarkerProps> = ({
  lat,
  lng,
  count,
  radius,
  colors,
}) => {
  if (lat == 0.0 && lng == 0.0) return null

  const mesh = useRef<THREE.Mesh>(null!)

  // useEffect(() => {
  //   mesh.current.lookAt(getVertex(radius, Math.PI, lng))
  // }, [mesh])

  // const stops = colors.map((_, index, arr) =>
  //   Number((index / (arr.length - 1)).toFixed(1))
  // )
  // const hex = colors.map((color) => color)

  // return (
  //   <mesh ref={mesh} position={getVertex(radius + 1, lat, lng)}>

  //     <cylinderGeometry args={[0.5, 0.5, count * 10, 12]} />
  //     <meshPhongMaterial color={theme.colors.three.marker}>
  //       <GradientTexture stops={stops} colors={hex} />
  //     </meshPhongMaterial>
  //   </mesh>
  // )

  return (
    <mesh ref={mesh} position={getVertex(radius + 1, lat, lng)}>
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshBasicMaterial color={theme.colors.three.marker} />
    </mesh>
  )
}

export default ThreeMarker
