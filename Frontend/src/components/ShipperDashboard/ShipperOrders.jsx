import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./ShipperDashboard.css";
import OrdersTabel from "./Table/OrdersTable";
function ShipperOrders() {
  let token = localStorage.getItem("token");
  let decode = jwt_decode(token);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:8080/shipper/orders", { id: decode.user._id })
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ marginTop: "2rem" }}>
      <OrdersTabel orders={orders} />
    </div>
  );
}

export default ShipperOrders;
