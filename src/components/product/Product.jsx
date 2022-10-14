import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import shop from "../../api/Api.js";
import Card from "../card/Card";
const Product = () => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  useEffect(() => {
    shop.products
      .getProductByName(name.replaceAll("-", " "))
      .then((res) => setProduct(res.result[0]));
  }, []);

  return (
    <div className="row">
      <div className="col l6 m6 s12">
        <Card
          mode={"details"}
          name={product.name}
          img={product.image}
          description={product.description}
          price={product.price}
          count={product.count}
        ></Card>
      </div>
    </div>
  );
};

export default Product;
