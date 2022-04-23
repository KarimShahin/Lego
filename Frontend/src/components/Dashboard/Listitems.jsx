import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import allyprops from "./Tabs/allyprops";

export function MainListItems({ value, handler, open }) {
  return (
    <React.Fragment>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handler}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {/* <Tab label="Dashboard" icon={<DashboardIcon />} {...allyprops(0)} /> */}
        <Tab
          label={open ? "Dashboard" : ""}
          icon={<DashboardIcon />}
          iconPosition="start"
          {...allyprops(0)}
        />
        <Tab
          label={open ? "Orders" : ""}
          icon={<ShoppingCartIcon />}
          iconPosition="start"
          {...allyprops(1)}
        />
        <Tab
          label={open ? "Products" : ""}
          icon={<Inventory2Icon />}
          iconPosition="start"
          {...allyprops(2)}
        />
        <Tab
          label={open ? "Users" : ""}
          icon={<PeopleIcon />}
          iconPosition="start"
          {...allyprops(3)}
        />
        {/* <Tab
          label={open ? "Reviews" : ""}
          icon={<ReviewsIcon />}
          iconPosition="start"
          {...allyprops(4)}
        /> */}
        <Tab
          label={open ? "Shippers" : ""}
          icon={<LocalShippingIcon />}
          iconPosition="start"
          {...allyprops(4)}
        />
        <Tab
          label={open ? "Category" : ""}
          icon={<CategoryIcon />}
          iconPosition="start"
          {...allyprops(5)}
        />
      </Tabs>
    </React.Fragment>
  );
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
