import Style from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import shop from "../../api/Api";
const Card = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };

  const editCart = (add) => {
    shop.user.manipulateBasket(props.id, props.inBasket + add).then((res) => {
      if (res.status == "OK") {
        shop.products.get().then((res) => {
          setProducts(res.result);
        });
        
        shop.user.getBasket().then((res) => {
          dispatch({ type: "SET_BASKET", payload: res });
        });
        
        
      } else {
        alert("NO MORE PRODUCT AVAILABLE!");
      }
    });
  };

  const toProduct = () => {
    if (props.productMode == 0)
      dispatch({ type: "SET_LOADING", payload: true });
    setTimeout(
      () =>
        navigate("/product/" + props.name.replaceAll(" ", "-").toLowerCase()),
      400
    );
  };
  return (
    <div className={Style.card + " card waves-effect waves-light"}>
      <div onClick={toProduct} className="card-image">
        <img
          onLoad={() => {
            // dispatch({ type: "ADD_IMAGE", payload: props.name });
          }}
          src={props.img}
        ></img>
        <span className="card-title">
          <span className={Style.cardTitle}>{props.name}</span>
        </span>
        {(props.mode == "home" && props.count>0) && (
          <a
            onClick={(e) => {
              e.stopPropagation();
              editCart(1);
            }}
            className={
              Style.addButton + " btn-floating halfway-fab waves-effect green"
            }
          >
            <i className={Style.add + " material-icons"}>add</i>
          </a>
        )}

        {/* <Link to={"/product/"+props.name.replaceAll(" ","-").toLowerCase()} */}
      </div>

      <div
        style={{ display: "flex"}}
        className="card-content left"
      >
        <div>
          <a className="waves-effect waves-light btn-small">${props.price}</a>
          {props.mode !== "basket" && (
            <span style={{ marginLeft: 10 }}>{props.description}</span>
          )}
        </div>
        <div>
          {props.mode !== "home" && (
            <div>
              <a
                style={{ display: "flex" }}
                className="waves-effect waves-light btn-small"
              >
                <i className="material-icons">inbox</i>
                <span> {props.count} kg</span>
              </a>
            </div>
          )}
        </div>

        {props.mode == "basket" && (
          <div>
            <a
              style={{ display: "flex" }}
              className="waves-effect waves-light btn-small"
            >
              <i className="material-icons">shopping_basket</i>{" "}
              <div>${(props.price*props.inBasket).toFixed(2)}</div>
            </a>
          </div>
        )}
      </div>

      <div className="card-content right">
        {props.mode == "basket" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => {
                editCart(1);
              }}
              className="btn waves-effect waves-light"
            >
              +
            </button>

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ textAlign: "center", width: "50px", fontSize: 20 }}
            >
              {props.inBasket}
            </div>

            <button
              onClick={() => {
                editCart(-1);
              }}
              className="btn waves-effect waves-light"
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
