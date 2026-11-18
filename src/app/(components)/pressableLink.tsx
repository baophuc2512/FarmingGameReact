import "@/global.css";
import { Href, router } from "expo-router";
import { Pressable, Text, ViewProps } from "react-native";

interface PressableLinkProps extends ViewProps {
  className?:string;  
  link: Href;
  textButton: string;
}

const PressableLink = ({ link, textButton, className, ...props } : PressableLinkProps) => {
  return (
    <Pressable className={className ?? "bg-blue-500 active:bg-blue-700 disabled:bg-gray-400 p-4 rounded-lg"} {...props} onPress={() => {router.push(link)}}>
        <Text className="text-white p-4">
          {textButton}
        </Text>
    </Pressable>
  )
}

export default PressableLink