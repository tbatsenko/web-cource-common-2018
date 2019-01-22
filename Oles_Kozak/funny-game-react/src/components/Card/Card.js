import React from 'react'
import './card.scss'

const Card = ({ picture, opened, onRotate }) => (
  <div className="card">
    <div
      className="card__sides"
      onClick={!opened ? () => onRotate() : null}
      style={{ transform: opened ? `rotateY( 180deg )` : `rotateY( 0deg )` }}
    >
      <div className="card__front" />
      <img src={'/img/' + picture} className="card__back" alt="card" />
    </div>
  </div>
)

export default Card
