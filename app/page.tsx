'use client'
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import SignInUi from '@/components/signin/SignInUi'
import { useEffect, useState, useContext } from 'react'
import { LogedInUserContext } from '@/components/contextapis/auth-context'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()
  const [auth, setAuth] = useState(null)
  const {logedInUser, setLogInUser} = useContext<any>(LogedInUserContext)

  useEffect(() => {
    let userauthinfo = localStorage.getItem('botsession')
    if(userauthinfo && userauthinfo !== 'undefined') {
      setLogInUser(JSON.parse(userauthinfo))
    }

  }, [auth])

  return <>{logedInUser ? <Chat id={id} /> : <SignInUi />}</>
}
