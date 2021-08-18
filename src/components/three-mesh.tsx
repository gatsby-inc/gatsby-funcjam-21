import React, { FunctionComponent, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { RADIUS } from '../const'
import { ILocation } from '../types'

import ThreeSphere from './three-sphere'
import ThreeGeo from './three-geo'
import ThreeGraticule from './three-graticule'
import ThreeAnalytics from './three-analytics'

interface IThreeMeshProps {
  /** Location data returned from useStaticQuery */
  locations: ILocation[]
}

const ThreeMesh: FunctionComponent<IThreeMeshProps> = ({ locations }) => {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    // return (
    //   (mesh.current.rotation.x += 0.001),
    //   (mesh.current.rotation.y += 0.004),
    //   (mesh.current.rotation.z += 0.002)
    // )
    return (mesh.current.rotation.y += 0.004)
  })
  return (
    <mesh ref={mesh}>
      <ThreeSphere radius={RADIUS} />
      <ThreeGeo radius={RADIUS} />
      <ThreeGraticule radius={RADIUS} />
      <ThreeAnalytics locations={locations} />
    </mesh>
  )
}

export default ThreeMesh
