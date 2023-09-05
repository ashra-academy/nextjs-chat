'use client'
import React, { useContext } from 'react'
import { LogedInUserContext } from './contextapis/auth-context'

const UserInfo = () => {
    const {logedInUser, setLogInUser} = useContext<any>(LogedInUserContext)
  return (
    <div>UserInfo {logedInUser?logedInUser._id:'login'}</div>
  )
}

export default UserInfo