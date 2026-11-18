import { RootState } from '@/store';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import AnimButton from './animButton';

const MoneyHeader = () => {
    const scale = useSharedValue(1);

    const currentMoney = useSelector(
        (state: RootState) => state.currency.money
    );

    useEffect(() => {
        scale.value = withSequence(
            withTiming(1.3, { duration: 150 }),
            withSpring(1)
        );
    }, [currentMoney]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimButton className='bg-card rounded-full active:bg-[#FFD45C]' title=''>
            <Animated.Text className="text-[#FFD45C] font-bold text-center" style={animatedStyle}>
                ${currentMoney.toString()}
            </Animated.Text>
        </AnimButton>
    )
}

export default MoneyHeader