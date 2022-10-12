import { useState, useEffect } from "react";
import shop from "../../api/Api.js";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  window.navigate = navigate;

  const user = () => {
    if (localStorage.getItem("user") !== null) {
      let user = JSON.parse(localStorage.getItem("user"));
      setName(user.name);
      setPassword(user.password);
    }
  };

  useEffect(user, []);
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
                      setName("");
                    }}
                    class="col s12 l5 btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Sign out
                  </button>
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
            <div class="input-field col s6">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />
              <label>Your name</label>
            </div>
            <div class="input-field col s6">
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
                    .then(() => shop.user.signIn(name,password))
                    .then(()=>navigate("/account"))
                }}
                class="col s12 l5 btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Create account
                <i class="material-icons right">send</i>
              </button>
              <div className="col s2"></div>
              <button
                onClick={() => {
                  shop.user
                    .signIn(name, password)
                    .then(() => navigate("/account"));
                }}
                class="col l5 s12 btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Sign in
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
