import { Resend } from 'resend'
import PurchaseReceiptEmail from '@/email/purchase-receipt'
import { Order } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPurchaseReceipt({ order }: { order: Order }) {
  const { data, error } = await resend.emails.send({
    from: 'Prostore <onboarding@resend.dev>',
    to: [order.user.email],
    subject: 'Purchase Receipt',
    react: PurchaseReceiptEmail({ order }),
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
