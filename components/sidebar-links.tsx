'use client'
import React from 'react'
import { Sidebar } from '@/components/sidebar'
import { SidebarList } from '@/components/sidebar-list'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClearHistory } from '@/components/clear-history'
import Link from 'next/link'
import { clearChats } from '@/app/actions'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { LogedInUserContext } from './contextapis/auth-context'
export const SidebarLinks = () => {
  const { logedInUser } = React.useContext<any>(LogedInUserContext)
  return (
    <>
      {logedInUser ? (
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            {/* @ts-ignore */}
            <SidebarList userId={logedInUser?._id} />
          </React.Suspense>
          <SidebarFooter>
            <ThemeToggle />
            <ClearHistory clearChats={clearChats} />
          </SidebarFooter>
        </Sidebar>
      ) : (
        <Link href="/" target="_blank" rel="nofollow">
          <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" />
        </Link>
      )}
    </>
  )
}

