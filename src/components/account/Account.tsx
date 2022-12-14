import { useState, useEffect, FC } from "react";
import shop from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Account:FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = () => {
    if (localStorage.getItem("user") !== null) {
      let user_string = localStorage.getItem("user")
      let user = {name: "", password: ""}
      if (user_string) user = JSON.parse(user_string)
      setName(user.name);
      setPassword(user.password);
      shop.user.getBasket().then((res) => {
        console.log(res)
        dispatch({ type: "SET_BASKET", payload: res });
      });
    }
  };


  useEffect(user, []);
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  useEffect(() => {
    shop.user.getBasket().then((res) => {
      dispatch({ type: "SET_BASKET", payload: res });
    });
  }, []);

  return (
    <>
      {localStorage.getItem("user") !== null && (
        <footer className="page-footer green">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Welcome, {name}!</h5>
                <p className="grey-text text-lighten-4">
                  <button
                    onClick={() => {
                      shop.user.signOut();
                      dispatch({ type: "SET_BASKET", payload: {} });
                      dispatch({ type: "SET_TOTAL_PRODUCTS", payload: 0 });
                      setName("");
                    }}
                    className="col s12 l5 btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Sign out
                  </button>
                   <div className="col s1"></div>
                  {name == "admin" && (
                    <button
                      onClick={() => {navigate("/admin-panel")}}
                      className="col s12 l5 btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Admin panel
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">Enjoy fresh food!</div>
          </div>
        </footer>
      )}
      {localStorage.getItem("user") === null && (
        <>
          <div style={{ height: 100 }}></div>
          <div className="container ">
            <div className="input-field col s6">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />
              <label>Your name</label>
            </div>
            <div className="input-field col s6">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              <label>Your password</label>
            </div>

            <div className="row">
              <button
                onClick={() => {
                  shop.user
                    .signUp(name, password)
                    .then(() => shop.user.signIn(name, password))
                    .then(() => { navigate("/account")});
                }}
                className="col s12 l5 btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Create account
                <i className="material-icons right">send</i>
              </button>
              <div className="col s2"></div>
              <button
                onClick={() => {
                  shop.user
                    .signIn(name, password)
                    .then(() => {user(); navigate("/account")});
                }}
                className="col l5 s12 btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Sign in
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
