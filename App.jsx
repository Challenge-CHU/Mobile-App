import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  NativeEventEmitter,
  NativeModules,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Profil from "./screens/Profil";
import { Colors, Typography } from "./styles";
import TabBar from "./components/Navigation/TabBar";
import Social from "./screens/Social";
import useStepCount from "./hooks/useStepCount";
import { useFonts } from "expo-font";
import SplashScreen from "./components/SplashScreen";
import Historical from "./screens/Historical";

const Tab = createBottomTabNavigator();
let customFonts = {
  // 'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf')
  "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
  "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  "AlegreyaSansSC-Black": require("./assets/fonts/AlegreyaSansSC-Black.ttf"),
  "AlegreyaSansSC-Bold": require("./assets/fonts/AlegreyaSansSC-Bold.ttf"),
  "AlegreyaSansSC-Medium": require("./assets/fonts/AlegreyaSansSC-Medium.ttf"),
  "AlegreyaSansSC-Regular": require("./assets/fonts/AlegreyaSansSC-Regular.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  useStepCount();

  return (
    <>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: { height: 0, margin: 0 },
        tabBarStyle: {
          backgroundColor: Colors.colors.blue,
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderBlockColor: "transparent",
          borderTopWidth: 0,
          shadowRadius: 0,
          shadowOffset: 0,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      initialRouteName="Splash"
    >
      <Tab.Screen name="Social" component={Social} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Splash" component={SplashScreen} />
      <Tab.Screen name="Historical" component={Historical} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
