import React from "react";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import Order from "../Order";
import FilterDialog from "./FilterDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
function descendingComparator(a, b, orderBy) {
  if (new Date(b[orderBy]) < new Date(a[orderBy])) {
    return -1;
  }
  if (new Date(b[orderBy]) > new Date(a[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator(order) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, "order_date")
    : (a, b) => -descendingComparator(a, b, "order_date");
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  // var holds the key

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTable({ orders, shippers }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("order_date");
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [propsOrders, setPropsOrders] = React.useState([...orders]);
  const [openFilterDate, setOpenFilterDate] = React.useState(false);

  const choosenOrders = (datedOrders) => {
    // setOrdersByDate(orders);
    setPropsOrders(datedOrders);
    console.log(datedOrders);
  };

  const restoreAllOrders = () => {
    setPropsOrders(orders);
  };

  const openFilterDataHandler = () => {
    setOpenFilterDate(true);
  };
  const closeFilterDataHandler = () => {
    setOpenFilterDate(false);
  };

  /**** notifications */
  const [notification, setnotification] = React.useState(false);
  const [addCategoryStatus, setAddCategoryStatus] = React.useState("test");

  const openNotification = (message) => {
    setAddCategoryStatus(message);
    setnotification(true);
  };

  const hideNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setnotification(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const countTest = () => Math.ceil(Number(orders.length) / rowsPerPage);
  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - propsOrders.length) : 0;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            openFilterData={openFilterDataHandler}
            restoreAllOrders={restoreAllOrders}
            orders={orders}
            propsOrders={propsOrders}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={propsOrders.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(propsOrders, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => {
                    return (
                      <Order order={order} shippers={shippers} key={index} />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={propsOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mb: 0 }}
          />
        </Paper>
      </Box>

      <FilterDialog
        open={openFilterDate}
        choosenOrders={choosenOrders}
        handleClose={closeFilterDataHandler}
        openNotification={openNotification}
      />
      <Snackbar
        open={notification}
        autoHideDuration={3000}
        onClose={hideNotification}
        severity="success"
      >
        <Alert
          onClose={hideNotification}
          severity="success"
          sx={{ width: "100%" }}
        >
          {addCategoryStatus}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EnhancedTable;
