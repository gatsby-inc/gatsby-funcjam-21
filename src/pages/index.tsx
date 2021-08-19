import React, { Fragment, FunctionComponent } from 'react'
import { Container, Grid, Flex, Text } from 'theme-ui'

import ThreeScene from '../components/three-scene'
import GroovyHeading from '../components/groovy-heading'

const IndexPage: FunctionComponent = () => {
  return (
    <Fragment>
      <Container
        sx={{
          pointerEvents: 'none',
        }}
      >
        <Grid
          sx={{
            placeItems: 'center',
            height: 'canvas',
          }}
        >
          <Grid
            sx={{
              gap: 0,
            }}
          >
            <GroovyHeading
              as="h1"
              variant="heading.h1"
              textAlign="center"
              justifyContent="center"
              text={['Groovy', 'Analytics']}
            />
            <Text as="p" sx={{ color: 'text', textAlign: 'center' }}>
              I'm just collecting analytics data at the moment. <br />
              Come back soon, and you should see your location on the globe.
            </Text>
          </Grid>
        </Grid>
      </Container>
      <ThreeScene />
    </Fragment>
  )
}

export default IndexPage
