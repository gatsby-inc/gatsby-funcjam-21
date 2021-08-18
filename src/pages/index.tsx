import React, { Fragment, FunctionComponent } from 'react'
import { Container, Heading, Text } from 'theme-ui'

import ThreeScene from '../components/three-scene'

const IndexPage: FunctionComponent = () => {
  return (
    <Fragment>
      <ThreeScene />
      <Container>
        <Heading as="h1">Groovy Analytics</Heading>
        <Text as="p">
          I'm just collecting analytics data at the moment. Come back soon, and
          you should see your location on the globe below.
        </Text>
      </Container>
    </Fragment>
  )
}

export default IndexPage
