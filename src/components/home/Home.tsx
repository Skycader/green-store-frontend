import { useEffect } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
function Home() {
  const dispatch = useDispatch();
  const products = useTypedSelector((state) => state.shop.products);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  return (
    <div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col l4 m6 s12">
              <Card
                id={product.id}
                inBasket={0}
                mode="home"
                name={product.name}
                image={product.image}
                description={product.description}
                price={product.price}
                count={product.count}
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
