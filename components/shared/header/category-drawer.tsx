import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { getAllCategories } from '@/lib/actions/product.action'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

const CategoryDrawer = async () => {
  const categories = await getAllCategories()

  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger
        render={
          <Button variant={'outline'}>
            <MenuIcon />
          </Button>
        }
      ></DrawerTrigger>
      <DrawerContent className={'h-full max-w-sm'}>
        <DrawerHeader>
          <DrawerTitle>Select a Categoty</DrawerTitle>
          <div className="space-y-1 mt-4">
            {categories.map((x) => (
              <DrawerClose
                key={x.category}
                nativeButton={false}
                render={
                  <Link
                    href={`/search?category=${x.category}`}
                    className="flex w-full justify-start rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    {x.category} ({x._count})
                  </Link>
                }
              />
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default CategoryDrawer
