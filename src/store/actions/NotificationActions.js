import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import axiosClient from "../../apis/Api";

export const showNotification = (content) => {
  return {
    type: "SHOW_NOTIFICATION",
    payload: {
      content,
    },
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
  };
};

export const loginAction = (email, password) => {
  return async (dispatch, getState) => {
    const response = await axiosClient.get("/users", {
      params: {
        email: email,
        password: password,
      },
    });
    if (response.data.length) {
      dispatch(showNotification("Login Succeed!"));
      localStorage.setItem("token", "token123");
      window.location.replace("/admin/product");
    } else {
      dispatch(showNotification("Login Fail!"));
    }
  };
};
