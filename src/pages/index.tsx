import React, { Fragment, FunctionComponent } from 'react'
import { Container } from 'theme-ui'

import ThreeScene from '../components/three-scene'

const IndexPage: FunctionComponent = () => {
  return (
    <Fragment>
      <ThreeScene />
      <Container></Container>
    </Fragment>
  )
}

export default IndexPage
