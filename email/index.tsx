import { Resend } from 'resend'
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants'
import { Order } from '@/types'
import 'dotenv/config'
import PurchaseReceiptEmail from './purchase-receipt'
import { OrderInformationProps } from './purchase-receipt'
import type { NextApiRequest, NextApiResponse } from 'next'

const resend = new Resend(process.env.RESEND_API_KEYS as string)

export const sendPurchaseReceipt = async ({ order }: OrderInformationProps) => {
  const { data, error } = await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: 'bahrammaghami193@gmail.com',
    subject: `Order Confirmation ${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  })

  if (error) {
    return error.message
  }

  return data
}

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { data, error } = await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: ['delivered@resend.dev'],
//     subject: 'Hello world',
//     react: EmailTemplate({ firstName: 'John' }),
//   })

//   if (error) {
//     return res.status(400).json(error)
//   }

//   res.status(200).json(data)
// }
