import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeItem } from "../../redux/cart/cartSlice";

function SmallCard(props) {
  const dispatch = useDispatch();
  const handleCartRemove = () =>{
    toast.error("Remove product"+ props.productName)
    dispatch(removeItem(props.id))
  }
  return (
    <div>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.imageURL}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.productName}</h5>
              <p className="card-text">{props.perUnitPrice}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                    <button onClick={handleCartRemove} className="btn btn-danger">Remove</button>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
