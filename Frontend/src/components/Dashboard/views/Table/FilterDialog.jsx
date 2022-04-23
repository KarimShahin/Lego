import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ResponsiveDatePicker from "./ResponsiveDatePicker";
import axios from "axios";

function FilterDialog({ choosenOrders, open, handleClose, openNotification }) {
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());

  const changeDate = (date) => {
    setStartValue(date.start);
    setEndValue(date.end);
  };

  const findOrders = () => {
    console.log("start", startValue.toLocaleDateString());
    console.log("end", endValue.toLocaleDateString());
    axios
      .post(
        `http://localhost:8080/dashboard/order`,
        {
          date: {
            start: startValue.toLocaleDateString(),
            end: endValue.toLocaleDateString(),
          },
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        choosenOrders(res.data.orders);
        openNotification(res.data.message);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Find Orders in a specifec date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To find orders range set start date and end date
          </DialogContentText>
          <ResponsiveDatePicker changeDate={changeDate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={findOrders}>Find</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterDialog;
