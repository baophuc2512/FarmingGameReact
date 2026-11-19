import { FARMINGSLOTS_GAP_COLUMNE, FARMINGSLOTS_GAP_ROW, NUMB_COLUMNES } from "@/constants/data";
import { RootState } from "@/store";
import { AddNullSlot, ClearSlot } from "@/store/slices/farmingSlotsSlice";
import { AddItem } from "@/store/slices/inventorySlice";
import { AddIdSlotToPosition } from "@/store/slices/slotPositionsSlice";
import { styled } from "nativewind";
import { useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, View } from 'react-native';
import Animated, { BounceIn, BounceOut, Easing } from "react-native-reanimated";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import SlotInventory from "../(components)/SlotInventory";
import SlotModalShow from "../(components)/SlotModalShow";
import AnimButton from "../(components)/animButton";

const SafeAreaView = styled(RNSafeAreaView);

const FunFun = () => {
    const [visible, setVisible] = useState(false);
    const [slotInventoryMode, setSlotInventory] = useState<"normal" | "putBackInventory">("normal");

    const moneyFarmInventory = useSelector(
        (state: RootState) => state.inventory.slots
    );

    const farmingSlots = useSelector(
        (state: RootState) => state.farmingSlots.slots
    );

    const dispatch = useDispatch();

    const HandleAddNullSlot = () => {
        dispatch(AddNullSlot());
    }

    const HandleAddPosition = (idSlot: number, x: number, y: number, height: number, width: number) => {
        dispatch(AddIdSlotToPosition({ idSlot: idSlot, x: x, y: y, height: height, width: width }));
    }

    const HandlePutBackInventory = (dataFarmingSlot: DataFarmingSlot) => {
        const container = dataFarmingSlot.container;
        if (container == null) {
            console.error("Cái slot này nó đã null rồi mà sao còn Put Back trong Inventory được");
            return;
        }
        dispatch(AddItem(container));
        dispatch(ClearSlot({ idSlot: dataFarmingSlot.idSlot }));
    }

    function AddSlot({ container }: { container: MoneyFarm | null }) {
        if (container == null) {
            HandleAddNullSlot();
        }
    }

    const getPosition = (index: number, containerWidth: number, itemWidth: number, gap: number, numColumns: number) => {
        const row = Math.floor(index / numColumns);
        const col = index % numColumns;

        const k = Math.min(
            numColumns,
            farmingSlots.length - row * numColumns
        );

        const totalWidth = k * itemWidth + (k - 1) * gap;

        const x = (containerWidth - totalWidth) / 2
            + col * (itemWidth + gap);

        const y = row * (itemWidth + gap);

        return { x, y };
    };

    return (
        <SafeAreaView className='flex-1 bg-background'>



            <View>
                <Button
                    title="Open Inventory"
                    onPress={() => setVisible(true)}
                />

                <Modal
                    visible={visible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setVisible(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">

                        <View className="w-[85%] max-h-[80%] bg-white rounded-2xl p-5">

                            <Text className="text-xl font-bold">
                                Inventory
                            </Text>

                            <FlatList
                                className="flex-grow-0"
                                data={moneyFarmInventory}
                                keyExtractor={(item) => item.container.id}
                                showsVerticalScrollIndicator={true}
                                persistentScrollbar={true}
                                renderItem={({ item }) => {
                                    if (item.quantity <= 0) {
                                        return null;
                                    }
                                    return <SlotModalShow moneyFarm={item.container} quantity={item.quantity} />;
                                }}
                            />

                            <Button
                                title="Close"
                                onPress={() => setVisible(false)}
                            />

                        </View>
                    </View>
                </Modal>
            </View>


            <AnimButton onPress={() => { AddSlot({ container: null }) }}
                style={{ backgroundColor: "#036BFB" }}
                title="Add Null Slot">
                <></>
            </AnimButton>




            <AnimButton
                className={`px-4 py-3 rounded-xl ${slotInventoryMode === "normal" ? "bg-accent" : "bg-amber-600"}`}
                onPress={() => {
                    setSlotInventory(slotInventoryMode == "normal" ? "putBackInventory" : "normal");
                }}
                title={slotInventoryMode == "normal" ? "Put Back To Inventory" : "Cancel"}>
                <></>
            </AnimButton>



            <View className="h-5" />


            <FlatList
                data={farmingSlots}
                extraData={slotInventoryMode}
                numColumns={NUMB_COLUMNES}
                keyExtractor={(item) => item.idSlot.toString()}
                columnWrapperStyle={{
                    gap: FARMINGSLOTS_GAP_COLUMNE,
                }}
                contentContainerStyle={{
                    gap: FARMINGSLOTS_GAP_ROW,
                    flexGrow: 1,
                    alignItems: 'center',
                }}
                renderItem={({ item, index }) => {
                    return <View onLayout={(event) => {
                        const { width, height } = event.nativeEvent.layout;
                        const calculated = getPosition(index, width, height, FARMINGSLOTS_GAP_ROW, NUMB_COLUMNES);
                        HandleAddPosition(item.idSlot, calculated.x, calculated.y, width, height);
                    }}>
                        <SlotInventory idSlot={item.idSlot}>
                            <View className="relative w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center">

                                {item.container == null ? (
                                    <Text className="text-white font-bold">
                                        {item.idSlot}
                                    </Text>
                                ) : (
                                    <View>
                                        <Text className="text-white font-bold">
                                            {item.container.name}
                                        </Text>

                                        <Text className="text-yellow-400 font-bold">
                                            {item.container.produceMoney}
                                        </Text>
                                    </View>
                                )}

                                {slotInventoryMode == "putBackInventory" && item.container != null && (
                                    <Animated.View entering={BounceIn.duration(300).easing(Easing.linear)}
                                        exiting={BounceOut.duration(300).easing(Easing.linear)}
                                        className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full items-center justify-center border-2 border-white">
                                        <Pressable onPress={() => { HandlePutBackInventory(item); }}>
                                            <Text>X</Text>
                                        </Pressable>
                                    </Animated.View>
                                )}

                            </View>
                        </SlotInventory>
                    </View>
                }}
            />

        </SafeAreaView>
    )
}

export default FunFun