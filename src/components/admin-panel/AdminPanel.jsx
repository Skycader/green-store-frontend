import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import shop from "../../api/Api"
const AdminPanel = () => {
  const products = useSelector((state) => state.shop.products);
  const [modal, showModal] = useState(false);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch()
  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  }

  return (
    <>
      {!modal && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.count}</td>
                  <td>${product.price}</td>
                  <td>{product.image}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      onClick={() => {
                        showModal(true);
                        setProduct(product);
                      }}
                      style={{ display: "flex" }}
                      className="col s12 l5 btn waves-effect waves-light"
                    >
                      <i className="material-icons">create</i>Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {modal && (
        <div>
          <div style={{ height: 100 }}></div>
          <div className="container ">
            <div class="input-field col s6">
              <input
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                value={product.name}
                type="text"
              />
              <label className="active">Name</label>
            </div>
            <div class="input-field col s6">
              <input
                onChange={(e) => {
                  setProduct({ ...product, count: e.target.value });
                }}
                value={product.count}
                type="text"
              />
              <label className="active">Count</label>
            </div>

            <div class="input-field col s6">
              <input
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
                value={product.price}
                type="text"
              />
              <label className="active">Price</label>
            </div>

            <div class="input-field col s6">
              <input
                onChange={(e) => {
                  setProduct({ ...product, image: e.target.value });
                }}
                value={product.image}
                type="text"
              />
              <label className="active">Image</label>
            </div>

            <div class="input-field col s6">
              <input
                onChange={(e) => {
                  setProduct({ ...product, description: e.target.value });
                }}
                value={product.description}
                type="text"
              />
              <label className="active">Description</label>
            </div>

            <div className="row">
              <button onClick={
                ()=>{
                  const {id,name,count,price,image,description} = product
                  shop.user.editProduct(id,name,count,price,image,description)
                  .then( 
                    showModal(false)
                  )
                  shop.products.get().then((res) => {
                    setProducts(res.result);
                  })
                }
              }
                className="col l12 m12 s12 btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Save
                <i class="material-icons right">send</i>
              </button>
              <div className="col s2"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
