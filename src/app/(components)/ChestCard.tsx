import { ITEM_WIDTH, SNAP_INTERVAL } from "@/constants/data";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/v3/types";
import Animated, { AnimatedStyle, Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

interface ChestCardProps {
    chest: DataChest;
    index: number;
    scrollX: SharedValue<number>;
    moreAnimatedStyle?: AnimatedStyle<ViewStyle>;
    animationRef: React.Ref<LottieView>;
    onAnimationFinish: (isCancelled: boolean) => void;
}

export default function ChestCard({ chest, index, scrollX, moreAnimatedStyle, onAnimationFinish, animationRef }: ChestCardProps) {

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            [
                (index - 1) * SNAP_INTERVAL,
                index * SNAP_INTERVAL,
                (index + 1) * SNAP_INTERVAL,
            ],
            [0.78, 1, 0.78],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            [
                (index - 1) * SNAP_INTERVAL,
                index * SNAP_INTERVAL,
                (index + 1) * SNAP_INTERVAL,
            ],
            [0.45, 1, 0.45],
            Extrapolation.CLAMP
        );

        const translateY = interpolate(
            scrollX.value,
            [
                (index - 1) * SNAP_INTERVAL,
                index * SNAP_INTERVAL,
                (index + 1) * SNAP_INTERVAL,
            ],
            [20, 0, 20],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { scale },
                { translateY },
            ],
            opacity,
        };
    });

    return (
        <Animated.View
            style={[
                styles.chestCard,
                animatedStyle,
                { borderColor: chest.color },
            ]}
        >
            <Animated.View
                style={[
                    styles.chestImage,
                    { backgroundColor: chest.color + "25" },
                    moreAnimatedStyle,
                ]}
            >
                <LottieView
                    ref={animationRef}
                    source={require('@/assets/lotties/money.json')}
                    style={{ width: "100%", height: "100%" }}
                    autoPlay = {false}
                    loop = {false}
                    onAnimationFinish = {onAnimationFinish}
                />
                <View
                    style={[
                        styles.chestBase,
                        { backgroundColor: chest.color },
                    ]}
                />
            </Animated.View>

            <Text style={styles.chestName}>
                {chest.name}
            </Text>

            <Text style={[
                styles.rarity,
                { color: chest.color },
            ]}>
                {chest.chestRarity.toString()}
            </Text>
        </Animated.View>
    );
}


const styles = StyleSheet.create({

    chestCard: {
        width: ITEM_WIDTH,
        height: 280,
        borderRadius: 24,
        borderWidth: 2,
        backgroundColor: "#222231",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },

    chestImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    chestEmoji: {
        fontSize: 85,
    },

    chestBase: {
        width: 90,
        height: 8,
        borderRadius: 10,
        marginTop: 5,
    },

    chestName: {
        color: "white",
        fontWeight: "800",
        fontSize: 19,
    },

    rarity: {
        fontSize: 12,
        fontWeight: "900",
        marginTop: 8,
        letterSpacing: 2,
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