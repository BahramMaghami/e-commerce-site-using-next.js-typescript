import ProductList from '@/components/shared/product/product-list'
import {
  getLatestProducts,
  getFeatureProducts,
} from '@/lib/actions/product.action'
import ProductCarousel from '@/components/shared/product/product-carousel'

const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  const featureProducts = await getFeatureProducts()

  return (
    <>
      {featureProducts.length > 0 && <ProductCarousel data={featureProducts} />}{' '}
      <ProductList
        data={latestProducts}
        title="Newest Arrivals"
        limit={4}
      ></ProductList>{' '}
    </>
  )
}

export default Homepage
