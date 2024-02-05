import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const InputText = ({ placeholder, translate, onChange }) => {
  const [text, onChangeText] = useState("");
  const [onFocus, onChangeFocus] = useState(false);

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
      borderWidth: ResponsiveHeight(0.2),
      borderColor: "#ffffff",
      paddingVertical: ResponsiveHeight(1.6),
      paddingHorizontal: ResponsiveHeight(1.6),
      fontSize: ResponsiveHeight(2.3),
      color: "#ffffff",
      transform:
        onFocus && translate
          ? [
              {
                translateY:
                  Platform.OS === "ios"
                    ? -ResponsiveHeight(11.8)
                    : -ResponsiveHeight(22),
              },
            ]
          : [{ translateY: 0 }],
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
