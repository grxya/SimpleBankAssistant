import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import chatBotReducer from "../store/slices/chatBotSlice";
import customerAccountReducer from "../store/slices/customerAccountSlice";
import moneyTransferReducer from "../store/slices/moneyTransferSlice";
import historyReducer from "../store/slices/historySlice";
import loanReducer from "../store/slices/loanSlice";
import userReducer from "../store/slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chatBot: chatBotReducer,
    customerAccount: customerAccountReducer,
    moneyTransfer: moneyTransferReducer,
    history: historyReducer,
    loan: loanReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
