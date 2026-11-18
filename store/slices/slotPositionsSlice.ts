import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SlotPositions {
    idSlotToPosition: Record<number, {
    x: number;
    y: number;
    width: number;
    height: number; }>
}

interface IdSlotToPosition {
    idSlot : number;
    x : number;
    y : number;
    width : number;
    height : number;
}

const initialState : SlotPositions = {
    idSlotToPosition : {},
}    

const slotPositionsSlice = createSlice({
    name: "slotPositions",
    initialState,
    reducers: {
        AddIdSlotToPosition: (state, action: PayloadAction<IdSlotToPosition>) => {
            state.idSlotToPosition[action.payload.idSlot] = {
                x : action.payload.x,
                y : action.payload.y,
                width : action.payload.width,
                height : action.payload.height,
            }
        },
    },
})

export const { AddIdSlotToPosition } = slotPositionsSlice.actions;
export default slotPositionsSlice.reducer;