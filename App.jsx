import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform } from "react-native";
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
import SignUp from "./screens/SignUp";
import { useUserStore } from "./store/useUserStore";
import AddPseudo from "./screens/ChangePseudo";
import ImageLoader from "./components/ImageLoader";
import React, { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as Device from "expo-device";
import Constants from "expo-constants";

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND_NOTIFICATION_TASK";
//

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log("Received a notification in the background!");
    // Do something with the notification data
    if (error) {
      console.log("error occurred");
    }
    if (data) {
      console.log("data-----", data);
    }
  }
);

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  useStepCount();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // const handleIt = async () => {
  //   const isRegistered = await TaskManager.isTaskRegisteredAsync(
  //     BACKGROUND_NOTIFICATION_TASK
  //   );
  //   console.log("[handle it]: ", isRegistered);
  // };

  useEffect(() => {
    // handleIt();
    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Received");
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Response");

        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <NavigationContainer
        theme={{
          colors: {
            background: Colors.colors.blue,
          },
        }}
      >
        <ImageLoader />
        <MyTabs />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

function MyTabs() {
  const { username } = useUserStore();

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
      initialRouteName={username != null ? "Home" : "SignUp"}
      // initialRouteName="Splash"
    >
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="AddPseudo" component={AddPseudo} />
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

