import { RootState } from "@/store";
import { AddMoney } from "@/store/slices/currencySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Manager() {
    const dispatch = useDispatch();
    
    const farmingSlots = useSelector(
        (state: RootState) => state.farmingSlots.slots
    );

    useEffect(() => {

        const interval = setInterval(() => {
            let sum = 0;
            for (let i = 0; i < farmingSlots.length; i++)
            {
                const container = farmingSlots[i].container;
                if (container == null) continue;
                sum += container.produceMoney;
            }
            dispatch(AddMoney(sum));
        }, 3000);

        return () => clearInterval(interval); // Phần Clean-up này nó sẽ chạy khi mà dispatch hay farmingSlots thay đổi
    }, [farmingSlots]); // Không hiểu tại sao mình lại nên để Dispatch vào trong Dependency này
    
    return <></>
}