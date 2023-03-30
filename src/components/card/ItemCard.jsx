import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../redux/cart/cartSlice";

function ItemCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = () =>{
    dispatch(addItem({...props}))
  }
  const handleView = () =>{
    localStorage.setItem("productItem",props.id);
    navigate("/product-detail")
  }
  return (
    <>
      <div className="card">
          <img src={props.imageURL}
            className="card-img-top" alt="Laptop" />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="small"><a href="#!" className="text-muted">{props.category.categoryName}</a></p>
              <p className="small text-danger">{props.brand.brandName}</p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">{props.productName}</h5>
              <h5 className="text-dark mb-0">{props.perUnitPrice}</h5>
            </div>
            <div className="d-flex flex-row mb-1">
              <button onClick={handleAddToCart} type="button" className="btn btn-primary flex-fill" data-mdb-ripple-color="dark">
                Add To Cart
              </button>
            </div>
            <div className="d-flex flex-row">
              <button onClick={handleView} type="button" className="btn btn-success flex-fill" data-mdb-ripple-color="dark">
                View Details
              </button>
            </div>
          </div>
        </div>
    </>
  );
}

export default ItemCard;
