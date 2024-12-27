import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../items/Item";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Popular = () => {

  const [data_products, setdata_products] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9090/popular').then((response) =>response.json()).then((data) => setdata_products(data));
  }, [])

  return (
    <div id="popular" style={{ width: "90%" }} >
      <h1>Lo mas vendido</h1>
      <hr />
      <div id="popular-item" >
        <Row xs={1} sm={2} md={3} style={{marginLeft:'10%'}} >
          {data_products.map((product, i) => {
            return (
              <Col align="center" style={{marginBottom:'50px'}}>
                <Item
                  key={i}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Popular;
