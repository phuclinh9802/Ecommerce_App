import React from 'react';
import { useParams, withRouter, Route } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  const params = useParams();
  console.log(params.id);
  return (
    <div className='product-details'>
      <div className='details' key={product.id}>
        <div className='product-image'>
          <img src={product.image} alt={product.title} />
        </div>
        <div className='product-content'>
          <div className="product-row">
            <h2>{product.title}</h2>
            <span>${product.price}</span>
            <span>{product.rating}</span>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProductDetails);