import React, { FunctionComponent } from 'react'

import theme from '../gatsby-plugin-theme-ui'
import { IRadius } from '../types'

interface IThreeSphereProps extends IRadius {}

const ThreeSphere: FunctionComponent<IThreeSphereProps> = ({ radius }) => {
  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial color={theme.colors.three.sphere} />
    </mesh>
  )
}

export default ThreeSphere
