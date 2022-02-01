import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';
import { Link, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Product} from 'types/product';
import axios from 'axios';

import './styles.css';
import { BASE_URL } from 'util/requests';

type UrlParams = {
  productId: string;
}

const ProductDetails = () => {

  const { productId } = useParams<UrlParams>();

  console.log(productId + "chegou");
 
  const [products, setProducts] = useState<Product>();

  useEffect(() => {
    axios.get(`${BASE_URL}/products/${productId}`)
      .then(response => {
        setProducts(response.data);
      })
  }, [productId]);

  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <div className="goback-container">
          <Link to="/products">
            <ArrowIcon />
            <h2>VOLTAR</h2>
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src={products?.imgUrl}
                alt={products?.name}
              />
            </div>
            <div className="name-price-container">
              <h1>{products?.name}</h1>
              {products && <ProductPrice price={products?.price} />}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="decription-container">
              <h2>Descrição do produto</h2>
              <p>
                {products?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
