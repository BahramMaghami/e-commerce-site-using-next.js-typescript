import { Button } from './ui/button'
import Link from 'next/link'

const ViewAllProductsButton = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <Button
        nativeButton={false}
        render={<Link href={'search?category=&q='}>View All Products</Link>}
        className={'px-8 py-4 text-lg font-semibold'}
      ></Button>
    </div>
  )
}

export default ViewAllProductsButton
