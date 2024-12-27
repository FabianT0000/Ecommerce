import React from "react";

import { NavLink} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoquick from "../../assets/logoquick.png";
import navProfile from '../../assets/profile.png'

const NavbarAdmind = () => {
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
               
            </Nav>
            <NavLink to='/login'>
            <Image  style={{width:"50px", marginRight:"30px"}} src={navProfile} fluid />
            </NavLink>
            
           </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavbarAdmind;
