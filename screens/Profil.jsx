import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import { Colors } from "../styles";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import ProfilHome from "./Profil/ProfilHome";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigation,
  useNavigationContext,
} from "@react-navigation/native";
import Settings from "./Profil/Settings";
import ProfilNavigationHeader from "../components/Navigation/ProfilNavigationHeader";

const ProfilStack = createStackNavigator();

const ProfilStackNavigator = () => (
  <ProfilStack.Navigator
    screenOptions={{
      header: (props) => {
        return <ProfilNavigationHeader {...props} />;
      },
      cardOverlayEnabled: true,
      // animationEnabled: true,
      animationEnabled: false,
      headerMode: "float",
    }}
  >
    <ProfilStack.Screen
      name="ProfilHome"
      component={ProfilHome}
      options={{
        cardStyle: {
          overflow: "visible",
          backgroundColor: "#ffffff",
        },
        presentation: "card",
        animationEnabled: false,
      }}
    />
    <ProfilStack.Screen
      name="Settings"
      component={Settings}
      options={{
        cardStyle: {
          overflow: "visible",
          backgroundColor: "#ffffff",
        },
      }}
    />
    <ProfilStack.Screen
      name="Badges/:id"
      component={Settings}
      options={{
        cardStyle: {
          overflow: "visible",
          backgroundColor: "#ffffff",
        },
      }}
    />
  </ProfilStack.Navigator>
);

const Profil = () => {
  const navigation = useNavigation();
  // const navigationContext = useNavigationContext();
  const changeContent = () => {
    navigation.navigate("Settings");
  };

  useEffect(() => {
    navigation.navigate("ProfilHome");
  }, []);

  return (
    <>
      <PlateformSafeView
        styles={{
          backgroundColor: Colors.colors.blue,
          height: "100%",
          marginBottom: ResponsiveHeight(1.4),
        }}
      >
        <View
          style={{
            backgroundColor: Colors.colors.blue,
            height: ResponsiveHeight(13),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: ResponsiveWidth(8.2),
            gap: ResponsiveHeight(2.84),
            // backgroundColor: "red",
          }}
        >
          <Image
            source={require("../assets/iconfriend.png")}
            style={{
              width: ResponsiveWidth(19.2),
              height: ResponsiveHeight(10.9),
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              color: "#FFFFFF",
              fontSize: ResponsiveHeight(3.08),
              fontWeight: "600",
            }}
          >
            Pseudo
          </Text>
          <TouchableOpacity onPress={changeContent}>
            <Image
              source={require("../assets/setting-wheel.png")}
              style={{
                width: ResponsiveWidth(5.8),
                height: ResponsiveHeight(2.8),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </PlateformSafeView>
      <BottomSheet
        styles={{
          height: ResponsiveHeight(75),
          padding: 0,
        }}
      >
        {/* <BottomSheetNavigator /> */}
        <ProfilStackNavigator />
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({});

export default Profil;
