import React, { Fragment, FunctionComponent } from 'react'
import { Heading, Box, ThemeUIStyleObject } from 'theme-ui'

interface IGroovyHeadingProps {
  /** Text to display */
  text: string[]
  /** HTML heading element */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  /** Theme UI heading variant */
  variant?: string
  /** CSS color */
  color?: string
  /** CSS -webkit-text-stroke-color */
  strokeColor?: string
  /** CSS text-align */
  textAlign?: 'left' | 'right' | 'center'
  /** CSS justify-content */
  justifyContent?: 'flex-start' | 'flex-end' | 'center'
  /** Theme UI sx prop */
  sx?: ThemeUIStyleObject
}

const GroovyHeading: FunctionComponent<IGroovyHeadingProps> = ({
  text,
  as = 'h2',
  variant = 'heading.h2',
  color = 'secondary',
  strokeColor = 'primary',
  textAlign = 'left',
  justifyContent = 'flex-start',
  sx,
}) => {
  return (
    <Heading
      as={as}
      variant={variant}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: justifyContent,
        ...sx,
      }}
    >
      <Fragment>
        {text.map((string, index) => {
          return (
            <Box
              key={index}
              as="span"
              data-text={string}
              sx={{
                display: 'inline-grid',
                placeItems: 'center',
                gridTemplateAreas: '"text"',
                textAlign: textAlign,
                '::before': {
                  content: 'attr(data-text)',
                  gridArea: 'text',
                  background: (theme) =>
                    `no-repeat linear-gradient(${theme.colors[strokeColor]}, ${theme.colors[strokeColor]}) 50% 50%/60% 15%`,
                  WebkitTextStrokeColor: (theme) => theme.colors[strokeColor],
                },
                color: color,
              }}
            >
              <Box
                as="span"
                sx={{
                  textAlign: textAlign,
                  gridArea: 'text',
                }}
              >
                {string}
              </Box>
            </Box>
          )
        })}
      </Fragment>
    </Heading>
  )
}

export default GroovyHeading
