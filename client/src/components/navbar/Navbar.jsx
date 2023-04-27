import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { BsCart2 } from "react-icons/bs";
import Cart from "../cart/Cart";
import { useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const categories = useSelector((store) => store.categorySlice.categories);
  const cartItems = useSelector((store) => store.cartSlice.cartItems);

  console.log("Navbar categories: ", categories);
  return (
    <>
      <nav className="Navbar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              {categories.map((category) => (
                <li key={category?.id} className="hover-link">
                  <Link
                    className="link"
                    to={`/category/${category?.attributes.key}`}
                  >
                    {category?.attributes?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/">
              <h1 className="banner">Posterz.</h1>
            </Link>
          </div>
          <div className="nav-right">
            <div
              className="nav-cart hover-link"
              onClick={() => setOpenCart(!openCart)}
            >
              <BsCart2 className="icon" />
              {cartItems.length === 0 ? (
                ""
              ) : (
                <span className="cart-count center">
                  {cartItems.reduce((acc, item) => acc + item?.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      {openCart && <Cart closeCart={() => setOpenCart(false)} />}
    </>
  );
}

export default Navbar;
