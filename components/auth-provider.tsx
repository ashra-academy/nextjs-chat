'use client'

import * as React from 'react'
import { LogedInUserContext } from './contextapis/auth-context';
interface AuthProvider{
  children?: React.ReactNode;
}
export function AuthProvider({ children }: AuthProvider) {
  const [logedInUser, setLogInUser] = React.useState<null|object>(null)
  return (
    <LogedInUserContext.Provider value={{logedInUser, setLogInUser} as any}>
      {children}
    </LogedInUserContext.Provider>
  )
}
