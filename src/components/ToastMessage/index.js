import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { store } from "../../store";
import { hideNotification } from "../../store/actions/NotificationActions";
import { notificationSelector } from "../../store/selectors/NotificationSelector";
import { useSelector, useDispatch, connect, useStore } from "react-redux";
import { showNotification } from "../../store/actions/NotificationActions";
import { hide } from "../../store/slices/notificationSlice";

const ToastMessage = (props) => {
  const notiStore = useSelector((state) => state.notification) || {};
  console.log("HienVQ ~  notiStore:", notiStore);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hide());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={notiStore.isOpen}
      onClose={handleClose}
      message={notiStore.content}
      autoHideDuration={2000}
    />
  );
};
export default ToastMessage;
