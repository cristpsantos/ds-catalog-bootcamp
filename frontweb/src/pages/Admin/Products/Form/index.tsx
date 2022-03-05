import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import Select from 'react-select'

import './styles.css';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const history = useHistory();

  const { productId } = useParams<UrlParams>();
  const isEditing = productId !== 'create';

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ] 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if(isEditing) {
      requestBackend({ url: `/products/${productId}`})
        .then((response) => {
          const products = response.data as Product;
          setValue('name', products.name);
          setValue('price', products.price);
          setValue('description', products.description);
          setValue('imgUrl', products.imgUrl);
          setValue('categories', products.categories);
        })
    }
  },[isEditing, productId, setValue])

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl: isEditing ? formData.imgUrl :
        'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg',
      categories: isEditing ? formData.categories : [{ id: 1, name: '' }],
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}`: '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      history.push("/admin/products");
    });
  };

  const handleCancel = () => {
    history.push("/admin/products");
  }

  return (
    <div className="product-card-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                  <Select
                    options={options}
                    isMulti 
                    classNamePrefix={"product-crud"}
                  />
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço"
                  name="price"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
            onClick={handleCancel} 
            className="btn btn-outline-danger product-crud-buttom">
              CANCELAR
            </button>
            <button className="btn btn-primary product-crud-buttom text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
