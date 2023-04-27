import React from 'react'
import productImg from "../../assets/images/pubg.jpg";
import "./Product.scss"
import {useNavigate} from "react-router-dom";

function Product({product}) {
  const navigate = useNavigate();
  return (
    <div className="Product" onClick={() => navigate(`/products/${product.id}`)}>
      <div className="product-content center">
        <div className="product-img">
          <img src={product?.attributes?.image?.data?.attributes?.url} alt="" />
        </div>
      <div className="product-info">
        <p className="title">{product?.attributes?.title}</p>
        <p className="price">₹ {product?.attributes?.price}</p>
      </div>
      </div>
    </div>
  )
}

export default Product