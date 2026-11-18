import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default () =>
{
    const { id } = useLocalSearchParams<{id: string}>();
    return <View>
        <Text>My Subscriptions { id }</Text>
    </View>;
};