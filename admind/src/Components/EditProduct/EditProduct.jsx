import { useState } from "react";
import "./EditProduct.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditProduct = () => {
  const [idProduct, setIdProduct] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  // const changeHandler = (e) => {
  //   setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("id:", idProduct);
  };
  const Search_product = async () => {
    // console.log(productDetails);

    try {
      const response = await fetch(
        `http://localhost:9090/editproduct/${idProduct}`
      );
      // if(!response.ok){
      //   throw new Error('No se pudo obtener')
      // }
      const data = await response.json();
      
      console.log(data);
      setProductDetails(data);
    } catch (err) {
      console.error("Error al obtener el producto", err);
    }
  };



  return (
    <div className="edit-product">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            name="idProduct"
            placeholder="Ingresa id para buscar"
            value={idProduct}
            onChange={(e) => setIdProduct(e.target.value)}
          />
          <Button
            className="mt-3"
            variant="success"
            type="submit"
            onClick={Search_product}
          >
            Buscar
          </Button>
        </Form.Group>
      </Form>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Titulo del producto</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Ingresa el titulo"
            // value={productDetails.name}
            // onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder="Ingresa el precio"
            // value={productDetails.price}
            // onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            // aria-label="Default select example"
            name="category"
            // value={productDetails.category}
            // onChange={changeHandler}
          >
            <option>Seleccionar</option>
            <option value="men">Hombre</option>
            <option value="women">Mujer</option>
            <option value="kid">Niños</option>
          </Form.Select>
        </Form.Group>
        {/* <Form.Group className="mb-5">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" name="image" onChange={imageHandler} />
        </Form.Group> */}
      </Form>
      <Button
        variant="success"
        type="submit"
        onClick={() => {
          console.log("editar");
        }}
      >
        Editar
      </Button>
    </div>
  );
};
export default EditProduct;
