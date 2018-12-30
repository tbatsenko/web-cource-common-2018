import React from 'react'

import bem from '../../helpers/js/bem'

import './loading.scss'

const loadingBem = bem('lds-ring')

const Loading = () => (
  <div className={loadingBem()}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default Loading
