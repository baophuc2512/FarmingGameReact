import { Slot, Stack } from 'expo-router';
import { Text } from 'react-native';

export default function SubscriptionLayout() {
    return (
        <Stack>
            <Text>Header Subscriptions</Text>
            <Slot/>
        </Stack>
    );
}