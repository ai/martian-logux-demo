import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { SUBPROTOCOL } from '../protocol'

import { Tasks } from './Tasks'

const USER_ID = '10'

const App: FC = () => {
  return <Tasks userId={USER_ID} />
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
