import { Button } from "@mui/material";
import { store } from "../../store";
import { hideNotification, showNotification } from "../../store/actions/NotificationActions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { show } from "../../store/slices/notificationSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const handleShow = () => {
    dispatch(show({ content: "HAHAHAHAA" }));
  };
  const handleHide = () => {
    store.dispatch(hideNotification());
  };

  return (
    <>
      <Button variant="contained" onClick={handleShow}>
        Show
      </Button>
      {/* <Button onClick={handleHide}>Hide</Button> */}
    </>
  );
};
export default UserPage;
