import { configureStore } from "@reduxjs/toolkit";
import { AppData } from "./SliceActions";

export const store = configureStore({

  reducer: {
    appData: AppData.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
