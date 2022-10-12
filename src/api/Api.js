import API_URL from "../constants/API_URL.js";

class Api {
  constructor() {
    this.url = API_URL;
  }

  async post(url, body) {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const content = await rawResponse.json();
    return content;
  }

  async api(body) {
    return await this.post(this.url + "api", body);
  }
}

class Products extends Api {
  async get() {
    return await this.api({ method: "getProducts" });
  }
}

class Basket extends Api {}

class User extends Api {
  name = "";
  password = "";
  signedIn = localStorage.getItem("user") ? true : false;
  async signUp(name, password) {
    let result = await this.api({
      method: "addUser",
      data: { name, password },
    });

    if (result.result == "OK") {
      // alert("REGISTRATION SUCCESSFUL")
      return new Promise((res, rej) => {
        res("OK");
      });
     
    } else {
      alert(result.result);
      return result;
    }
  }

  async signIn(name, password) {
    let result = await this.api({ method: "signIn", data: { name, password } });
    if (result.result === "OK") {
      localStorage.setItem("user", JSON.stringify({ name, password }));
      this.signedIn = true;
      this.name = name;
      this.password = password;
      return new Promise((res, rej) => {
        res("OK");
      });
    }
    alert(result.result);
    return "FAIL: " + result.result;
  }

  signOut() {
    localStorage.removeItem("user");
    this.signedIn = false;
    this.name = "";
    this.password = "";
    return "OK";
  }
}

const shop = {
  user: new User(),
  basket: new Basket(),
  products: new Products(),
};

export default shop;
