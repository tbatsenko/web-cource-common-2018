import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { retrieveDateFromUrlString } from './helpers/date'

import './css/index.scss'

ReactDOM.render(
  <App date={retrieveDateFromUrlString(window.location.href)} />,
  document.getElementById('target')
)
