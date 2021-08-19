import React, { FunctionComponent } from 'react'
import { Box } from 'theme-ui'

import GroovyHeading from './groovy-heading'

const Header: FunctionComponent = () => {
  return (
    <Box
      as="header"
      sx={{
        variant: 'styles.header',
      }}
    >
      <GroovyHeading
        as="div"
        variant="heading.h5"
        text={['GA']}
        strokeColor="black"
        color="primary"
        sx={{
          mt: 2,
        }}
      />
    </Box>
  )
}

export default Header
