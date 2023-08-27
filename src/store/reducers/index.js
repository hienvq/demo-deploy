import { combineReducers } from "redux";
import { notificationReducer } from "./NotificationReducer";
export const rootReducer = combineReducers({
  notification: notificationReducer,
});
