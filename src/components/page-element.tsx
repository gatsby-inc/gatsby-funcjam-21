import React, { FunctionComponent, Fragment } from 'react'
import { Box } from 'theme-ui'

import Seo from './seo'
import Header from './header'

const PageElement: FunctionComponent = ({ children }) => {
  return (
    <Fragment>
      <Seo />
      <Header />
      <Box as="main" variant="styles.main">
        {children}
      </Box>
    </Fragment>
  )
}

export default PageElement
