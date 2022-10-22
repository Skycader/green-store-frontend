import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import shop from "../../api/Api";
import Card from "../card/Card";
import { IProduct } from "../../types/interfaces/IProduct";
const Product = () => {
  const [product, setProduct] = useState<IProduct>(
    {
      id: 0,
      name:  "",
      count: 0,
      price: 0,
      image: "",
      description: "",
      inBasket: 0
    }
  )
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  useEffect(() => {
    shop.products
      .getProductByName(name?.replaceAll("-", " ")!)
      .then((res) => setProduct(res.result[0]));
  }, []);

  return (
    <div className="row">
      <div className="col l6 m6 s12">
        <Card
          id={product.id}
          inBasket={0}
          mode={"details"}
          name={product.name}
          image={product.image}
          description={product.description}
          price={product.price}
          count={product.count}
        ></Card>
      </div>
    </div>
  );
};

export default Product;
