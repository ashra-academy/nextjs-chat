'use client'
import React from 'react'
import { UserMenu } from '@/components/user-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { LogedInUserContext } from './contextapis/auth-context'
export const UsermenuLinks = () => {

  const { logedInUser } = React.useContext<any>(LogedInUserContext)
  return (
    <>
        {logedInUser ? (
            <UserMenu user={logedInUser} />
          ) : (
            <Button variant="link" asChild className="-ml-2">
              Login
            </Button>
          )}
    </>
  )
}