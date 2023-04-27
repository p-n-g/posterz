import React from "react";
import cartItemImg from "../../assets/images/pubg.jpg";
import "./CartItem.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, removeWholeItem } from "../../redux/slice/cartSlice";

function CartItem({item}) {
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cartSlice.cartItems);

  console.log("CARTITEM", item);

  return (
    <div className="CartItem">
      <div className="cart-item-detail">
        <div className="cart-item-img">
          <img src={item.imgURL} alt="" />
        </div>
        <div className="cart-item-info">
          <div className="cart-item-info-left">
            <h3>{item.title}</h3>
            <p>₹ {item.price}</p>
            <div className="quantity-selector">
              <span className="btn increment" onClick={() => dispatch(removeFromCart(item))}>-</span>
              <span className="quantity">{cartItems.filter(cartItem => cartItem.id === item?.id)[0]?.quantity || 0}</span>
              <span className="btn decrement"  onClick={() => dispatch(addToCart({attributes: item, id: item.id}))}>+</span>
            </div>
            <p>₹ { item.price * item.quantity}</p>
          </div>
          <div className="cart-item-remove" onClick={() => dispatch(removeWholeItem(item))}>
            <AiOutlineClose />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
