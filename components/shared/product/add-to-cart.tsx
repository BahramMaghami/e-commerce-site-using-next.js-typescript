'use client'

import { CartItem } from '@/types/index'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { addItemToCart } from '@/lib/actions/cart.action'

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter()

  const handleAddToCart = async () => {
    const res = await addItemToCart(item)

    if (res && !res.success) {
      toast.error(res.message, {
        className: '!bg-red-500',
      })
      return
    }

    // Handle success add to cart
    toast('', {
      position: 'bottom-right',
      description: res.message,
      action: {
        label: 'Go To Cart',
        onClick: () => router.push('/cart'),
      },
      className: '!flex !gap-3',
    })
  }

  return (
    <Button
      // variant="outline"
      className="w-full cursor-pointer"
      type="button"
      onClick={handleAddToCart}
    >
      <Plus /> Add To Cart
    </Button>
  )
}

export default AddToCart
