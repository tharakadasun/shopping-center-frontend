import React from "react";

function CheckoutTable({items}) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="h5">
              Shopping Items
            </th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item,index)=>(
            <tr key={index}>
            <th scope="row">
              <div className="d-flex align-items-center">
                <img
                  src={item.product.imageName}
                  className="img-fluid rounded-3"
                  style={{ width: "120px" }}
                  alt="ecom"
                />
                <div className="flex-column ms-4">
                  <p className="mb-2">{item.product.productName}</p>
                </div>
              </div>
            </th>
            <td className="align-middle">
              <div className="d-flex flex-row">
                <span>{item.quantity}</span>
              </div>
            </td>
            <td className="align-middle">
              <p className="mb-0" style={{ fontWeight: "500" }}>
              Rs. {item.product.perUnitPrice}
              </p>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CheckoutTable;
