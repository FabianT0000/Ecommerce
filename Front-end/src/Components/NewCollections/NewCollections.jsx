import React, { useEffect, useState } from "react";
import Item from "../items/Item";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./NewCollections.css";

const NewCollections = () => {

  const [new_collection, setnew_collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9090/newcollection').then((response) =>response.json()).then((data) => setnew_collection(data));
  }, [])
  

  return (
    <div id="newCollection" style={{ width: "90%" }}>
      <h1>Nuevas colecciones</h1>
      <hr />
      <div id="newCollection-item">
        <Row xs={1} sm={2} md={3} style={{ marginLeft: "10%" }}>
          {new_collection.map((product, i) => {
            return (
              <Col align="center" style={{ marginBottom: "50px" }}>
                <Item
                  key={i}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  // old_price={product.old_price}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default NewCollections;
