import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Input,
  FormHelperText,
  IconButton,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function ProductCard({
  product,
  deleteConfirm,
  showNotify,
  showErr,
  categories,
}) {
  // to update specefications create model that will have the details
  const [editing, setEditing] = useState(false);
  const [singleProduct, setSingleProduct] = useState(product);
  // eslint-disable-next-line no-unused-vars
  const [notValid, setNotValid] = useState(false);

  let config = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const formik = useFormik({
    initialValues: {
      productName: singleProduct.name,
      price: singleProduct.price,
      amount: singleProduct.amount,
      updateCategory: singleProduct.category?._id,
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("you can't set empty product name"),
      price: Yup.number().required(
        "you can't set empty product price we are loosing money"
      ),
      amount: Yup.number().required(
        "you can't set empty product name you can set it 0 if u don't have stock"
      ),
    }),
    onSubmit: (values) => {
      axios
        .put(
          "http://localhost:8080/dashboard/products",
          {
            id: product._id,
            productName: values.productName,
            price: Number(values.price),
            amount: Number(values.amount),
            category: values.updateCategory,
          },
          config
        )
        .then((res) => {
          console.log(res);
          showNotify(res.data.message);
          setEditing(false);
        })
        .catch((err) => {
          console.log(err);
          showErr("update faild");
        });
    },
  });

  const cancelEdit = () => {
    setSingleProduct({
      ...product,
      name: product.name,
      price: product.price,
      amount: product.amount,
      category: product.category,
    });
    setNotValid(false);
    setEditing(false);
  };

  return (
    <Grid item xs={12} md={6} lg={4} key={product._id}>
      <Card sx={{ maxWidth: 345 }} className="admin-product-card">
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:8080/images/${
            product.images?.length ? product.images[0] : ""
          }`}
          alt={`http://localhost:8080/images/${
            product.images?.length ? product.images[0] : "Not Found"
          }`}
        />
        <CardContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            {editing ? (
              <>
                <Box component="div">
                  <label>Name:</label>
                  <Input
                    {...formik.getFieldProps("productName")}
                    error={
                      formik.touched.productName && formik.errors.productName
                        ? true
                        : false
                    }
                    aria-describedby="component-helper-text"
                  />
                  <FormHelperText
                    id="component-helper-text"
                    sx={{ color: "red" }}
                  >
                    {/* {notValid ? "you can't set empty product name" : ""} */}
                    {formik.touched.productName && formik.errors.productName
                      ? `${formik.errors.productName}`
                      : null}
                  </FormHelperText>
                </Box>
                <Box component="div">
                  <label>Price:</label>
                  <Input
                    {...formik.getFieldProps("price")}
                    error={
                      formik.touched.price && formik.errors.price ? true : false
                    }
                    aria-describedby="component-helper-text"
                  />
                  <FormHelperText
                    id="component-helper-text"
                    sx={{ color: "red" }}
                  >
                    {formik.touched.price && formik.errors.price
                      ? `${formik.errors.price}`
                      : null}
                  </FormHelperText>
                </Box>
                <Box component="div">
                  <label>Amount:</label>
                  <Input
                    {...formik.getFieldProps("amount")}
                    error={
                      formik.touched.amount && formik.errors.amount
                        ? true
                        : false
                    }
                    aria-describedby="component-helper-text"
                  />
                  <FormHelperText
                    id="component-helper-text"
                    sx={{ color: "red" }}
                  >
                    {formik.touched.amount && formik.errors.amount
                      ? `${formik.errors.amount}`
                      : null}
                  </FormHelperText>
                </Box>
                <FormControl
                  sx={{ width: "100%", mt: 2 }}
                  error={
                    formik.touched.price && formik.errors.price ? true : false
                  }
                >
                  <InputLabel id="updateCategory">Category</InputLabel>
                  <Select
                    fullWidth
                    labelId="updateCategory"
                    id="updateCategory"
                    label="Category"
                    name="updateCategory"
                    {...formik.getFieldProps("updateCategory")}
                  >
                    <MenuItem value="" selected>
                      <em>None</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem value={category._id} key={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.touched.category && formik.errors.category
                      ? `${formik.errors.category}`
                      : null}
                  </FormHelperText>
                </FormControl>
              </>
            ) : (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  {formik.values.productName}
                </Typography>
                <Typography variant="h5">{formik.values.price}EGP</Typography>
                <Typography variant="body2" color="text.secondary">
                  stock:{formik.values.amount}{" "}
                  {Number(formik.values.amount) === 0 ? (
                    <span style={{ color: "red" }}>out of stock</span>
                  ) : null}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category:
                  {
                    categories.find((cate) => {
                      return (
                        Number(cate._id) ===
                        Number(formik.values.updateCategory)
                      );
                    })?.name
                  }
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
        <CardActions>
          {editing ? (
            <>
              <IconButton
                aria-label="submit edit"
                onClick={formik.handleSubmit}
              >
                <CheckIcon color="success" />
              </IconButton>
              <IconButton aria-label="cancel edit" onClick={cancelEdit}>
                <CancelIcon color="primary" />
              </IconButton>
            </>
          ) : (
            <Button size="small" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}

          <Button
            size="small"
            onClick={() => deleteConfirm(product._id, product.name)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductCard;
