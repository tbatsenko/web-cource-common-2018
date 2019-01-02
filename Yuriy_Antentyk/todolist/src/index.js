import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import './css/index.scss'

ReactDOM.render(<App date={new Date()} />, document.getElementById('target'))
