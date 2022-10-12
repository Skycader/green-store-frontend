import Style from "./navbar.module.css";
import {Link} from 'react-router-dom'
import {useRef} from "react"
const Navbar = (props) => {
  const searchBar = useRef()
  window.searchBar = searchBar
  return (
<>
    {props.loading && (
      <div
        style={{ margin: 0, position: "absolute", zIndex: 1 }}
        className="progress"
      >
        <div className="indeterminate"></div>
      </div>
    )}

    <nav className={Style.navbar}>
      <div style={{ background: "rgb(51 192 51)" }} className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          <span className={Style.span}>🍎 Green Store</span>
        </Link>
        <ul
          style={{ transform: "translateX(20px)" }}
          id="nav-mobile"
          className="right"
        >
          <li>
            <Link to="/about">About</Link>
          </li>
          <li onClick={()=>{searchBar.current.focus()}} className={Style.searchBar}>
            <form>
              <div className="input-field">
                <input
                  className={Style.greenSearch}
                  id="search"
                  ref={searchBar}
                  type="search"
                  required
                ></input>
                <label className="label-icon">
                  <i className="material-icons">search</i>
                </label>
               
              </div>
            </form>
          </li>
          <li style={{ display: "flex" }}>
            <Link to="/cart" style={{ paddingRight: 0, width: 65 }}>
              <i className="material-icons">shopping_cart</i>
            </Link>
            <div className={Style.total}>0</div>
          </li>
          <li style={{ transform: "translate(-20px,0)" }}>
            <Link to="/account">
              <i className="material-icons">person</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <div className={Style.space}></div>
    </>
  );
};

export default Navbar;
