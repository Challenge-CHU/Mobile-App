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
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              editable
              placeholder={placeholder}
            />
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                maxWidth: ResponsiveWidth(66.1),
              }}
            >
              <Pressable
                style={[styles.button2, styles.buttonClose]}
                onPress={() => onPress()}
              >
                <Text style={styles.textStyle}>{BtnLabel}</Text>
              </Pressable>
              <Pressable style={styles.button3} onPress={() => onPress()}>
                <Text style={styles.textStyle}>Annuler</Text>
              </Pressable>
            </View>
          </View>
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
    maxWidth: ResponsiveWidth(84),
    position: "relative",
    margin: ResponsiveWidth(2.3),
    backgroundColor: "white",
    borderRadius: ResponsiveHeight(2.3),
    paddingHorizontal: ResponsiveWidth(5),
    paddingVertical: ResponsiveHeight(2.8),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: ResponsiveHeight(1.65),
  },
  button2: {
    borderRadius: ResponsiveHeight(0.9),
    padding: ResponsiveHeight(1.1),
    elevation: 2,
    flex: 2,
  },
  button3: {
    borderRadius: ResponsiveHeight(0.9),
    padding: ResponsiveHeight(1.1),
    elevation: 2,
    flex: 1,
    backgroundColor: "#ADBCBB",
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
    fontSize: ResponsiveHeight(2),
  },
  modalText: {
    // marginBottom: 15,
    fontWeight: "700",
    textAlign: "left",
    fontSize: ResponsiveHeight(1.89),
  },
  input: {
    borderRadius: ResponsiveHeight(1.42),
    paddingHorizontal: ResponsiveHeight(1.42),
    paddingVertical: ResponsiveHeight(0.9),
    width: ResponsiveWidth(66.1),
    borderColor: Colors.colors.blue,
    borderWidth: 2,
    fontSize: ResponsiveHeight(2.3),
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    gap: ResponsiveHeight(1.42),
  },
});

export default CustomModal;
