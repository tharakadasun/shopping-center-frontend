import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productFetchById } from "../redux/product/productSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { addItems } from "../redux/cart/cartSlice";
function isTokenExpired(token) {
  const decodedToken = jwt_decode(token);
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = new Date().getTime();
  return expirationTime < currentTime;
}
function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.products);
  useEffect(() => {
    const token_local = localStorage.getItem("token");
    console.log(token_local);
    if (token_local != null) {
      if (isTokenExpired(token_local)) {
        navigate("/sign-in");
      } else {
        const product = localStorage.getItem("productItem");
        if (product != null) {
          dispatch(productFetchById(product));
        }
      }
    } else {
      navigate("/sign-in");
    }
  }, []);
  return (
    <>
      {product ? (
        <>
          <div className="container py-4">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-5 col-md-5 col-sm-6">
                    <div className="white-box text-center">
                      <img
                        src={product.imageURL}
                        className="img-responsive"
                        alt="product"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-6">
                    <h3 className="card-title">{product.productName}</h3>
                    <h4 className="box-title mt-5">Product description</h4>
                    <p>{product.description}</p>
                    <h2 className="mt-5">
                      Rs.{product.perUnitPrice}
                      <small className="text-success"></small>
                    </h2>
                    <button
                      className="btn btn-dark btn-rounded"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Add to cart"
                    >
                      <AiOutlineShoppingCart />
                    </button>
                    <button className="btn btn-primary btn-rounded ml-2">
                      Buy Now
                    </button>
                    <h3 className="box-title mt-5">Key Highlights</h3>
                    <ul className="list-unstyled">
                      <li>
                        <i className="fa fa-check text-success"></i>Sturdy
                        structure
                      </li>
                      <li>
                        <i className="fa fa-check text-success"></i>Designed to
                        foster easy portability
                      </li>
                      <li>
                        <i className="fa fa-check text-success"></i>Perfect
                        furniture to flaunt your wonderful collectibles
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3 className="box-title mt-5">General Info</h3>
                    <div className="table-responsive">
                      <table className="table table-striped table-product">
                        <tbody>
                          <tr>
                            <td width="390">Brand</td>
                            <td>{product.brand.brandName.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            <td>
                              {product.category.categoryName.toUpperCase()}
                            </td>
                          </tr>
                          <tr>
                            <td>Shipping Info</td>
                            <td>Free Shipping</td>
                          </tr>
                          <tr>
                            <td>Payment Method</td>
                            {product.isLoanActive ? (
                              <td>Buy Now and Pay Late, Buy It Now</td>
                            ) : (
                              <td>Buy It Now</td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProductDetail;
