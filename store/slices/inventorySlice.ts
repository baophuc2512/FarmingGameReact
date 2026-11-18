import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InventoryState {
    slots : SlotComponent[],
}

const initialState : InventoryState = {
    slots : [],
}

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        AddItem: (state, action: PayloadAction<MoneyFarm>) => {
            const findSlot = state.slots.find(
                slot => (slot.container.name == action.payload.name && slot.container.bonusBuff == action.payload.bonusBuff)
            );

            if (findSlot == null) 
            {
                const newSlot = { container : action.payload, quantity : 1 };
                state.slots.push(newSlot);
                return;
            }
            
            findSlot.container = action.payload;
            findSlot.quantity += 1;
        },

        RemoveItem: (state, action: PayloadAction<MoneyFarm>) => {
            const findSlot = state.slots.find(
                slot => (slot.container.name == action.payload.name && slot.container.bonusBuff == action.payload.bonusBuff)
            );

            if (findSlot == null) return;

            findSlot.quantity -= 1;
        },


        IncreaseQuantity: (state, action: PayloadAction<string>) => {   
            // 
        },
    },
});

export const { AddItem, RemoveItem, IncreaseQuantity } = inventorySlice.actions;
export default inventorySlice.reducer;


/*class InventoryManager {
    private static Instance : InventoryManager;

    private slots: SlotComponent[] = [];

    private listeners = new Set<() => void>();

    public Subscribe = (callback: () => void) => {
        this.listeners.add(callback);

        return () => {
            this.listeners.delete(callback);
        };
    };

    private Notify() {
        this.listeners.forEach(callback => callback());
    }


    private constructor() {
    
    }

    public static GetInstance()
    {
        if (!this.Instance)
        {
            this.Instance = new InventoryManager();
        }

        return this.Instance;
    }

    public AddItem(container: MoneyFarm, quantity: number) {
        const findSlot = this.slots.find(
            slot => slot.container === container
        );

        this.Notify();

        if (findSlot == null) 
        {
            const newSlot = { container : container, quantity : 1 };
            this.slots.push(newSlot);
            return;
        }
        
        findSlot.container = container;
        findSlot.quantity += quantity;
    }

    public ShowInventory() {
        return [...this.slots];
    }
}

export default InventoryManager.GetInstance();*/