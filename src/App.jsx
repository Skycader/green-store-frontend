import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Account from "./components/account/Account";
import Navbar from "./components/navbar/Navbar"
import About from "./components/about/About"

function App() {
  return (
    <BrowserRouter>
    <Navbar loading={false}></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
