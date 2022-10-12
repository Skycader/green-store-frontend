import shop from "../../api/Api.js";
import { useState, useEffect } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
function Home() {
  const dispatch = useDispatch();
  window.dispatch = dispatch
  window.shop = shop
  console.log(shop)
  const state = useSelector(state=>state)
  window.state = state
  const products = useSelector((state) => state.shop.products);
  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };

  const download = () => {
    setLoading(false);
    shop.products.get().then((res) => setProducts(res.result));
  };

  useEffect(download, []);

  const [loading, setLoading] = useState(true);
  
  return (
    <div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col l4 m6 s12">
              <Card
                name={product.name}
                img={product.image}
                description={product.description}
                price={product.price}
              ></Card>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Home;
