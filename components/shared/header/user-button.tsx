import Link from 'next/link'
import { auth } from '@/auth'
import { signOutUser } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { UserIcon } from 'lucide-react'

const UserButton = async () => {
  const session = await auth()

  if (!session) {
    return (
      <Button variant="ghost">
        <Link href="/sign-in" className="flex gap-1">
          <UserIcon />
          Sign In
        </Link>
      </Button>
    )
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U'

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="cursor-pointer"
          render={
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full ml-2 flex items-center justify-center bg-gray-200 text-black"
            >
              {firstInitial}
            </Button>
          }
        />
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal mb-2">
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-medium leading-none">
                  {session.user?.name}
                </div>
                <div className="text-sm text-muted-foreground leading-none">
                  {session.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem className="p-0 mb-1 w-full">
              <form action={signOutUser}>
                <Button
                  className="w-full py-4 px-2 h-4 justify-start cursor-pointer"
                  variant="ghost"
                  type="submit"
                >
                  Sign Out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton
