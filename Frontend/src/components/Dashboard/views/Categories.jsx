import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../Tabs/TabPanel";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import allyprops from "../Tabs/allyprops";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormData from "form-data";
import { Grid } from "@mui/material";
import CTableRow from "./CTapleRow";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Categories() {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [searchOptions, setSearchOptions] = useState([...categories]);
  const [value, setValue] = useState(0);
  const [addCategoryStatus, setAddCategoryStatus] = useState("test");
  const [addCategoryNotify, setAddCategoryNotify] = useState(false);
  const openErrorMsg = (message) => {
    setAddCategoryStatus(message);
    setAddCategoryNotify(!false);
  };
  const hideErrorMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAddCategoryNotify(false);
  };
  /**** notifications */
  const [notification, setnotification] = useState(false);

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

  /**** notifications */
  const search = (value) => {
    // let test = categories.map((category) => ({
    //   ...category,
    //   name: category.name.toLowerCase(),
    // }));
    let arr = categories.filter((category) => category.name.includes(value));

    setSearchOptions(arr);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const confirmDelete = (id, close) => {
    axios
      .delete("http://localhost:8080/dashboard/category", {
        data: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let index = searchOptions.findIndex((element) => element._id === id);
        categories.splice(index, 1);
        setSearchOptions(categories);
        close();
        openNotification(res.data.data + " Successfully!");
        //notify res.data.data
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard/category", config)
      .then((res) => {
        setCategories(res.data.body);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchOptions(categories);
  }, [categories]);

  return (
    <>
      <Tabs
        orientation="horizontal"
        value={value}
        variant="fullWidth"
        onChange={handleChange}
        aria-label="Horizontal tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Edit"
          icon={<EditIcon color="primary" />}
          {...allyprops(0)}
        />
        <Tab
          label="Add"
          icon={<AddBoxIcon color="success" />}
          {...allyprops(1)}
        />
      </Tabs>
      <Box component="div" sx={{ paddingTop: "1rem" }}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Box component="div" sx={{ my: 3 }}>
              <Autocomplete
                freeSolo
                id="categorySearch"
                onKeyUp={(e) => search(e.target.value)}
                disableClearable
                options={searchOptions.map((category) => category.name)}
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Controls</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchOptions.map((category, index) => (
                    <CTableRow
                      category={category}
                      index={index}
                      confirmDelete={confirmDelete}
                      openErrorMsg={openErrorMsg}
                      key={category._id}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Formik
              initialValues={{
                categoryName: "",
              }}
              validationSchema={Yup.object({
                categoryName: Yup.string().required(
                  "product category name is Required"
                ),
              })}
              onSubmit={(values) => {
                let data = new FormData();
                data.append("categoryName", values.categoryName.toLowerCase());

                let config = {
                  headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                };
                axios
                  .post(
                    "http://localhost:8080/dashboard/category",
                    values,
                    config
                  )
                  .then((response) => {
                    setCategories([...categories, response.data.data]);
                    values.categoryName = "";
                    openNotification(response.data.message);
                  })
                  .catch((error) => {
                    openErrorMsg(error.response.data.message);
                  });
              }}
            >
              {(props) => (
                <Box
                  component="form"
                  id="addCategoryForm"
                  onSubmit={props.handleSubmit}
                  sx={{ paddingTop: "35px" }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="categoryName"
                        name="categoryName"
                        label="Category Name"
                        helperText={
                          props.touched.categoryName &&
                          props.errors.categoryName
                            ? `${props.errors.categoryName}`
                            : null
                        }
                        error={
                          props.touched.categoryName &&
                          props.errors.categoryName
                            ? true
                            : false
                        }
                        {...props.getFieldProps("categoryName")}
                      />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="products">Products</InputLabel>
                        <Select
                          labelId="products"
                          id="demo-multiple-chip"
                          fullWidth
                          name="products"
                          multiple
                          value={productsName}
                          onChange={multiSelectChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                          error={
                            props.touched.products && props.errors.products
                              ? true
                              : false
                          }
                          {...props.getFieldProps("products")}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              sx={{ fontWeight: "400" }}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{ color: "red" }}>
                          {props.touched.products && props.errors.products
                            ? `${props.errors.products}`
                            : null}
                        </FormHelperText>
                      </FormControl>
                    </Grid> */}
                  </Grid>

                  <Button
                    variant="contained"
                    sx={{ my: 2 }}
                    type="submit"
                    color="success"
                  >
                    Add Category
                  </Button>
                </Box>
              )}
            </Formik>
          </TabPanel>
        </SwipeableViews>
        <Snackbar
          open={addCategoryNotify}
          autoHideDuration={3000}
          onClose={hideErrorMsg}
          severity="error"
        >
          <Alert onClose={hideErrorMsg} severity="error" sx={{ width: "100%" }}>
            {addCategoryStatus}
          </Alert>
        </Snackbar>
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
      </Box>
    </>
  );
}

export default Categories;
