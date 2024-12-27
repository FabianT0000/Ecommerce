import { useState } from "react";
import "./AddProduct.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddProduct = () => {
  const [image, setImage] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_product = async () => {
    // console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:9090/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:9090/addproduct', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
          data.success ? alert("Producto agregado") : alert("Fallo");
         });
    }
  };

  return (
    <div className="add-product">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Titulo del producto</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Ingresa el titulo"
            value={productDetails.name}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder="Ingresa el precio"
            value={productDetails.price}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            // aria-label="Default select example"
            name="category"
            value={productDetails.category}
            onChange={changeHandler}
          >
            <option>Seleccionar</option>
            <option value="men">Hombre</option>
            <option value="women">Mujer</option>
            <option value="kid">Niños</option>
          </Form.Select>

        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" name="image" onChange={imageHandler} />
        </Form.Group>
      </Form>
      <Button
        variant="success"
        type="submit"
        onClick={() => {
          Add_product();
        }}
      >
        Agregar
      </Button>
    </div>
  );
};

export default AddProduct;
