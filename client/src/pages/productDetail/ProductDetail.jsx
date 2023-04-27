import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pubgImg from "../../assets/images/pubg.jpg";
import axiosClient from "../../utils/axiosClient";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, removeFromCart} from "../../redux/slice/cartSlice";
import mapCartItemOutput from "../../utils/mapCartItemOutput";

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cartSlice.cartItems);

  const [productDetail, setProductDetail] = useState(null);
  const cartItemInput = mapCartItemOutput(productDetail);
  console.log("cartItemInput ", cartItemInput);

  async function fetchData(){
    const productDetailResponse = await axiosClient.get(`/products/${params.productId}?populate=image`);
    setProductDetail(productDetailResponse.data.data);
    console.log("productDetail response",productDetailResponse);
  }

  useEffect(() => {
    fetchData();
  }, [params]);


  console.log("CART ", cartItems);

  console.log("NO OF ITEMS IN CART: ",cartItems.reduce((acc, item) => {
    console.log("CART QUANTITY ",item?.quantity);
    return item?.quantity + acc;
  }, 0));


  // console.log(params);
  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <img src={productDetail?.attributes?.image?.data?.attributes?.url} alt="" />
          </div>

          <div className="product-info">
            <h1 className="heading">
              {productDetail?.attributes?.title}
            </h1>
            <h3 className="price">₹ {productDetail?.attributes?.price}</h3>
            <p className="description">
              {productDetail?.attributes?.desc}
            </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span className="btn increment" onClick={() => dispatch(removeFromCart(cartItemInput))}>-</span>
                <span className="quantity">{cartItems.filter(item => {
                  console.log(item.id, " ",  productDetail?.id);
                  return item.id === productDetail?.id;
                })[0]?.quantity || 0}</span>
                <span className="btn decrement" onClick={() => dispatch(addToCart(cartItemInput))}>+</span>
              </div>
              <button className="add-to-cart btn-primary" onClick={() => dispatch(addToCart(cartItemInput))}>Add To Cart</button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                Products may not be eligible for return in some cases, including cases of buyer's remorse such as incorrect model or color of product ordered or incorrect product ordered.
                </li>
                <li>
                Products may be eligible for replacement only if the same seller has the exact same item in stock.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
