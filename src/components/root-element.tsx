import React, { FunctionComponent, Fragment } from 'react'
import { Global, css } from '@emotion/react'

import Seo from './seo'

const RootElement: FunctionComponent = ({ children }) => {
  return (
    <Fragment>
      <Global
        styles={css`
          @font-face {
            font-family: 'Circula-Medium';
            src: url('/fonts/Circula-Medium.woff') format('woff'),
              url('/fonts/Circula-Medium.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
          }
          @font-face {
            font-family: 'GvTime-Regular';
            src: url('/fonts/GvTime-Regular.woff2.woff') format('woff'),
              url('/fonts/GvTime-Regular.woff2.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
          }
          @font-face {
            font-family: 'Roboto-Bold';
            src: url('/fonts/Roboto-Bold.woff2.woff') format('woff'),
              url('/fonts/Roboto-Bold.woff2.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
          }
          @font-face {
            font-family: 'Roboto-Regular';
            src: url('/fonts/Roboto-Regular.woff2.woff') format('woff'),
              url('/fonts/Roboto-Regular.woff2.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
          }
        `}
      />
      <Seo />
      {children}
    </Fragment>
  )
}

export default RootElement
