import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Home from "./components/home/Home";
import Account from "./components/account/Account";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";
import AdminPanel from "./components/admin-panel/AdminPanel";
import shop from "./api/Api";
import { setBasketAction, setProductsAction } from "./store/shopReducer";
import { useTypedSelector } from "./store/hooks/useTypedSelector";
import { IProduct } from "./types/interfaces/IProduct";

interface IBasket {
  [name: number]: number;
}

function App() {
  const basket = useTypedSelector((state) => state.shop.basket);
  const countTotalProducts = (basket: IBasket): number => {
    return Object.values(basket)?.reduce((total, count) => {
      return (total += count);
    }, 0);
  };

  useEffect(() => {
    setTotalProducts(countTotalProducts(basket));
  }, [basket]);
  const [totalProducts, setTotalProducts] = useState(0);
  const dispatch = useDispatch();

  const setProducts = (products : IProduct[]) => {
    dispatch(setProductsAction(products));
  };

  const setLoading = (con: boolean) => {
    dispatch({ type: "SET_LOADING", payload: con });
  };
  const download = () => {
    setLoading(true);
    shop.products.get().then((res) => {
      setProducts(res.result);
      setLoading(false);
    });
  };

  useEffect(download, []);

  useEffect(() => {
    shop.user.getBasket().then((res) => {
      dispatch(setBasketAction(res));
    });
  }, []);

  return (
    
    <BrowserRouter>
      <Navbar total={totalProducts} loading={false}></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/product/:name" element={<Product />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
