import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';

import './styles.css';
import CardLoader from './CardLoader';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: 2,
        size: 12,
      },
    };

    setIsLoading(true);
    requestBackend(params).then((response) => {
      setPage(response.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container my-4">
      <div className="row catalog-text">
        <h1>Catálogo de produtos</h1>
      </div>
      <div className="row">
        {isLoading ? <CardLoader /> : (page?.content.map((product) => {
          return (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to={"/products/" + product.id}>
                <ProductCard product={product} />
              </Link>
            </div>
          );
        }))}
      </div>
      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default Catalog;
