import PurchaseReceiptEmail from '@/email/purchase-receipt'
import { APP_NAME } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { PaymentResult, ShippingAddress } from '@/types'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()

    // اینجا order رو از دیتابیس بگیر
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
        orderitems: true,
      },
    })

    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 })
    }

    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <onboarding@resend.dev>`,
      to: ['bahrammaghami193@gmail.com'],
      subject: 'Purchase Receipt',
      react: PurchaseReceiptEmail({
        order: {
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
          paymentResult: order.paymentResult as PaymentResult,
        },
      }),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json({ ...data, message: `koskesh ${order.user.email}` })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
