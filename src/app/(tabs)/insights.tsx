import LottieView from "lottie-react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

const Insights = () => {
  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <LottieView
        source={require('@/assets/lotties/money.json')}
        style={{width: "100%", height: "100%"}}
        autoPlay
        loop
      />
    </SafeAreaView>
  )
}

export default Insights