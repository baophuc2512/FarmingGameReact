
import { useEffect, useRef } from "react";
import {
    Animated,
    Text,
    View
} from "react-native";

interface RewardToastProps {
    reward: MoneyFarm | null;
}

const RewardToast = ({ reward }: RewardToastProps) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        if (!reward) return;

        opacity.setValue(0);
        translateY.setValue(-30);

        const animation = Animated.sequence([
            // Show popup
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true
                })
            ]),

            // Keep popup visible
            Animated.delay(2200),

            // Hide popup
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true
                }),
                Animated.timing(translateY, {
                    toValue: -30,
                    duration: 250,
                    useNativeDriver: true
                })
            ])
        ]);

        animation.start();

        return () => animation.stop();
    }, [reward, opacity, translateY]);

    if (!reward) return null;

    return (
        <Animated.View
            pointerEvents="none"
            style={{
                position: "absolute",
                top: 60,
                alignSelf: "center",
                opacity,
                transform: [{ translateY }],
                zIndex: 999
            }}
        >
            <View
                style={{
                    backgroundColor: "#18181b",
                    borderWidth: 2,
                    borderColor: "#eab308",
                    borderRadius: 16,
                    paddingHorizontal: 24,
                    paddingVertical: 14,
                    alignItems: "center",

                    // Shadow Android
                    elevation: 10,

                    // Shadow iOS
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                }}
            >

                <Text className="text-yellow-400 font-bold text-xs">
                    CHEST OPENED!
                </Text>

                <Text className="text-white font-bold text-lg mt-1">
                    {reward.name}
                </Text>

                <Text className="text-yellow-300 font-semibold">
                    {reward.bonusBuff}
                </Text>

                <Text className="text-yellow-300 font-semibold">
                    {reward.rarity}
                </Text>
            </View>
        </Animated.View>
    );
};

export default RewardToast;
