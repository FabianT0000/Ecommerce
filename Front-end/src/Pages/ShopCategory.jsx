import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/items/Item";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category" style={{ width:'100%' }}>

      <div className="shopcategory-sort" style={{marginLeft:'5%',marginTop:'15px' ,marginBottom:'30px' }}>
        La mejor colección que encontraras para tí 
      </div>

      <Row xs={1} sm={2} md={3} className="m-5">
        {all_product.map((product, i) => {
          if (props.category === product.category) {
            return (
              <Col align="center" style={{  marginBottom:'30px' ,width:"280px",height:"430px"}} >
                <Item
                  key={i}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                 
                />
              </Col>
            );
          } else {
            return null;
          }
        })}
      </Row>
    </div>
  );
};
export default ShopCategory;
