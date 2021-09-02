// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'

// Global Styles
import './styles/global.css'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './app'

// Library
import reportWebVitals from './lib/report_web_vitals'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
