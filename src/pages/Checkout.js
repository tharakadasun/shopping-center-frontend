import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutTable from "../components/table/CheckoutTable";
import { addItems } from "../redux/cart/cartSlice";
import { updateOrder } from "../redux/order/OrderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, orderDetails } = useSelector((state) => state.order);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const handleSubmit = ()=>{
    if(paymentMethodId != null){
      dispatch(updateOrder({
        id: orderDetails.id,
        paymentId : paymentMethodId
      }))
      navigate("/")
    }else{
      toast.error("please select payment method")
    }
    
  }
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <section className="h-100 h-custom">
            <div className="container h-100 py-5">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col">
                  <div className="table-responsive">
                    <CheckoutTable items={orderDetails.orderItems}/>
                  </div>
                  <div
                    className="card shadow-2-strong mb-5 mb-lg-0"
                    style={{ borderRadius: "16px" }}
                  >
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                          <form>
                            <div className="d-flex flex-row pb-3">
                              <div className="d-flex align-items-center pe-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="radioNoLabel"
                                  id="radioNoLabel1v"
                                  // value=""
                                  onClick={()=>setPaymentMethodId(2)}
                                  aria-label="..."
                                />
                              </div>
                              <div className="rounded border w-100 p-3">
                                <p className="d-flex align-items-center mb-0">
                                  <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>
                                  Credit Card
                                </p>
                              </div>
                            </div>
                            <div className="d-flex flex-row pb-3">
                              <div className="d-flex align-items-center pe-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="radioNoLabel"
                                  id="radioNoLabel2v"
                                  onClick={()=>setPaymentMethodId(3)}
                                  aria-label="..."
                                />
                              </div>
                              <div className="rounded border w-100 p-3">
                                <p className="d-flex align-items-center mb-0">
                                  <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>
                                  Debit Card
                                </p>
                              </div>
                            </div>
                            <div className="d-flex flex-row">
                              <div className="d-flex align-items-center pe-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="radioNoLabel"
                                  id="radioNoLabel3v"
                                  // value=""
                                  onClick={()=>setPaymentMethodId(1)}
                                  aria-label="..."
                                />
                              </div>
                              {orderDetails.isLoanActive ? (<>
                                <div className="rounded border w-100 p-3">
                                <p className="d-flex align-items-center mb-0">
                                  <i className="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>
                                  Buy Now And Pay Late
                                </p>
                              </div>
                              </>):(<></>)}
                            </div>
                          </form>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                          <div
                            className="d-flex justify-content-between"
                            style={{ fontWeight: "500" }}
                          >
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">Rs. {orderDetails.totalAmount}</p>
                          </div>

                          <div
                            className="d-flex justify-content-between"
                            style={{ fontWeight: "500" }}
                          >
                            <p className="mb-0">Shipping</p>
                            <p className="mb-0">free</p>
                          </div>

                          <hr className="my-4" />

                          <div
                            className="d-flex justify-content-between mb-4"
                            style={{ fontWeight: "500" }}
                          >
                            <p className="mb-2">Total (tax included)</p>
                            <p className="mb-2">Rs. {orderDetails.totalAmount}</p>
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary btn-block btn-lg"
                            onClick={handleSubmit}
                          >
                            <div className="d-flex justify-content-between">
                              <span>Checkout Rs. {orderDetails.totalAmount} </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Checkout;
