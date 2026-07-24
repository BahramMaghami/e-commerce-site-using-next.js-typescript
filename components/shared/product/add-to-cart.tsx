'use client'

import { Cart, CartItem } from '@/types/index'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Plus, Minus } from 'lucide-react'
import { toast } from 'sonner'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.action'

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
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

  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId)

    if (res && !res.success) {
      toast.error(res.message, {
        className: '!bg-red-500',
      })
      return
    }

    // Handle success remove to cart
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

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId)

  return existItem ? (
    <div className="flex gap-4 justify-center items-center">
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2 text-xl">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
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
