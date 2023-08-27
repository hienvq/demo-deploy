import * as React from "react";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductModalContext from "../../contexts/ProductModalContext";
import * as yup from "yup";
import ProductApi from "../../apis/ProductApi";
import ProductPagingContext from "../../contexts/ProductPagingContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "formik-mui";
const validationSchema = yup.object({
  name: yup.string("Enter product name").required("Name is required"),
  price: yup.number("Enter product price").min(100, ">= 100").max(1000, "<= 1000").required("Price is required"),
  description: yup
    .string("Enter product description")
    .min(10, "Description should be of minimum 10 characters length")
    .required("Description is required"),
});

const ProductModal = () => {
  const { isOpenModal, setIsOpenModal, initDataModal, handleSearch } = React.useContext(ProductModalContext);
  const { pagingData, setPagingData, refetch } = React.useContext(ProductPagingContext);

  const handleClose = () => {
    setIsOpenModal(false);
  };
  const handleCreateProduct = async ({ name, description, price }) => {
    await ProductApi.create({
      name,
      description,
      price,
    });
  };
  const handleEditProduct = async ({ id, name, description, price }) => {
    await ProductApi.update(id, {
      name,
      description,
      price,
    });
  };
  return (
    <Dialog open={isOpenModal} onClose={handleClose}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: initDataModal.id ?? "",
          name: initDataModal.name ?? "",
          price: initDataModal.price ?? "",
          description: initDataModal?.description ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, form) => {
          if (values.id) {
            await handleEditProduct({
              id: values.id,
              name: values.name,
              description: values.description,
              price: values.price,
            });
          } else {
            await handleCreateProduct({ name: values.name, description: values.description, price: values.price });
          }
          // resetForm();
          if (pagingData.currentPage === 0 || values.id) {
            refetch();
          } else {
            setPagingData({
              ...pagingData,
              currentPage: 0,
            });
          }
        }}
      >
        {({ resetForm }) => (
          <Form>
            <DialogTitle>Product Create/Update</DialogTitle>
            <DialogContent>
              <Field margin="dense" label="Name" fullWidth variant="standard" name="name" component={TextField} />
              <Field
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                name="price"
                component={TextField}
              />
              <Field
                margin="dense"
                label="Description"
                fullWidth
                variant="standard"
                name="description"
                component={TextField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ProductModal;
