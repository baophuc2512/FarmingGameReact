import { RootState } from '@/store';
import { PutMoneyFarm } from '@/store/slices/farmingSlotsSlice';
import { RemoveItem } from '@/store/slices/inventorySlice';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface SlotModalShowProps {
    moneyFarm: MoneyFarm;
    quantity: number;
}

const SlotModalShow = ({moneyFarm, quantity}: SlotModalShowProps) => {
    const farmingSlots = useSelector(
        (state: RootState) => state.farmingSlots.slots
    );
    const dispatch = useDispatch();

    const PutToFarm = (moneyFarm : MoneyFarm) => {
        const emptyIndex = farmingSlots.findIndex(
            slot => slot.container === null
        );
        if (emptyIndex == -1) return;

        dispatch(PutMoneyFarm({ idSlot: emptyIndex, moneyFarm : moneyFarm}));
        dispatch(RemoveItem(moneyFarm));
    }

    return (
        <View className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-3">

            {/* MoneyFarm Information */}
            <View className="flex-1 gap-2">

                <Text className="text-lg font-bold">
                    {moneyFarm.name}
                </Text>

                <Text>
                    Rarity: {moneyFarm.rarity}
                </Text>

                <Text>
                    Produce Money: {moneyFarm.produceMoney}
                </Text>

                <Text>
                    Bonus Buff: {moneyFarm.bonusBuff}
                </Text>

                <Text>
                    Quantity: {quantity}
                </Text>

            </View>

            {/* Put To Farm */}
            <Pressable
                onPress={() => {PutToFarm(moneyFarm)}}
                className="bg-green-600 rounded-xl px-4 py-3 active:bg-green-700"
            >
                <Text className="text-white font-bold">
                    Put To Farm
                </Text>
            </Pressable>

        </View>
    );
}

export default SlotModalShow