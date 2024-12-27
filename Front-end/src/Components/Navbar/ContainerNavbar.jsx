import React, { useContext, useState } from "react";
import "./Navbar.css";

import logoquick from "../Assets/logoquick.png";
import cart_icon from "../Assets/cart_icon.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const ContainerNavbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartProducts } = useContext(ShopContext);

  return (
    <Navbar expand="sm" className="bg-body-tertiary ">
      <Container fluid>
        <Image src={logoquick} fluid />
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "90px", marginLeft: "20px" }}
            navbarScroll
          >
            <Nav.Link
              id="btn"
              as={NavLink}
              to="/"
              onClick={() => {
                setMenu("shop");
              }}
            >
              Shop{menu === "shop" ? <hr></hr> : <> </>}
            </Nav.Link>

            <Nav.Link
              id="btn"
              as={NavLink}
              to="/mens"
              onClick={() => {
                setMenu("mens");
              }}
            >
              Hombres{menu === "mens" ? <hr></hr> : <> </>}
            </Nav.Link>
            <Nav.Link
              id="btn"
              as={NavLink}
              to="/womens"
              onClick={() => {
                setMenu("womens");
              }}
            >
              {" "}
              Mujeres{menu === "womens" ? <hr></hr> : <> </>}
            </Nav.Link>
            <Nav.Link
              id="btn"
              as={NavLink}
              to="/kids"
              onClick={() => {
                setMenu("kids");
              }}
            >
              Niños{menu === "kids" ? <hr></hr> : <> </>}
            </Nav.Link>
          </Nav>
          <NavLink to="/login">
            {localStorage.getItem("auth-token") ? (
              <Button
                style={{ marginRight: "40px" }}
                variant="outline-success"
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
              >
                Cerrar sesión
              </Button>
            ) : (
              <Button variant="outline-success" style={{ marginRight: "40px" }}>
                Iniciar Sesión
              </Button>
            )}
          </NavLink>

          <div id="nav-cart">
            <NavLink to="/cart">
              <Image src={cart_icon} fluid />
            </NavLink>
            <div id="nav-cart-count">{getTotalCartProducts()}</div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ContainerNavbar;
