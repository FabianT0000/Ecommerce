import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./ListProduct.css";
import { useEffect, useState } from "react";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:9090/allproducts");
      const data = await response.json();
      console.log(data);
      setAllProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch("http://localhost:9090/deleteproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchInfo();
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className="list-product">
      <h1>Lista de productos</h1>
      <Container>
        <Row className="mt-4 ">
          <Col className="ms-5 pe-4">Producto</Col>
          <Col className="ms-5 pe-4">Nombre</Col>
          <Col className="ms-5 pe-4">Precio</Col>
          <Col className="ms-5 pe-4">Categoria</Col>
          <Col className="ms-5 pe-4">Eliminar</Col>
        </Row>
        <hr />

        {allProducts.map((product, i) => {
          return (
            <Row key={i} className="mt-4 ">
              <Col className="ms-5 pe-4">
                {" "}
                <img
                  style={{ width: "35px" ,height: "45px" }}
                  src={product.image}
                  alt=""
                />{" "}
              </Col>
              <Col className="ms-5 pe-4" style={{fontSize:"12px"}}>{product.name}</Col>
              <Col className="ms-5 pe-4">${product.price}</Col>
              <Col className="ms-5 pe-4">{product.category}</Col>
              <Col className="ms-5 pe-4">
                <button onClick={()=>{deleteProduct(product.id)}}>⛔</button>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
};

export default ListProduct;
