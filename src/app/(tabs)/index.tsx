import { HOME_BALANCE, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import "@/global.css";
import dayjs from 'dayjs';
import { styled } from "nativewind";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import ListHeading from "../(components)/ListHeading";
import UpcomingSubscriptionCard from "../(components)/UpcomingSubscriptionCard";

const SafeAreaView = styled(RNSafeAreaView);

export default () => {

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>



      <View className="home-header">
        <View className="home-user">
          <Image className="home-avatar">
          </Image>

          <Text className="home-user-name">
            {HOME_USER.name}
          </Text>

          <Image className="home-add-icon">

          </Image>
        </View>
      </View>



      <View className="home-balance-card">
        <Text className="home-balance-label"> Balance </Text>

        <View className="home-balance-row">
          <Text className="home-balance-amount">
            {HOME_BALANCE.amount}
          </Text>
          <Text className="home-balance-date">
            {dayjs(HOME_BALANCE.nextRenewalData).format('MM/DD')}
          </Text>
        </View>
      </View>



      <View>
        <ListHeading title="Upcoming"/>
        <FlatList 
          data={UPCOMING_SUBSCRIPTIONS}
          renderItem={({item}) => (
            <UpcomingSubscriptionCard {...item} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Text> No upcoming renewals yet </Text>}
        />
      </View>

      
      <View>
        <ListHeading title="All Subscriptions"/>
      </View>

    </SafeAreaView>
  );
}