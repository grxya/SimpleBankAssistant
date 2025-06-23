import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import authReducer from "../store/slices/authSlice";
import chatBotReducer from "../store/slices/chatBotSlice";
import customerAccountReducer from "../store/slices/customerAccountSlice";
import moneyTransferReducer from "../store/slices/moneyTransferSlice";
import historyReducer from "../store/slices/historySlice";
import loanReducer from "../store/slices/loanSlice";
import userReducer from "../store/slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  chatBot: chatBotReducer,
  customerAccount: customerAccountReducer,
  moneyTransfer: moneyTransferReducer,
  history: historyReducer,
  loan: loanReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

export const persistor = persistStore(store);
