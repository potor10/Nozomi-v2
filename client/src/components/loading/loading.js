import React from 'react'
import {Spinner} from 'react-bootstrap'
import styles from './loading.module.css'

const Loading = ({ type='grow' }) => {
  // other type is border
  return (
    <div className={`${styles.loading_wrapper} d-flex align-items-center justify-content-center`}>
      <Spinner animation={type} role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading