'use client'

import { createOrder } from '@/lib/actions/order.actions'
import { useFormStatus } from 'react-dom'
import { Check, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const PlaceOrderButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} className={'w-full'} type="submit">
      {pending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <div className="flex items-center gap-1">
          <Check className="w-4 h-4" />
        </div>
      )}
      {'  '} Place Order
    </Button>
  )
}

const PlaceOrderForm = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const res = await createOrder()

    if (res.redirectTo) router.push(res.redirectTo)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  )
}

export default PlaceOrderForm
