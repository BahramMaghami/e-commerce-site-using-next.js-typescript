import ProductList from '@/components/shared/product/product-list'
import {
  getLatestProducts,
  getFeatureProducts,
} from '@/lib/actions/product.action'
import ProductCarousel from '@/components/shared/product/product-carousel'
import ViewAllProductsButton from '@/components/view-all-products'
import IconBoxes from '@/components/icon-boxes'
import DealCountdown from '@/components/deal-countdown'

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
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </>
  )
}

export default Homepage
