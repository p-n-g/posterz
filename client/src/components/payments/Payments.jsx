import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Payments.scss";
import { clearCart } from "../../redux/slice/cartSlice";

function Payments() {
  const params = useParams();
  const status = params.status;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  if(status === "success"){
    dispatch(clearCart());
  }

  const statusInfo = {
    success: {
      message: "Your order has been placed",
      cta: "Shop More",
      icon: <BsFillCartCheckFill />,
    },
    failed: {
      message: "Failed to place your last order",
      cta: "Try Again",
      icon: <BiErrorCircle />,
    },
  };

  return (
    <div className="Payments">
      <div className="container">
        <div className="payment-info">
          <div className="icon">{statusInfo[status].icon}</div>
          <h3 className="message">{statusInfo[status].message}</h3>
          <button className="btn-primary" onClick={() => navigate("/")}>{statusInfo[status].cta}</button>
        </div>
      </div>
    </div>
  );
}

export default Payments;
