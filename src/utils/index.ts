import * as THREE from 'three'

import { LatLng, Radius } from '../types'

export const getVertex = (lat: LatLng, lng: LatLng, radius: Radius) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(
      radius,
      THREE.MathUtils.degToRad(90 - lat),
      THREE.MathUtils.degToRad(lng)
    )
  )
  return vector
}
