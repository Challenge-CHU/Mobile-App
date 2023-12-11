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
import aspectRatio from "./tools/AspectRatio";
import TabBar from "./components/Navigation/TabBar";
import Social from "./screens/Social";

const Tab = createBottomTabNavigator();

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
      initialRouteName="Home"
    >
      <Tab.Screen name="Social" component={Social} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
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
