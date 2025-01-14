import React, { useContext } from 'react'
import UserContext from '../UserContext'
import MyCar from './MyCar'

function MyAccountCar() {
    const { login, setLogin } = useContext(UserContext)

  return (
    <div>
    {login && login.user_type === "DR" && (
      <div id="my-car" className="card mb-4">
        <MyCar/>
      </div>
    )}</div>
  )
}

export default MyAccountCar