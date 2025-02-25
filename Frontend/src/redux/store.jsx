import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";
import cartSlice from "./slice/cartSlice";
const userPersistConfig = {
  key: "users",
  storage,
};
const cartPersistConfig = {
  key: "cart",
  storage,
};

const store = configureStore({
  reducer: {
    userSlice: persistReducer(userPersistConfig, userSlice),
    cartSlice: persistReducer(cartPersistConfig, cartSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };
