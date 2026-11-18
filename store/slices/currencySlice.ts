import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
    money : number;
}

const initialState : CurrencyState = {
    money : 100,
}

const currencySlice = createSlice({
    name : "currency",
    initialState,
    reducers: {
        AddMoney: (state, action : PayloadAction<number>) => {
            state.money += action.payload;
        },

        SpendMoney: (state, action : PayloadAction<number>) => {
            state.money -= action.payload;
        },
    }
})


export const { AddMoney, SpendMoney } = currencySlice.actions;
export default currencySlice.reducer;