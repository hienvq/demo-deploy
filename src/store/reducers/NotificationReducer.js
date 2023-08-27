const initialState = {
  isOpen: false,
  content: "",
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        isOpen: true,
        content: action.payload.content,
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        isOpen: false,
        content: "",
      };
    default:
      return state;
  }
};
