import React from 'react'

import bem from "../../../helpers/js/bem"

import "./nav.scss"
import "../../../helpers/css/button.scss"

const buttonBem = bem("button")
const navBem = bem("nav")

const Nav = ({
  onCheckAllTodos,
  onUncheckAllTodos,
  onDeleteSelectedTodos,
}) => (
  <div className={navBem()}>
    <button onClick={onCheckAllTodos} className={[buttonBem(), navBem({element: "item"})].join(" ")}>Check all</button>
    <button onClick={onUncheckAllTodos} className={[buttonBem(), navBem({element: "item"})].join(" ")}>Uncheck all</button>
    <button onClick={onDeleteSelectedTodos} className={[buttonBem(), navBem({element: "item"})].join(" ")}>Delete Selected</button>
  </div>
)

export default Nav
