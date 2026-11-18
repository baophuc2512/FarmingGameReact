import { DATA_FARMING_SLOTS } from "@/constants/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FarmingSlotsState {
    slots : DataFarmingSlot[],
}

interface SwapSlotsProp {
    fromIdSlot : number,
    toIdSlot : number,
}

interface PutMoneyFarmProp {
    moneyFarm : MoneyFarm,
    idSlot : number,
}

interface ClearSlotProp {
    idSlot : number,
}

const initialState : FarmingSlotsState = {
    slots : DATA_FARMING_SLOTS
}

const farmingSlotsSlice = createSlice({
    name: "farmingSlots",
    initialState,
    reducers: {
        AddNullSlot: (state) => {
            const nullSlot : DataFarmingSlot = {
                container: null,
                idSlot: state.slots.length,
            };
            state.slots.push(nullSlot);
        },

        PutMoneyFarm: (state, action : PayloadAction<PutMoneyFarmProp>) => {
            // Tìm trong state.slots => coi slot nào có vị trí null thì gán moneyFarm vô container đó.
            if (action.payload.idSlot >= 0 && action.payload.idSlot < state.slots.length)
            {
                state.slots[action.payload.idSlot].container = action.payload.moneyFarm;
            }
        },

        ClearSlot: (state, action : PayloadAction<ClearSlotProp>) => {
            const index = state.slots.findIndex(
                slot => slot.idSlot === action.payload.idSlot
            );

            state.slots[index].container = null;
        },

        SwapSlots: (state, action : PayloadAction<SwapSlotsProp>) => {
            if (action.payload.fromIdSlot == action.payload.toIdSlot || action.payload.fromIdSlot == null || action.payload.toIdSlot == null) {
                return;
            }

            // Tìm trong slot newSlots[??] có idSlot == fromIdSlot với index nào có idSlot == toIdSlot
            let toIndex = state.slots.findIndex(slot => slot.idSlot === action.payload.fromIdSlot);
            let fromIndex = state.slots.findIndex(slot => slot.idSlot === action.payload.toIdSlot);

            if (fromIndex === -1 || toIndex === -1) {
                return;
            }

            const tmpSlot = state.slots[fromIndex];
            state.slots[fromIndex] = state.slots[toIndex];
            state.slots[toIndex] = tmpSlot;
        }
    },
})

export const { AddNullSlot, SwapSlots, ClearSlot, PutMoneyFarm } = farmingSlotsSlice.actions;
export default farmingSlotsSlice.reducer;