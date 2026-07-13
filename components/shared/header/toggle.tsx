'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react'

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          }
        >
          {theme === 'system' ? (
            <SunMoon />
          ) : theme === 'dark' ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={theme === 'system'}
            onCheckedChange={() => {
              setTheme('system')
            }}
          >
            System
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === 'dark'}
            onCheckedChange={() => {
              setTheme('dark')
            }}
          >
            Dark
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === 'light'}
            onCheckedChange={() => {
              setTheme('light')
            }}
          >
            Light
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ModeToggle
