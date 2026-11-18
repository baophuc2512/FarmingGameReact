
import { Pressable, PressableProps, ViewStyle } from 'react-native';

import Animated, { AnimatedStyle, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type AnimButtonProps = PressableProps & {
    title: string;
    children: React.ReactNode;
    moreAnimatedStyle?: AnimatedStyle<ViewStyle>;
};

const _spacing = 8;
const _buttonHeight = 42;
export default function AnimButton({ children, style, title, moreAnimatedStyle, ...rest }: AnimButtonProps) {
    // Pressable Shared Value Anim
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);

    // Content Shared Value Anim
    const contentScale = useSharedValue(1);
    const contentOpacity = useSharedValue(1);
    const textColorProgress = useSharedValue(0);

    // AnimatedStyle
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateY: translateY.value },
        ],
    }));

    const animatedContentStyle = useAnimatedStyle(() => ({
        transform: [{ scale: contentScale.value }],
    }));

    const animatedTitleStyle = useAnimatedStyle (() => ({
        transform: [{ scale: contentScale.value }],
        opacity: contentOpacity.value,
        color: interpolateColor(
            textColorProgress.value,
            [0, 1],
            ['#FFFFFF', '#808080']
        ),
    }));

    return (
        <AnimatedPressable style={[{
            height: _buttonHeight,
            borderRadius: _buttonHeight / 2,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: _spacing * 2,
        }, style, animatedStyle, moreAnimatedStyle]}
            onPressIn={(event) => {
                scale.value = withSpring(0.94, {
                    damping: 10,
                    stiffness: 350,
                    mass: 0.5,
                });
                translateY.value = withSpring(2);


                contentScale.value = withSpring(1);
                textColorProgress.value = withSpring(1);
                contentOpacity.value = withTiming(1);

                rest.onPressIn?.(event);
            }}
            onPressOut={(event) => {
                scale.value = withSpring(1, {
                    damping: 7,
                    stiffness: 300,
                    mass: 0.5,
                });
                translateY.value = withSpring(0);

                contentScale.value = withSpring(1);
                textColorProgress.value = withSpring(0);
                contentOpacity.value = withTiming(1);

                rest.onPressOut?.(event);
            }}
            {...rest}>
            <Animated.View style={[animatedContentStyle]}>
                {title !== "" && (
                    <Animated.Text style={animatedTitleStyle}>
                        {title}
                    </Animated.Text>
                )}
                {children}
            </Animated.View>
        </AnimatedPressable>
    )
}
