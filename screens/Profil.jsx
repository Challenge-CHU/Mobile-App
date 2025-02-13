import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { UserAPI } from "../utils/api.jsx";
import { useAssets } from "expo-asset";
import PlateformSafeView from "../components/PlateformSafeView";
import { Colors } from "../styles";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import ProfilHome from "./Profil/ProfilHome";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Settings from "./Profil/Settings";
import ProfilNavigationHeader from "../components/Navigation/ProfilNavigationHeader";
import BadgeDetail from "./Profil/BadgeDetail";
import { useUserStore } from "../store/useUserStore.jsx";
import SplashScreen from "../components/SplashScreen.jsx";
import { useImageStore } from "../store/useImageStore.jsx";
import ModalAnimated from "../components/ModalAnimated.jsx";
import { useModalStore } from "../store/useModalStore.jsx";
import IconProfil from "../components/IconProfil.jsx";

const ProfilStack = createStackNavigator();

const ProfilStackNavigator = ({ handleVisibleModal }) => (
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
      name="Badges"
      component={BadgeDetail}
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
  const { username, profilIcon } = useUserStore();
  const [usernameActive, setUsernameActive] = useState("");
  const { getImageFromCache, imageCache } = useImageStore();

  const [icn, setIcn] = useState(1);

  const { isModalSettingsOpen, updateModalSettings } = useModalStore();
  const [text, onChangeText] = useState(pseudo);
  const { updateUsername, userId, pseudo } = useUserStore();

  const handlePress = async () => {
    try {
      const res = await handlePutUser();
      updateUsername(text);
      updateModalSettings(false);
    } catch (e) {
      console.log("Error change pseudo");
    }

    // setModalVisible((prev) => !prev);
  };

  const handlePutUser = async () => {
    try {
      let user = {
        // avatar_id: `${selectedImg}`,
        pseudo: text,
        // identifier: identifier,
        // firebase_device_token: notificationToken,
      };

      const response = await UserAPI.putUser(userId, user);
      return true;
    } catch (e) {
      console.log("Error Put User: ", e);
      return false;
    }
  };

  const changeContent = () => {
    navigation.navigate("Settings");
  };

  useEffect(() => {
    navigation.navigate("ProfilHome");
  }, []);
  useEffect(() => {
    setIcn(profilIcon);
  }, [profilIcon]);

  useEffect(() => {}, [username]);

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
          }}
        >
          <IconProfil
            disabled={true}
            width={ResponsiveWidth(19.2)}
            height={ResponsiveHeight(10.9)}
            id={profilIcon}
            selected={false}
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
            {username}
          </Text>
          <TouchableOpacity onPress={changeContent}>
            <Image
              source={{ uri: getImageFromCache("setting-wheel") }}
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
        <ProfilStackNavigator />
      </BottomSheet>
      <ModalAnimated
        text="Veuillez entrer le pseudo de votre ami."
        placeholder="Pseudo"
        onPress={() => updateModalSettings(false)}
        modalVisible={isModalSettingsOpen}
        onChangeText={onChangeText}
        BtnLabel="Changer"
        onValidate={handlePress}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Profil;
