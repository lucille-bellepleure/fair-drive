import React from 'react'
import { Route } from "react-router-dom"
import pages from "pages"
import styles from "styles.module.css"
import { useDispatch, useSelector } from "react-redux"
import PasswordUnlock from "components/PasswordUnlock"

function getSystem(state) {
  return state.system
}

function App() {

  const system = useSelector(state => getSystem(state))
  const dispatch = useDispatch()

  return (
    <div className={styles.swarmcity}>
      {pages.map(({ path, exact, component }) => (
        <Route key={path} {...{ path, exact, component }} />
      ))}
      <PasswordUnlock open={system.showPasswordUnlock}></PasswordUnlock>
    </div >
  )
}

export default App