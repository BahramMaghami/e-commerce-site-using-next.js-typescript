import sampleData from "@/db/sample-data"
import ProductList from "@/components/shared/product/product-list"


const Homepage = () => {
  return <> <ProductList data={sampleData.products} title="fhksjhfd" limit={4}></ProductList> </>
}

export default Homepage
