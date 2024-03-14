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
import { ChallengesAPI, UserAPI, setAuthHeader } from "./utils/api";
import { useStepCountStore } from "./store/useStepCountStore";
import NoChallenge from "./screens/NoChallenge";

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
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  useStepCount();
  const [isChall, setIsChall] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const {
    updateDates,
    startDateChallenge,
    endDateChallenge,
    updateStartDate,
    updateEndDate,
    updateIdChall,
  } = useStepCountStore();

  const { updateNotificationToken, token } = useUserStore();

  const FetchChallenge = async () => {
    try {
      const challengesDates = await ChallengesAPI.getActual();

      if (challengesDates.status === 204) {
        updateDates(null, null);
        setIsChall(true);
      }

      setIsChall(true);
      updateStartDate(challengesDates.data.data.start_date);
      updateEndDate(challengesDates.data.data.end_date);
      updateIdChall(challengesDates.data.data.id);

      // console.log("chall: ", challengesDates.data);
      // console.log("chall start: ", challengesDates.data.data.start_date);
      // console.log("chall end: ", challengesDates.data.data.end_date);
    } catch (e) {
      console.log("Error fetch challenges: ", e);
    }
  };

  const FetchUserInfo = async () => {
    //Si il y a un Token alors fetch dessus et skip les ecrans du début
    // setAuthHeader()
    try {
      const response = await UserAPI.getMe();
    } catch (e) {
      console.log("Error Fetch user Root app: ", e);
    }
  };

  useEffect(() => {
    // FetchUserInfo();

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      updateNotificationToken(token);
      console.log("tokennotif: ", token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // console.log("Received");
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("Response");
      });

    //getActual
    FetchChallenge();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    FetchChallenge();
  }, [token]);

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
        <MyTabs isChall={isChall} />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

function MyTabs({ isChall }) {
  const { username } = useUserStore();

  const [isChallenge, setIsChallenge] = useState(false);

  useEffect(() => {
    setIsChallenge(isChall);
  }, [isChall]);

  useEffect(() => {
    setIsChallenge(isChall);
  }, []);

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
      initialRouteName={isChallenge ? "SignUp" : "NoChallenge"}
      // initialRouteName={username != null ? "Home" : "SignUp"}
      // initialRouteName="Splash"
    >
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="AddPseudo" component={AddPseudo} />
      <Tab.Screen name="Social" component={Social} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Splash" component={SplashScreen} />
      <Tab.Screen name="Historical" component={Historical} />
      <Tab.Screen name="NoChallenge" component={NoChallenge} />
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

