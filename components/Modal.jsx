import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  Button,
  Modal,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import aspectRatio from "../tools/AspectRatio";
import { Colors } from "../styles";

/**
 * La Modal
 *
 * Champs:
 *
 * text
 * input:
 *  -Valeur
 *  - Placeholder
 *
 * Button:
 *  - Label
 *  - function onPress + fermer la modal
 *
 * Ajouter un croix
 */

const CustomModal = ({
  text,
  modalVisible,
  placeholder,
  onPress,
  onChangeText,
  value,
  BtnLabel,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              width: "100%",
              // backgroundColor: "red",
              alignSelf: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => onPress()}>
              <Image
                source={require("../assets/close-cross.png")}
                style={{
                  objectFit: "contain",
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              editable
              placeholder={placeholder}
            />
          </View>
          <Pressable
            style={[styles.button2, styles.buttonClose]}
            onPress={() => onPress()}
          >
            <Text style={styles.textStyle}>{BtnLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    position: "relative",
    margin: ResponsiveWidth(2.3),
    backgroundColor: "white",
    borderRadius: ResponsiveHeight(2.3),
    paddingHorizontal: ResponsiveWidth(5),
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

export default CustomModal;
