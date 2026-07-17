'use server'

import { prisma } from '../prisma'
import { convertToPlainObject } from '@/lib/utils'
import { LATEST_PRODUCTS_LIMIT } from '../constants'

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  })

  return convertToPlainObject(data)
}
