
import { RootState } from "@/store";
import { SwapSlots } from "@/store/slices/farmingSlotsSlice";
import { PropsWithChildren } from "react";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, ZoomIn } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { useDispatch, useSelector } from "react-redux";

interface SlotInventoryProps extends PropsWithChildren {
    idSlot: number;
}

export default function SlotInventory({idSlot, children}: SlotInventoryProps) {
    const positions = useSelector(
        (state: RootState) => state.slotPositions.idSlotToPosition
    );

    const dispatch = useDispatch();

    const swapEvent = (idSlotFrom : number, idSlotTo : number) => {
        dispatch(SwapSlots({fromIdSlot : idSlotFrom, toIdSlot : idSlotTo}));
    }
    // Tọa độ hiện tại
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // Tọa độ lúc bắt đầu kéo
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    // Nhận diện thao tác kéo
    const panGesture = usePanGesture({
        onUpdate: (event) => {
            translateX.value = startX.value + event.translationX;
            translateY.value = startY.value + event.translationY;
        },
        onDeactivate: (event) => {
            // Cái này phải cần cộng với offSet chuột nữa so với cái component khi Drag nữa
            translateX.value = startX.value;
            translateY.value = startY.value;
            if (positions[idSlot] == null) {
                return;
            }
            
            let minRange = 999999;
            let targetId = null;
            let x = event.translationX + positions[idSlot].x;
            let y = event.translationY + positions[idSlot].y;
            
            for (const [key, pos] of Object.entries(positions)) {
                const i = Number(key);

                if (i === idSlot) continue;
                if (pos == null) continue;

                const distance = (x - pos.x) ** 2 + (y - pos.y) ** 2;

                if (distance < minRange) {
                    minRange = distance;
                    targetId = i;
                }
            }

            if (targetId == null) {
                return;
            }

            runOnJS(swapEvent) (idSlot, targetId); 
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
            <Animated.View entering={ZoomIn.duration(300)}>
                <Animated.View style={animatedStyle}>
                    {children}
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
} 