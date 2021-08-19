import React from 'react'

import RootElement from './src/components/root-element'
import PageElement from './src/components/page-element'

export const wrapPageElement = ({ element }) => {
  return <PageElement>{element}</PageElement>
}

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
