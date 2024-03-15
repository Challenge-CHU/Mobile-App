import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import {
  ResponsiveHeight,
  ResponsiveWidth,
} from "../../tools/ResponsiveHeight";
import aspectRatio from "../../tools/AspectRatio";
import { Colors } from "../../styles";
import { useUserStore } from "../../store/useUserStore";
import ModalAnimated from "../../components/ModalAnimated";
import CustomModal from "../../components/Modal";
import { useModalStore } from "../../store/useModalStore";
import { useStepCountStore } from "../../store/useStepCountStore";

const Settings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { updateModalSettings } = useModalStore();
  const { deconexionStepStore } = useStepCountStore();
  const { deconnexionUserStore, userId } = useUserStore();

  const toggleSwitch = () => {
    setIsEnabled((prev) => setIsEnabled(!prev));
  };

  const handlePress = () => {
    updateModalSettings(true);
  };


  const handleDeconnexion = () => {
    deconexionStepStore();
    deconnexionUserStore();
    navigation.navigate("SignUp");
  };

  return (
    <View
      style={{
        paddingHorizontal: ResponsiveHeight(2.8),
        height: "100%",
      }}
    >
      <View
        style={{
          gap: ResponsiveHeight(1.42),
          marginBottom: ResponsiveHeight(2.8),
        }}
      >
        <CustomBtn title="Modifier pseudo" onPress={handlePress} />
        <CustomBtn title="CGU" />
        <CustomBtn
          title="Se Déconnecter"
          style={{ backgroundColor: "red" }}
          onPress={handleDeconnexion}
        />
      </View>
    </View>
  );
};

const CustomBtn = ({ title, onPress, style }) => {
  return (
    <>
      <TouchableOpacity style={[styles.button, { ...style }]} onPress={onPress}>
        <Text
          style={{
            fontSize: aspectRatio(ResponsiveHeight(2.3)),
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.colors.darkblue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ResponsiveHeight(1.42),
    paddingVertical: ResponsiveHeight(1),
  },
});

export default Settings;
