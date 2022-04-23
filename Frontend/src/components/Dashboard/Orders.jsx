import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Title from "./Title";
import Order from "./views/Order";

export default function Orders({ propOrders, propShippers }) {
  const [orders, setOrders] = useState([]);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    setOrders(propOrders);
    setShippers(propShippers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propOrders, propShippers]);

  // now i create update assign shipper for the order
  //by making axios req on click and update the order shipper with the shipper refernce

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total price</TableCell>
            <TableCell align="center">Order Status</TableCell>
            <TableCell align="center">Shippers</TableCell>
            <TableCell align="center">Controls</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order, index) => (
            <Order key={index} order={order} shippers={shippers} />
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
