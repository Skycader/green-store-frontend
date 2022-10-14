import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "../card/Card";
import shop from "../../api/Api";
const Cart = () => {
  const basket = useSelector((state) => state.shop.basket);
  const products = useSelector((state) => state.shop.products);
  const dispatch = useDispatch();
  window.basket = basket;
  window.products = products;

  const renderBasket = () => {
    return Object.keys(basket)
      .map((id) => {
        let product = products.filter((product) => {
          return product.id == id;
        })[0];
        product.inBasket = basket[id];
        return product;
      })
      .filter((product) => product.inBasket > 0);
  };

  // window.renderBasket = renderBasket
  const [Basket, setBasket] = useState([]);
  window.Basket = Basket;
  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };

  const countTotalProducts = (basket) => {
    return Object.values(basket).reduce((total, count) => {
      return (total += count);
    }, 0);
  };

  const countTotalPrice = (basket) => {
    console.log("BASKET: ",basket)
    let res = basket.reduce((total, product) => {
      return (total += product.price * product.inBasket);
    }, 0);
    return res
  };

  useEffect(() => {
    if (products.length && Object.keys(basket).length) {
      setBasket(renderBasket());
      setTotalProducts(countTotalProducts(basket));
      setTotalPrice(countTotalPrice(renderBasket()));
    }
  }, [basket]);

  useEffect(() => {
    shop.user.getBasket().then((res) => {
      dispatch({ type: "SET_BASKET", payload: res });
    });
  }, []);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <>
      <footer className="page-footer green">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">
                <i className="material-icons">shopping_cart</i> Your cart
                <br></br>
                <br></br>
                <i className="material-icons">view_list</i>Total products:{" "}
                {totalProducts} kg<br></br>
                <i className="material-icons">credit_card</i>Total price: $
                {totalPrice}
              </h5>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <h4 className="container">Your product list</h4>
        </div>
      </footer>

      <div>
        <div className="row">
          {Object.keys(basket).length > 0 ? (
            Basket?.map((product) => (
              <div className="col l4 m6 s12">
                {product.inBasket > 0 && (
                  <Card
                    id={product.id}
                    mode="basket"
                    name={product.name}
                    img={product.image}
                    inBasket={product.inBasket}
                    count={product.count}
                    description={product.description}
                    price={product.price}
                  ></Card>
                )}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
