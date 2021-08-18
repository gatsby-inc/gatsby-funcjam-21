import * as THREE from 'three'

import { LatLng, Radius } from '../types'

export const getVertex = (radius: Radius, lat: LatLng, lng: LatLng) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(
      radius,
      THREE.MathUtils.degToRad(90 - lat),
      THREE.MathUtils.degToRad(lng)
    )
  )

  return vector
}
