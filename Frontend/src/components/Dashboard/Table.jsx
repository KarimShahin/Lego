import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { red } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable({ orders }) {
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Controls</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", padding: "16px" }}>
                    <IconButton aria-label="dispatch">
                      <CheckIcon color="success" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleOpen}>
                      <DeleteIcon sx={{ color: red[600] }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            R u sure u want to delete this product?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClose()}
              sx={{ mr: "1rem" }}
            >
              yes i'm sure
            </Button>
            <Button variant="contained" color="success" onClick={handleClose}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
