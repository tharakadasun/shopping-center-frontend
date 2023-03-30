import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../redux/order/OrderSlice";
import SmallCard from "../card/SmallCard";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);



  const handlePlaceOrder = () =>{
    const local_token = localStorage.getItem('token')
    console.log('token:- ',local_token);
    let cart_items = [];
    items.forEach(element => {
      cart_items.push({
        productId: element.id,
        quantity:1
      })
    });
    const cartItemBody = {
      orderItems: cart_items
    }
    if(local_token != null){
      if(items != null){
        console.log("c");
        dispatch(createOrder(cartItemBody))
        navigate("/checkout")
      }else{
        toast.error("Please add items")
      }
    }else{
      toast.error("Please Login !")
    }
  }

  console.log(items);
  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Cart Items
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {items ? (
            <>
              {items.map((item, index) => {
                return <div key={index}><SmallCard {...item}/></div>;
              })}
            </>
          ) : (
            <></>
          )}
          <div className="d-flex flex-row">
              <button aria-label="Close" data-bs-dismiss="offcanvas" onClick={handlePlaceOrder} type="button" className="btn btn-primary flex-fill" data-mdb-ripple-color="dark">
                Place Order
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
