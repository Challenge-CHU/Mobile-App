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
import CustomModal from "../../components/Modal";

const Settings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");

  const toggleSwitch = () => {
    setIsEnabled((prev) => setIsEnabled(!prev));
  };

  return (
    <View
      style={{
        paddingHorizontal: ResponsiveHeight(2.8),
      }}
    >
      <CustomModal
        text="Veuillez entrer le pseudo de votre ami que vous souhaitez ajouter"
        placeholder="Pseudo"
        onPress={() => setModalVisible((prev) => !prev)}
        modalVisible={modalVisible}
        onChangeText={onChangeText}
        BtnLabel="Changer de pseudo"
      />

      <View
        style={{
          gap: ResponsiveHeight(1.42),
          marginBottom: ResponsiveHeight(2.8),
        }}
      >
        <CustomBtn
          title="Modifier pseudo"
          onPress={() => setModalVisible(true)}
        />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    // opacity: 0.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    // backgroundColor: "red",
    borderRadius: 20,
    // padding: 35,
    paddingHorizontal: ResponsiveWidth(8.2),
    paddingVertical: ResponsiveHeight(2.8),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: ResponsiveHeight(1.42),
  },
  button2: {
    borderRadius: ResponsiveHeight(1.42),
    padding: ResponsiveHeight(1.1),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    fontSize: ResponsiveHeight(1.89),
  },
  input: {
    borderRadius: ResponsiveHeight(1.42),
    paddingHorizontal: 12,
    paddingVertical: 8,
    // borderBlockColor: Colors.colors.blue,
    width: ResponsiveWidth(47.9),
    // width: "100%",
    borderColor: Colors.colors.blue,
    borderWidth: 2,
    // flexGrow: 0,
    fontSize: 20,
  },
  inputContainer: {
    width: "100%",
    // backgroundColor: "green",
  },
});

export default Settings;
