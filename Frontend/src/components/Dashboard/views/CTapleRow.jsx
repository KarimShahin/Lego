import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { red } from "@mui/material/colors";
import axios from "axios";
import {
  Input,
  FormHelperText,
  Modal,
  Typography,
  Button,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  bcategory: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CTapleRow({ category, confirmDelete, openErrorMsg, index }) {
  const [editing, setEditing] = useState(false);
  const [cate, setCate] = useState(category);
  const [validName, setValidName] = useState(false);
  const [open, setOpen] = useState(false);

  // update category
  const handleClose = () => setOpen(false);
  const handleOpen = (id) => {
    setOpen(true);
  };
  let config = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const submitEdit = () => {
    if (cate.name.length > 0) {
      setValidName(false);
      axios
        .put(
          "http://localhost:8080/dashboard/category",
          { id: cate._id, name: cate.name },
          config
        )
        .then((res) => {
          setEditing(false);
        })
        .catch((err) => {
          openErrorMsg("you can't set two categories with same name");
        });
    } else {
      setValidName(true);
    }
  };
  const cancelEdit = () => {
    setCate({
      ...cate,
      name: category.name,
    });
    setValidName(false);
    setEditing(false);
  };

  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { bcategory: 0 },
        }}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          {editing ? (
            <>
              <Input
                value={cate.name}
                onChange={(e) => {
                  setCate({
                    ...cate,
                    name: e.target.value,
                  });
                }}
                error={validName}
                aria-describedby="component-helper-text"
              />
              <FormHelperText id="component-helper-text" sx={{ color: "red" }}>
                {validName ? "you can't set empty category" : ""}
              </FormHelperText>
            </>
          ) : (
            // make category name lower case when you submit the form
            // cate.name.charAt(0).toUpperCase() + cate.name.slice(1)
            cate.name
          )}
        </TableCell>
        <TableCell sx={{ px: 0 }}>
          <Box sx={{ display: "flex", padding: "16px" }}>
            {editing ? (
              <>
                <IconButton aria-label="submit edit" onClick={submitEdit}>
                  <CheckIcon color="success" />
                </IconButton>
                <IconButton aria-label="cancel edit" onClick={cancelEdit}>
                  <CancelIcon color="primary" />
                </IconButton>
              </>
            ) : (
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setEditing(true);
                }}
              >
                <ModeEditIcon color="success" />
              </IconButton>
            )}
            <IconButton aria-label="delete" onClick={handleOpen}>
              <DeleteIcon sx={{ color: red[600] }} />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            R u sure u want to delete{" "}
            <span style={{ color: "orange" }}>{category.name}</span>?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                confirmDelete(cate._id, handleClose);
              }}
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

export default CTapleRow;
