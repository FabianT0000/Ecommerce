import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import './SideBar.css'

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <Button variant="success">Agregar producto</Button>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <Button variant="primary">Listar productos</Button>
        </div>
      </Link>
      <Link to={"/editproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <Button variant="success">Editar productos</Button>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
