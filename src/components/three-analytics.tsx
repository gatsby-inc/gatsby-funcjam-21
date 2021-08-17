import React, { FunctionComponent, Fragment } from 'react'
import countryFlagColors from 'country-flag-colors'

import ThreeMarker from './three-marker'
import { ILocation } from '../types'
import { RADIUS } from '../const'

interface IThreeAnalyticsProps {
  /** Location data returned from useStaticQuery */
  locations: ILocation[]
}

const ThreeAnalytics: FunctionComponent<IThreeAnalyticsProps> = ({
  locations,
}) => {
  return (
    <Fragment>
      {locations.map((data, index) => {
        const { lat, lng, country, count } = data
        const color = countryFlagColors.find((f) => f.name === country)
        return (
          <ThreeMarker
            key={index}
            lat={lat}
            lng={lng}
            count={count}
            radius={RADIUS}
            colors={color ? color.colors : ['#ff00ff', '#ff00ff', '#ff00ff']}
          />
        )
      })}
    </Fragment>
  )
}

export default ThreeAnalytics
