import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function EnhancedTableToolbar({
  numSelected,
  openFilterData,
  restoreAllOrders,
  orders,
  propsOrders,
}) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Recent Orders
        </Typography>
      )}
      {orders.length !== propsOrders.length ? (
        <Tooltip title="Reset Orders">
          <IconButton onClick={restoreAllOrders}>
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter By Range Date">
          <IconButton onClick={openFilterData}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
