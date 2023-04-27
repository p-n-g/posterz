import React from "react";
import "./Cart.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import CartItem from "../cartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {loadStripe} from "@stripe/stripe-js";
import axiosClient from "../../utils/axiosClient";

function Cart({ closeCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cartSlice.cartItems);
  const isCartEmpty = cartItems.length === 0;

  
  async function handleCheckout(){
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK);

    console.log("cart items: ", cartItems);
    
    const response = await axiosClient.post("/orders", {
      products: cartItems,
    });
    
    console.log("response from stapi (through stripe): ", response);

    stripe.redirectToCheckout({
      sessionId: response.data.stripeId,
    });
  }

  return (
    <div className="Cart">
      <div className="overlay" onClick={closeCart}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-cart center" onClick={closeCart}>
            <div className="close-icon center">
              <AiFillCloseCircle />
            </div>{" "}
            Close
          </div>
        </div>

        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        {isCartEmpty && (
          <div className="empty-cart-info">
            <div className="empty-cart-icon">
              <BsCartX />
            </div>
            <h4>Your cart is empty</h4>
          </div>
        )}

        {!isCartEmpty && (
          <div className="total-amount-detail">
            <div className="total-amount">
              <h3>Total</h3>
              <h3>
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </h3>
            </div>
            <div className="checkout">
              <button className="btn-primary" onClick={handleCheckout}>Checkout Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
