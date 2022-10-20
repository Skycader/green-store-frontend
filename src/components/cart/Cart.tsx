import { useState, useEffect } from "react";
import Card from "../card/Card";
import shop from "../../api/Api";
import { setBasketAction } from "../../store/shopReducer";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { IProduct } from "../../types/interfaces/IProduct";

interface IBasket {
  [name: number]: number;
}

const Cart = () => {
  const basket = useTypedSelector((state) => state.shop.basket);
  const products = useTypedSelector((state) => state.shop.products);

  const renderBasket = (basket: IBasket): IProduct[] => {
    if (basket == undefined) return [];
    return Object.keys(basket)
      .map((id: string) => {
        let ID = Number(id)
        let product: IProduct = products.filter((product) => {
          return product.id.toString() == id;
        })[0];

        product.inBasket = basket[ID];

        return product;
      })
      .filter((product) => product.inBasket > 0);
  };

  // window.renderBasket = renderBasket
  const [Basket, setBasket] = useState<IProduct[]>([]);

  const countTotalProducts = (basket: IBasket):number => {
    return Object.values(basket).reduce((total, count) => {
      return (total += count);
    }, 0);
  };

  const countTotalPrice = (basket: IProduct[]):string => {
    let res:number = basket.reduce((total, product) => {
      return (total += product.price * product.inBasket);
    }, 0);
    return res.toFixed(2);
  };

  useEffect(() => {
    if (products.length && Object.keys(basket).length) {
      setBasket(renderBasket(basket));
      setTotalProducts(countTotalProducts(basket));
      setTotalPrice(countTotalPrice(renderBasket(basket)));
    }
  }, [basket]);

  useEffect(() => {
    shop.user.getBasket().then((res) => {
      setBasketAction(res);
    });
  }, []);

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>("");
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
              <div key={product.id} className="col l4 m6 s12">
                {product.inBasket > 0 && (
                  <Card
                    id={product.id}
                    mode="basket"
                    name={product.name}
                    image={product.image}
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
