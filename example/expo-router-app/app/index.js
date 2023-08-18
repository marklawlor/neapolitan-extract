import { Text, View } from "react-native";
import { title, subtitle, container, main } from "styles/app.css";

export default function Page() {
  return (
    <View className={container}>
      <View className={main}>
        <Text className={title}>Hello World</Text>
        <Text className={subtitle}>This is the first page of your app.</Text>
      </View>
    </View>
  );
}
