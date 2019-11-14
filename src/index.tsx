import React from 'react'

import { gridStyles } from './style'

export type Props = {
  backgroundColor?: React.CSSProperties['color']
  lineColor?: React.CSSProperties['color']
  columns?: number
  rows?: number
  offset?: React.CSSProperties['margin']
  gutter?: React.CSSProperties['margin'] // Is this the best type?
  lineThickness?: React.CSSProperties['width']
  verticalRhythm?: React.CSSProperties['height']
}

const controlStyles: React.CSSProperties = {
  marginRight: '5rem',
  marginBottom: '5rem',
  // width: `${10}rem`,
  backgroundColor: '#F4F7F7',
  position: 'absolute',
  right: 0,
  bottom: 0,
  pointerEvents: 'all',
  borderRadius: '1rem',
  padding: '1rem',
  borderWidth: '2.5px',
  borderStyle: 'solid',
  borderColor: '#E2E5E6',
  // zIndex: 10000,
}

// type DragState = {
//   currentX?: any,
//   currentY?: any,
//   initialX?: any,
//   initialY?: any,
//   xOffset: number,
//   yOffset: number,
//   active: boolean,
// }

const pStyles = {
  margin: 0,
  fontSize: '14px',
  marginRight: '0.25rem',
}

const GridOverlay = ({
  backgroundColor = 'hsla(204, 80%, 72%, 0.25)',
  lineColor = 'black',
  columns = 12,
  rows = 8,
  offset = 0,
  gutter = '1rem',
  lineThickness = '1px',
  verticalRhythm = '16px',
}: Props) => {
  console.log(process.env.NODE_ENV)

  const thisRef = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState()
  const [showRows, setShowRows] = React.useState<boolean>(true)
  const [showColumns, setShowColumns] = React.useState<boolean>(true)
  const [showVerticalRhythm, setShowVerticalRhythm] = React.useState<boolean>(
    false,
  )
  const [gridState, setGridState] = React.useState<Props>({
    backgroundColor,
    lineColor,
    columns,
    rows,
    offset,
    gutter,
    lineThickness,
    verticalRhythm,
  })

  const initialiseDrag = (e: any) => {
    const { target, clientX, clientY } = e
    const { offsetTop, offsetLeft } = target

    if (thisRef.current) {
      const { left, top } = thisRef.current.getBoundingClientRect()
      window.addEventListener('mousemove', startDragging, false)
      window.addEventListener('mouseup', stopDragging, false)

      setState({
        dragStartLeft: left - offsetLeft,
        dragStartTop: top - offsetTop,
        dragStartX: clientX,
        dragStartY: clientY,
      })
    }
  }
  console.debug(initialiseDrag)

  const startDragging = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (thisRef.current && state) {
      thisRef.current.style.transform = `translate(${state.dragStartLeft +
        e.clientX -
        state.dragStartX}px, ${state.dragStartTop +
        e.clientY -
        state.dragStartY}px)`
    }
  }

  const stopDragging = () => {
    window.removeEventListener('mousemove', startDragging, false)
    window.removeEventListener('mouseup', stopDragging, false)
  }

  const onShowRowsClick = () => {
    setShowRows(!showRows)
  }

  const onShowColumnsClick = () => {
    setShowColumns(!showColumns)
  }

  const onShowVerticalRhythmClick = () => {
    setShowVerticalRhythm(!showVerticalRhythm)
  }

  return (
    <div
      style={gridStyles(
        gridState.backgroundColor,
        gridState.lineColor,
        gridState.columns,
        gridState.rows,
        gridState.offset,
        gridState.gutter,
        gridState.lineThickness,
        gridState.verticalRhythm,
        showRows,
        showColumns,
        showVerticalRhythm,
      )}
    >
      <div
        id={'controls'}
        style={controlStyles}
        ref={thisRef}
        // onMouseDown={initialiseDrag}
      >
        <h4 style={{ margin: 0 }}>Grid Controls</h4>

        <hr style={{ color: '#E2E5E6' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>backgroundColor:</p>
          <input
            type="text"
            onChange={(e) =>
              setGridState({ ...gridState, backgroundColor: e.target.value })
            }
            value={gridState.backgroundColor}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>lineColor:</p>
          <input
            type="text"
            onChange={(e) =>
              setGridState({ ...gridState, lineColor: e.target.value })
            }
            value={gridState.lineColor}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>columns:</p>
          <input
            type="number"
            onChange={(e) =>
              setGridState({ ...gridState, columns: e.target.valueAsNumber })
            }
            value={gridState.columns}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>rows:</p>
          <input
            type="number"
            onChange={(e) =>
              setGridState({ ...gridState, rows: e.target.valueAsNumber })
            }
            value={gridState.rows}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>offset:</p>
          <input
            type="text"
            onChange={(e) =>
              setGridState({ ...gridState, offset: e.target.value })
            }
            value={gridState.offset}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>gutter:</p>
          <input
            type="text"
            onChange={(e) =>
              setGridState({ ...gridState, gutter: e.target.value })
            }
            value={gridState.gutter}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>lineThickness:</p>
          <input
            type="text"
            onChange={(e) =>
              setGridState({ ...gridState, lineThickness: e.target.value })
            }
            value={gridState.lineThickness}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={pStyles}>verticalRhythm:</p>
          <input
            type="text"
            onChange={(e) =>
              setGridState({ ...gridState, verticalRhythm: e.target.value })
            }
            value={gridState.verticalRhythm}
          />
        </div>

        <button
          onClick={() =>
            setGridState({
              backgroundColor,
              lineColor,
              columns,
              rows,
              offset,
              gutter,
              lineThickness,
              verticalRhythm,
            })
          }
        >
          Reset
        </button>

        <hr style={{ color: '#E2E5E6' }} />

        <div style={{ display: 'flex' }}>
          <input type="checkbox" onClick={onShowRowsClick} checked={showRows} />
          <p style={pStyles}>Show rows</p>
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="checkbox"
            onClick={onShowColumnsClick}
            checked={showColumns}
          />
          <p style={pStyles}>Show columns</p>
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type="checkbox"
            onClick={onShowVerticalRhythmClick}
            checked={showVerticalRhythm}
          />
          <p style={pStyles}>Show vertical rhythm</p>
        </div>
      </div>
    </div>
  )
}

export default GridOverlay
