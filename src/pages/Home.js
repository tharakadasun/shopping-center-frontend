import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../components/card/ItemCard";
import { addItems } from "../redux/cart/cartSlice";
import { productFetch } from "../redux/product/productSlice";

function Home() {
  const dispatch = useDispatch();
  const {loading,products} = useSelector((state) => state.products);
  console.log(products);

  useEffect(() => {
    const product = localStorage.getItem("productItem");
    if(product !=null){
      localStorage.removeItem("productItem");
    }
    dispatch(productFetch())
  }, [dispatch]);
  return (
    <div className="container-md py-4">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {loading ? (
          <>
            <p>Product Not Found</p>
          </>
        ) : (
          <>
            {products != null ? (
              <>
                {products.map((item,index) => {
                  return (
                      <div key={index} className="col" >
                        <ItemCard {...item}/>
                      </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
