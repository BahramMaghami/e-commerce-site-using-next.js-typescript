import { Button } from '@/components/ui/button'
import ModeToggle from './toggle'
import Link from 'next/link'
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button variant="ghost">
          <Link href="/cart" className="lg:flex lg:gap-1">
            <ShoppingCart /> 
          </Link>
          Cart
        </Button>
        <Button>
          <Link href="/cart" className="lg:flex lg:gap-1">
            <UserIcon /> 
          </Link>
          Sign In
        </Button>
      </nav>
      <nav className="md:hidden ">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button variant="ghost">
              <Link href="/cart">
                <ShoppingCart />
              </Link>
              Cart
            </Button>
            <Button>
              <Link href="/cart" className="lg:flex lg:gap-1">
                <UserIcon />
              </Link>
              Sign In
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
