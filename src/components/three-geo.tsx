import React, { FunctionComponent, Fragment } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry'

import theme from '../gatsby-plugin-theme-ui'
import { data } from '../geometry/ne_110m_admin_0_countries'
import { IRadius } from '../types'

interface IThreeGeoProps extends IRadius {}

const ThreeGeo: FunctionComponent<IThreeGeoProps> = ({ radius }) => {
  return (
    <Fragment>
      {data.features.map(({ geometry }, index) => {
        return (
          <lineSegments
            key={index}
            geometry={new GeoJsonGeometry(geometry as any, radius)}
          >
            <lineBasicMaterial
              color={theme.colors.three.geometry}
              transparent={true}
              opacity={0.5}
            />
          </lineSegments>
        )
      })}
    </Fragment>
  )
}

export default ThreeGeo
