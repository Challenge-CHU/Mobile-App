import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const InputText = ({ placeholder, translate, onChange }) => {
  const [text, onChangeText] = useState("");
  const [onFocus, onChangeFocus] = useState(false);

  // useEffect(() => {
  //   if (onChangeValue != undefined) {
  //     onChangeValue(text);
  //   }
  // }, [text]);
  useEffect(() => {
    if (onChange != undefined) {
      onChange(text);
    }
  }, [text]);
  const handleblur = (e) => {
    onChangeFocus(false);
  };
  const handleFocus = (e) => {
    onChangeFocus(true);
  };

  const styles = StyleSheet.create({
    input: {
      width: "100%",
      borderRadius: ResponsiveHeight(1.42),
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderWidth: 2,
      borderColor: "#ffffff",
      paddingVertical: 14,
      paddingHorizontal: 14,
      fontSize: 20,
      color: "#ffffff",
      transform:
        onFocus && translate ? [{ translateY: -36 }] : [{ translateY: 0 }],
    },
  });

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleblur}
      />
    </View>
  );
};

export default InputText;
