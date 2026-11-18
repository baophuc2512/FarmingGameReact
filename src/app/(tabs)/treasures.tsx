import { DATA_CHEST, ITEM_GAP, ITEM_WIDTH, SNAP_INTERVAL } from "@/constants/data";
import { OpenChest } from "@/constants/openChestManager";
import { SpendMoney } from "@/store/slices/currencySlice";
import { AddItem } from "@/store/slices/inventorySlice";
import LottieView from "lottie-react-native";
import { styled } from "nativewind";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, { cancelAnimation, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { runOnJS } from "react-native-worklets";
import { useDispatch } from "react-redux";
import ChestCard from "../(components)/ChestCard";
import RewardToast from "../(components)/RewardToast";
import AnimButton from "../(components)/animButton";


const SafeAreaView = styled(RNSafeAreaView);

const Treasures = () => {

    const [currentReward, setCurrentReward] = useState<MoneyFarm | null>(null);
    const { width } = useWindowDimensions();
    const scrollX = useSharedValue(0);

    const [selectedIndex, setSelectedIndex] = useState(0); // Index của rương đang chọn
    const selectedChest = DATA_CHEST[selectedIndex];
    const selectedColorChest = useSharedValue<string>(selectedChest.color);


    const chestScale = useSharedValue(1);
    const [isOpening, setIsOpening] = useState(false);
    const [showReward, setShowReward] = useState(false);
    const animationRefs = useRef(new Map<string, LottieView>());


    useEffect(() => {
        selectedColorChest.value = selectedChest.color;
    }, [selectedIndex]);

    useEffect(() => {
        if (isOpening) {
            cancelAnimation(chestScale);
            return;
        }

        chestScale.value = withRepeat(
            withSequence(
                withTiming(1.04, { duration: 600 }),
                withTiming(1, { duration: 600 })
            ),
            -1,
            true
        );

        return () => cancelAnimation(chestScale);
    }, [isOpening]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const dispatch = useDispatch();

    const HandleAddItem = (moneyFarm: MoneyFarm) => {
        dispatch(
            AddItem(moneyFarm)
        );
    }

    const HandleBuyChest = (chest: DataChest) => {
        dispatch(SpendMoney(chest.cost));
    }


    ////////////////// Animation Button
    const animatedOpenButtonStyle = useAnimatedStyle(() => ({
        backgroundColor: withTiming(selectedColorChest.value, {
            duration: 500,
        }),
    }));

    const chestStyle = useAnimatedStyle(() => ({
        transform: [{ scale: chestScale.value }],
    }));

    const playChest = () => {
        animationRefs.current.get(selectedChest.idName)?.play();
    };

    const HandleAnimationChestFinish = () => {
        setIsOpening(false);
        setShowReward(true);
        animationRefs.current.get(selectedChest.idName)?.reset();
    };

    // Final open chest

    const openChest = () => {
        if (isOpening) return;

        setShowReward(false);
        setIsOpening(true);

        const reward = OpenChest(selectedChest);
        HandleAddItem(reward);
        HandleBuyChest(selectedChest);
        setCurrentReward(reward);

        animationRefs.current.get(selectedChest.idName)?.reset();
        runOnJS(playChest)();
    };

    return (
        <SafeAreaView className='flex-1 bg-background'>

            {/* ------------------------------------------------------------------------- */}
            {/* --------------------Phần hiện popup khi mở rương------------------------- */}
            {/* ------------------------------------------------------------------------- */}
            {showReward && (
                <RewardToast reward={currentReward} />
            )}

            <View className="flex-1 bg-background">

                <Text className="text-white text-[25px] font-black text-center">
                    SELECT YOUR CHEST
                </Text>

                <Text className="text-[#9999AA] text-center mt-2.5 mb-[50px]">
                    Choose a chest to discover your rewards
                </Text>

                {/* ------------------------------------------------------------------------- */}
                {/* ------------------------------Phần hiển thị rương------------------------- */}
                {/* ------------------------------------------------------------------------- */}
                <Animated.FlatList
                    data={DATA_CHEST}
                    style={{
                        overflow: 'visible',
                    }}
                    horizontal
                    keyExtractor={(item) => item.idName}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <ChestCard
                            chest={item}
                            index={index}
                            scrollX={scrollX}
                            moreAnimatedStyle={chestStyle}
                            animationRef={(ref) => {
                                if (ref) {
                                    animationRefs.current.set(item.idName, ref);
                                } else {
                                    animationRefs.current.delete(item.idName);
                                }
                            }}
                            onAnimationFinish={HandleAnimationChestFinish}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: ITEM_GAP }} />
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: (width - ITEM_WIDTH) / 2,
                        alignItems: "center",
                    }}
                    snapToInterval={SNAP_INTERVAL}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    onScroll={scrollHandler}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(
                            event.nativeEvent.contentOffset.x /
                            SNAP_INTERVAL
                        );

                        setSelectedIndex(
                            Math.max(0, Math.min(index, DATA_CHEST.length - 1))
                        );
                    }}
                />



                {/* ------------------------------------------------------------------------- */}
                {/* ------------------------------Phần mở rương------------------------------ */}
                {/* ------------------------------------------------------------------------- */}


                <View style={styles.infoContainer}>

                    <Text style={styles.selectedName}>
                        {selectedChest.name}
                    </Text>

                    <Text style={[
                        styles.selectedRarity,
                        { color: selectedChest.color },
                    ]}>
                        {selectedChest.chestRarity}
                    </Text>

                    <View style={styles.dots}>
                        {DATA_CHEST.map((chest, index) => (
                            <View
                                key={chest.idName}
                                style={[
                                    styles.dot,
                                    selectedIndex === index && {
                                        width: 24,
                                        backgroundColor: selectedChest.color,
                                    },
                                ]}
                            />
                        ))}
                    </View>

                    <AnimButton title=""
                        onPress={openChest}
                        style={[
                            styles.openButton,
                            { backgroundColor: selectedChest.color },
                        ]}
                        moreAnimatedStyle={animatedOpenButtonStyle}
                    >
                        <Text style={styles.openButtonText}>
                            OPEN CHEST
                        </Text>
                    </AnimButton>
                </View>
            </View>


        </SafeAreaView>
    )
}

export default Treasures







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151521",
        justifyContent: "center",
        paddingVertical: 30,
    },

    infoContainer: {
        alignItems: "center",
        marginTop: 50,
        paddingHorizontal: 25,
    },

    selectedName: {
        color: "white",
        fontSize: 24,
        fontWeight: "900",
    },

    selectedRarity: {
        fontSize: 14,
        fontWeight: "900",
        marginTop: 8,
        letterSpacing: 3,
    },

    description: {
        color: "#9999AA",
        textAlign: "center",
        marginTop: 15,
    },

    dots: {
        flexDirection: "row",
        gap: 8,
        marginTop: 25,
        alignItems: "center",
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 10,
        backgroundColor: "#555566",
    },

    openButton: {
        width: "80%",
        height: 55,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
    },

    openButtonText: {
        color: "#151521",
        fontSize: 17,
        fontWeight: "900",
        letterSpacing: 1,
    },
});
