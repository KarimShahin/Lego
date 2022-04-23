import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems } from "./Listitems";

import logo from "./../../assets/imgs/lego-logo.svg";
import TabPanel from "./Tabs/TabPanel";
import "./Dashboard.css";
import Products from "./views/Products";
import Users from "./views/Users";
import Shippers from "./Shippers";
import Categories from "./views/Categories";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import axios from "axios";
import EnhancedTable from "./views/Table/EnhancedTable";
import DashboardPanel from "./views/DashboardPanel";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = React.useState([]);
  const [shippers, setShippers] = React.useState([]);
  const [recentOrder, setRecentOrder] = React.useState([]);
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard/orders", config)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8080/dashboard/recentOrders", config)
      .then((res) => {
        setRecentOrder(res.data.orders);
      })
      .catch((err) => console.log(err));

    // shippers
    axios
      .get("http://localhost:8080/dashboard/shippers", config)
      .then((res) => {
        setShippers(res.data.shippers);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              backgroundColor: "#ffcf00",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                color: "black",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="black"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <img
                src={logo}
                style={{
                  width: "35px",
                  display: "inline-block",
                  marginRight: "10px",
                }}
                alt=""
              />
              Dashboard
            </Typography>
            <NavLink to="/">
              <IconButton color="inherit" sx={{ color: "black" }}>
                <HomeIcon />
              </IconButton>
            </NavLink>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems value={value} handler={handleChange} open={open} />
            {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            marginTop: "4rem",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <TabPanel value={value} index={0}>
              <DashboardPanel
                recentOrder={recentOrder}
                shippers={shippers}
                orders={orders}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* <Table orders={orders} /> */}
              {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders propOrders={orders} propShippers={shippers} />
              </Paper> */}
              <EnhancedTable orders={orders} shippers={shippers} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Products />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Users />
            </TabPanel>
            {/* <TabPanel value={value} index={4}>
              <Reviews />
            </TabPanel> */}
            <TabPanel value={value} index={4}>
              <Shippers />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Categories />
            </TabPanel>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
