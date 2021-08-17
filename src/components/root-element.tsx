import React, { FunctionComponent, Fragment } from 'react'

import Seo from './seo'

const RootElement: FunctionComponent = ({ children }) => {
  return (
    <Fragment>
      <Seo />
      {children}
    </Fragment>
  )
}

export default RootElement
