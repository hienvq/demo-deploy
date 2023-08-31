import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../apis/Api";

const initialState = {
  isOpen: false,
  content: "",
};

export const loginActionV2 = createAsyncThunk("login", async ({ email, password }) => {
  const response = await axiosClient.get("/users", {
    params: {
      email: email,
      password: password,
    },
  });
  return response.data.length ? response.data : Promise.reject("abcd");
});
function promiseTest(email, password) {
  return new Promise((resolve, reject) => {
    axiosClient
      .get("/users", {
        params: {
          email: email,
          password: password,
        },
      })
      .then(() => reject("fail!!!"));
  });
}
export const loginAction = (email, password) => async (dispatch) => {
  const response = await promiseTest(email, password);
  if (response.data.length) {
    dispatch(show({ content: "Login Succeed!" }));
    localStorage.setItem("token", "token123");
    window.location.replace("/hien/admin/product");
  } else {
    dispatch(show({ content: "Login Fail!" }));
  }
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show: (state, action) => {
      state.isOpen = true;
      state.content = action.payload.content;
    },
    hide: (state) => {
      state.isOpen = false;
      state.content = "";
    },
  },
  extraReducers: {
    [loginActionV2.fulfilled]: (state, action) => {
      state.isOpen = true;
      state.content = "Login Succeed!";
      localStorage.setItem("token", "token123");
      window.location.replace("/admin/product");
    },
    [loginActionV2.rejected]: (state, action) => {
      state.isOpen = true;
      state.content = "Login Fail!";
    },
  },
  // extraReducers: (builder) => {

  //   // Add reducers for additional action types here, and handle loading state as needed
  //   // builder.addCase(loginActionV2.fulfilled, (state, action) => {
  //   //   console.log("HienVQ ~  action:", action);
  //   //   if (action.payload.length) {
  //   //     state.isOpen = true;
  //   //     state.content = "Login Succeed!";
  //   //     localStorage.setItem("token", "token123");
  //   //     window.location.replace("/admin/product");
  //   //   } else {
  //   //     state.isOpen = true;
  //   //     state.content = "Login Fail!";
  //   //   }
  //   //   // Add user to the state array
  //   //   // state.entities.push(action.payload)
  //   // });
  // },
});

export const { show, hide } = notificationSlice.actions;

export default notificationSlice.reducer;
