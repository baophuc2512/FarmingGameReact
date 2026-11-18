import { TabIconProps, TabsData } from "@/constants/tabs";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { styled } from "react-native-css";
import { SafeAreaView as RNSafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MoneyHeader from "../(components)/MoneyHeader";

const SafeAreaView = styled(RNSafeAreaView);

const TabLayout = () => {
    const insets = useSafeAreaInsets();
    const TabIcon = ({ focused, icon }: TabIconProps) => {
        const Icon = icon;

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: 50,
                        backgroundColor: focused ? '#6366f1' : 'transparent',
                        marginBottom: 5,
                    }}
                />

                <Icon
                    size={24}
                    color={focused ? '#6366f1' : '#9ca3af'}
                />
            </View>
        );
    };

    return <Tabs screenOptions={{
        headerShown: true, tabBarShowLabel: false,
        header: () => (
            <SafeAreaView edges={['top']} className="bg-background">
                <View className="px-5 pt-4 pb-4 border-b border-[#34394A]">
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-gray-400 text-2xl">
                                My Fucking Farm Game
                            </Text>
                        </View>

                        <MoneyHeader />
                    </View>
                </View>
            </SafeAreaView>
        ),

        tabBarStyle: {
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            backgroundColor: '#292D3E',
            borderTopWidth: 0,
        },

        tabBarIconStyle: {
            marginTop: 0,
        },
    }}>
        {TabsData.map((tab) => (
            <Tabs.Screen
                key={tab.name}
                name={tab.name}
                options={{
                    title: tab.title,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={tab.icon} />
                    )
                }} />
        ))}
    </Tabs>
}

export default TabLayout