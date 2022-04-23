import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

export default function ResponsiveDatePicker({ changeDate }) {
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="div"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "1rem 0",
        }}
      >
        <DatePicker
          disableFuture
          label="Start Date"
          value={startValue}
          minDate={new Date("2022-01-01")}
          onChange={(newValue) => {
            setStartValue(newValue);
            changeDate({
              start: newValue,
              end: endValue,
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <div style={{ padding: "0 10px" }}>to</div>
        <DatePicker
          disableFuture
          label="End Date"
          value={endValue}
          minDate={new Date("2022-01-01")}
          onChange={(newValue) => {
            setEndValue(newValue);
            changeDate({
              start: startValue,
              end: newValue,
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
