import ContentLoader from 'react-content-loader'

const ProductDetailsLoader = () => (
  <ContentLoader viewBox="0 0 280 280" height={280} width={280}>
    <rect x="3" y="3" rx="10" ry="10" width="280" height="180" />
  </ContentLoader>
)

ProductDetailsLoader.metadata = {
  name: 'RJavlonbek',
  github: 'RJavlonbek',
  description: 'Blog item',
  filename: 'BlogItem',
}

export default ProductDetailsLoader;