'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.action'
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { Cart } from '@/types'

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:col-span-3 ">Table</div>
      )}
    </>
  )
}

export default CartTable
