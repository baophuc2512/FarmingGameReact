import { configureStore } from "@reduxjs/toolkit";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import currencyReducer from "./slices/currencySlice";
import farmingSlotsReducer from "./slices/farmingSlotsSlice";
import inventoryReducer from "./slices/inventorySlice";
import slotPositionsReducer from "./slices/slotPositionsSlice";

export const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
        farmingSlots: farmingSlotsReducer,
        slotPositions: slotPositionsReducer,
        currency: currencyReducer,
    },

    // Tắt DevTools mặc định của Redux Toolkit
    devTools: false,

    // Thêm Expo Redux DevTools
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(devToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;