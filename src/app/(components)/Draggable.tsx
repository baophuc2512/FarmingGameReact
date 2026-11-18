import { PropsWithChildren } from "react";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface DraggableProps extends PropsWithChildren {
    x?: number;
    y?: number;
}

export default function Draggable({ children, x = 0, y = 0 }: DraggableProps) {
    // Tọa độ hiện tại
    const translateX = useSharedValue(x);
    const translateY = useSharedValue(y);

    // Tọa độ lúc bắt đầu kéo
    const startX = useSharedValue(x);
    const startY = useSharedValue(y);

    // Nhận diện thao tác kéo
    const panGesture = usePanGesture({
        onActivate: (event) => {
            startX.value = translateX.value;
            startY.value = translateY.value;
        },
        onUpdate: (event) => {
            translateX.value = startX.value + event.translationX;
            translateY.value = startY.value + event.translationY;
        }
    });

    // Cập nhật vị trí giao diện
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </GestureDetector>
    );
}