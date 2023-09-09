import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { clearChats } from '@/app/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'

import { LoginButton } from '@/components/login-button'
import UserInfo from './user-info'
import { SidebarLinks } from './sidebar-links'
import { UsermenuLinks } from './usermenu-links'

export async function Header() {
  
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <SidebarLinks/>
        <div className="flex items-center">
          {/* <UserInfo/> */}
          <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
          <UsermenuLinks/>
        </div>
      </div>
    </header>
  )
}
