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
  async getProductByName(name) {
    return await this.api({ method: "getProductByName", data: {name} });
  }
}

class User extends Api {
   
  name = JSON.parse(localStorage.getItem("user"))?.name || ""
  password = JSON.parse(localStorage.getItem("user"))?.password || ""
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

  async getBasket() {
    let res = await this.api({ method: "getBasket", data: {name: this.name}});
    if (res.result.length == 0) return {}
    res = res.result[0].basket
    console.log("RES",res)
    res = JSON.parse(res)
    return res
  }

  async manipulateBasket(id,quantity) {
    let res = await this.api({ method: "manipulateBasket", data: {id,name: this.name, password: this.password, quantity} });
    if (res.result == "FAIL: NOT ENOUGH PRODUCTS") return "FAIL: NOT ENOUGH PRODUCTS"
    res = JSON.parse(res.result)
    return res
  }

  async editProduct(id,name,count,price,image,description) {
    return await this.api({method: "editProduct", data: {id,name,count,price,image,description,password: this.password}})
  }
}

const shop = {
  user: new User(),
  products: new Products(),
};

export default shop;
