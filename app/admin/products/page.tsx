import Link from 'next/link'
import { getAllProducts } from '@/lib/actions/product.action'
import { formatCurrency, formatId } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Pagination from '@/components/shared/pagination'

const AdminProductsPage = async (props: {
  searchParams: Promise<{ page: string; query: string; category: string }>
}) => {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const category = searchParams.category || ''
  const searchText = searchParams.query || ''

  const products = await getAllProducts({ query: searchText, page, category })

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Products</h1>
        <Button
          variant={'default'}
          nativeButton={false}
          render={<Link href={'/admin/products/create'}>Create Product</Link>}
        ></Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead className="w-25">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="flex gap-1">
                <Button
                  variant={'outline'}
                  size={'sm'}
                  nativeButton={false}
                  render={
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  }
                ></Button>
                {/* DELETE */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products.totalPages && products.totalPages > 1 && (
        <Pagination page={page} totalPages={products.totalPages}></Pagination>
      )}
    </div>
  )
}

export default AdminProductsPage
