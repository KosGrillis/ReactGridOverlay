import React, { CSSProperties } from 'react'
import { render } from 'react-dom'

import GridOverlay from '../src/index'

const styles: { [key: string]: CSSProperties } = {}

const Example = () => (
  <div style={styles.page}>
    <GridOverlay />
  </div>
)

render(<Example/>, document.getElementById('root'))