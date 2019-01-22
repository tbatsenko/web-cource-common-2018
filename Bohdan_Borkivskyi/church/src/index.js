import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.Fragment>
    <App
      id={0}
      antichrists={5}
      cristians={5}
      size={{ width: 500, height: 300, person: 15 }}
    />
  </React.Fragment>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
