import React from "react";
import "./Item.css";
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom';



const Item = (props) => {
  console.log(props);
  return (
    <Card style={{ width: "90%" }}>
      
      <Link to={`/product/${props.id}`}>
      <Card.Img  style={{height:"300px"}} id='item' variant="top" src={props.image} />
      </Link>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
      <Card.Body>
        <Card.Text>${props.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Item;
