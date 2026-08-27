import { Resend } from 'resend'
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants'
import { Order } from '@/types'
import 'dotenv/config'
import PurchaseReceiptEmail from './purchase-receipt'
import { OrderInformationProps } from './purchase-receipt'

const resend = new Resend(process.env.RESEND_API_KEYS as string)

export const sendPurchaseReceipt = async ({
  order,
}: {
  order: OrderInformationProps
}) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.order.user.email,
    subject: `Order Confirmation ${order.order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  })
}
