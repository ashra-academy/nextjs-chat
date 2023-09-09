'use client'

import * as React from 'react'
import { LogedInUserContext, LogedInEmailContext } from './contextapis/auth-context';
interface AuthProvider{
  children?: React.ReactNode;
}
export function AuthProvider({ children }: AuthProvider) {
  const [logedInUser, setLogInUser] = React.useState<null|object>(null)
  const [logedInEmail, setLogInEmail] = React.useState<any>(null)
  return (
    <LogedInUserContext.Provider value={{logedInUser, setLogInUser} as any}>
    <LogedInEmailContext.Provider value={{logedInEmail, setLogInEmail} as any}>
      {children}
    </LogedInEmailContext.Provider>
    </LogedInUserContext.Provider>
  )
}
