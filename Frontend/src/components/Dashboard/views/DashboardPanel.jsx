import React, { useEffect, useState } from "react";
import Chart from "./../Chart";
import Deposits from "./../Deposits";
import Orders from "./../Orders";
import { Grid, Paper, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Lego clone
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function DashboardPanel({ recentOrder, shippers }) {
  const [orders, setOrders] = useState([]);
  let deposites = orders?.map((order) => {
    let cost = order.total_price.split(" ")[0];
    return cost;
  });
  let recentDeposites;
  if (deposites.length > 0) {
    recentDeposites = deposites?.reduce((prev, current) => {
      return Number(current) + Number(prev);
    });
  }
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    let startDate = new Date().toLocaleDateString().split("/");
    let start = [startDate[0], "1", startDate[2]].join("/");
    axios
      .post(
        "http://localhost:8080/dashboard/order",
        {
          date: {
            start,
            end: new Date().toLocaleDateString(),
          },
        },
        config
      )
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart orders={orders} />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits recentDeposites={recentDeposites} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders propOrders={recentOrder} propShippers={shippers} />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </>
  );
}

export default DashboardPanel;
