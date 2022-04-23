import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Shipper from "./views/shipperCard";
import { Snackbar, Alert } from "@mui/material";

function Shippers() {
  const [shippers, setShipppers] = useState([
    { email: "aramex@gotham.dc", name: "aramex" },
    { email: "sigma@gotham.dc", name: "sigma" },
    { email: "fedex@theboys.paramount", name: "fedex" },
    { email: "tedex@metropolice.dc", name: "tedex" },
  ]);
  const [searchOptions, setSearchOptions] = useState([...shippers]);
  const search = (value) => {
    let arr = shippers.filter((shipper) => shipper.email.includes(value));
    setSearchOptions(arr);
  };

  /**** notifications */
  const [notification, setnotification] = useState(false);
  const [addShipperMsg, setAddShipperMsg] = useState("test");
  const [error, setError] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState("");

  const openNotification = (message) => {
    setAddShipperMsg(message);
    setnotification(true);
  };

  const hideNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setnotification(false);
  };

  const openErrorMsg = (message) => {
    setAddErrorMsg(message);
    setError(true);
  };
  const hideError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  /**** notifications */

  /*********** reflect in run time ********** */
  const deleteShipper = (id) => {
    let ourShippers = searchOptions.filter((shipper) => shipper._id !== id);
    setShipppers(ourShippers);
  };

  /*********** reflect in run time ********** */
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  // get shippers on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard/shippers", config)
      .then((res) => {
        console.log(res.data.shippers);
        setShipppers(res.data.shippers);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchOptions(shippers);
  }, [shippers]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("shipper name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email address is required"),
      phone_number: Yup.string()
        .max(11, "Must be 11 characters")
        .required("phone number is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      let formData = {
        shipperName: values.name.toLowerCase(),
        shipperEmail: values.email,
        phoneNumber: values.phone_number,
      };
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .post("http://localhost:8080/dashboard/shippers", formData, config)
        .then((res) => {
          console.log(res);
          openNotification(res.data.message);
          setShipppers([...shippers, values]);
          resetForm();
        })
        .catch((err) => {
          openErrorMsg(err.response.data.message);
        });
    },
  });

  return (
    <div className="shippers">
      <Box component="div" sx={{ my: 3 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Register Shipper</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              className="add-shipper-form"
            >
              <TextField
                id="shippername"
                label="Shipper Name"
                variant="outlined"
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null
                }
                error={formik.touched.name && formik.errors.name ? true : false}
                {...formik.getFieldProps("name")}
              />
              <TextField
                id="shipperEmail"
                label="Shipper Email"
                variant="outlined"
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                {...formik.getFieldProps("email")}
              />
              <TextField
                id="shipperPhoneNumber"
                label="Shipper Phone Number"
                variant="outlined"
                helperText={
                  formik.touched.phone_number && formik.errors.phone_number
                    ? formik.errors.phone_number
                    : null
                }
                error={
                  formik.touched.phone_number && formik.errors.phone_number
                    ? true
                    : false
                }
                {...formik.getFieldProps("phone_number")}
              />

              <Button type="submit" variant="contained">
                Register Shipper
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box component="div" sx={{ my: 3 }}>
        <Autocomplete
          freeSolo
          id="shippersSearch"
          onKeyUp={(e) => search(e.target.value)}
          disableClearable
          options={shippers.map((shipper) => shipper.email)}
          // options={["lego batman", "lego joker"]}
          sx={{ backgroundColor: "#fff" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Box>
      <Grid container spacing={3}>
        {searchOptions.map((shipper) => (
          <Grid item md={6} xs={12} lg={4} key={shipper.email}>
            <Shipper
              shipper={shipper}
              removeShipper={deleteShipper}
              openNotification={openNotification}
            />
          </Grid>
        ))}
      </Grid>
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
          {addShipperMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={hideError}
        severity="error"
      >
        <Alert onClose={hideError} severity="error" sx={{ width: "100%" }}>
          {addErrorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Shippers;
