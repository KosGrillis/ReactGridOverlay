import React from 'react'

import { Props } from './index'

export const gridStyles = (
  backgroundColor: Props['backgroundColor'],
  lineColor: Props['lineColor'],
  columns: Props['columns'],
  rows: Props['rows'],
  offset: Props['offset'],
  gutter: Props['gutter'],
  lineThickness: Props['lineThickness'],
  verticalRhythm: Props['verticalRhythm'],
  showRows: boolean,
  showColumns: boolean,
  showVerticalRhythm: boolean,
): React.CSSProperties => {
  const repeatingWidth = `calc(100% / ${columns})`
  const columnWidth = `calc((100% / ${columns}) - ${gutter})`
  const backgroundColumns = `
    repeating-linear-gradient(
      to right,
      ${lineColor},
      ${lineColor} ${lineThickness},
      transparent ${lineThickness},
      transparent calc(${columnWidth} - ${lineThickness}),
      ${lineColor} calc(${columnWidth} - ${lineThickness}),
      ${lineColor} ${columnWidth},
      transparent ${columnWidth},
      transparent ${repeatingWidth}
    )
  `

  const repeatingHeight = `calc(100% / ${rows})`
  const rowWidth = `calc((100% / ${rows}) - ${gutter})`
  const backgroundRows = `
    repeating-linear-gradient(
      to bottom,
      ${lineColor},
      ${lineColor} ${lineThickness},
      transparent ${lineThickness},
      transparent calc(${rowWidth} - ${lineThickness}),
      ${lineColor} calc(${rowWidth} - ${lineThickness}),
      ${lineColor} ${rowWidth},
      transparent ${rowWidth},
      transparent ${repeatingHeight}
    )
  `

  const verticalRhythmRows = `
    repeating-linear-gradient(
      to bottom,
      ${lineColor},
      ${lineColor} ${lineThickness},
      transparent ${lineThickness},
      transparent ${verticalRhythm}
    )
  `

  const backgroundWidth = `calc(100% + ${gutter})`
  const backgroundHeight = `calc(100% + ${gutter} + ${lineThickness})`

  const genBackgroundImage = () => {
    let retStyle = ''
    if (showRows) {
      retStyle += retStyle.length === 0 ? backgroundRows : `, ${backgroundRows}`
    }
    if (showColumns) {
      retStyle +=
        retStyle.length === 0 ? backgroundColumns : `, ${backgroundColumns}`
    }
    if (showVerticalRhythm) {
      retStyle +=
        retStyle.length === 0 ? verticalRhythmRows : `, ${verticalRhythmRows}`
    }

    return retStyle
  }

  return {
    backgroundColor,
    position: 'fixed',
    width: `calc(100% - (2 * ${offset}))`,
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: 'none',
    marginLeft: offset,
    marginRight: offset,
    backgroundImage: genBackgroundImage(),
    backgroundSize: `${backgroundWidth} ${backgroundHeight}`,
    backgroundPosition: `0 0`,
  }
}
