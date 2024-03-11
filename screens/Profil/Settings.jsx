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

const Settings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { updateModalSettings } = useModalStore();

  const toggleSwitch = () => {
    setIsEnabled((prev) => setIsEnabled(!prev));
  };

  const handlePress = () => {
    updateModalSettings(true);
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
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: aspectRatio(ResponsiveHeight(2.3)),
            fontWeight: "700",
          }}
        >
          Notifications
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const CustomBtn = ({ title, onPress }) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
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
