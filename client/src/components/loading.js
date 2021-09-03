import React from 'react'
import {Spinner} from 'react-bootstrap'
import styles from './loading.module.css'

const Loading = () => {
  const spinner_type = Math.floor(Math.random() * 2)
  let spinner_animation = 'border'
  if (spinner_type === 1) {
    spinner_animation = 'grow'
  }

  return (
    <div className={`${styles.loading_wrapper} d-flex align-items-center justify-content-center`}>
      <Spinner animation={spinner_animation} role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading