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

  const cap = count > MAX ? MAX : count

  useEffect(() => {
    mesh.current.lookAt(getVertex(Math.PI, lng, radius))
  }, [mesh])

  const stops = colors.map((_, index, arr) =>
    Number((index / (arr.length - 1)).toFixed(1))
  )
  const hex = colors.map((color) => color)

  return (
    <mesh ref={mesh} position={getVertex(lat, lng, radius)}>
      <cylinderGeometry args={[0.8, 0.8, cap, 10, 1, false]} />
      <meshPhongMaterial color={theme.colors.three.marker}>
        <GradientTexture stops={stops} colors={hex} />
      </meshPhongMaterial>
    </mesh>
  )
}

export default ThreeMarker
