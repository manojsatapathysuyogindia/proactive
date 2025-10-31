import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Local storage
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./slices/user.slice"; // Example slice
import settingsReducer from "./slices/settings.slice"; // Example slice

// ✅ Configure Redux Persist
const persistConfig = {
  key: "root",
  storage, // Uses local storage
  whitelist: ["user", "settings"], // State slices to persist
};

// ✅ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
});

// ✅ Apply PersistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Create Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);

// ✅ Define TypeScript Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;