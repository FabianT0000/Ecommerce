import "./Admind.css";
import SideBar from "../../Components/SideBar/SideBar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";

import EditProduct from "../../Components/EditProduct/EditProduct";

const Admind = () => {
  return (
    <div className="admind">
      <SideBar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default Admind;
