import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const InputText = ({
  placeholder,
  translate,
  onChange,
  focus,
  blur,
  active,
}) => {
  const [text, onChangeText] = useState("");
  const [onFocus, onChangeFocus] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (active === "identifiant") {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [active]);

  useEffect(() => {
    if (onChange != undefined) {
      onChange(text);
    }
  }, [text]);

  const handleblur = (e) => {
    if (blur != undefined) {
      blur();
    }
    onChangeFocus(false);
  };
  const handleFocus = (e) => {
    if (focus != !undefined) {
      focus("mdp");
    }
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
                    ? -ResponsiveHeight(15)
                    : -ResponsiveHeight(22),
              },
            ]
          : [{ translateY: 0 }],
      opacity: hide ? 0.3 : 1,
    },
  });

  return (
    <View style={{ position: "relative", zIndex: 99 }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleblur}
        secureTextEntry={true}
      />
    </View>
  );
};

export const InputText2 = ({
  placeholder,
  translate,
  onChange,
  focus,
  blur,
  active,
}) => {
  const [text, onChangeText] = useState("");
  const [onFocus, onChangeFocus] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (active === "mdp") {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [active]);

  useEffect(() => {
    if (onChange != undefined) {
      onChange(text);
    }
  }, [text]);

  const handleblur = (e) => {
    if (blur != undefined) {
      blur();
    }
    onChangeFocus(false);
  };
  const handleFocus = (e) => {
    if (focus != !undefined) {
      focus("identifiant");
    }
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
                    ? -ResponsiveHeight(7)
                    : -ResponsiveHeight(22),
              },
            ]
          : [{ translateY: hide ? ResponsiveHeight(5) : 0 }],
      zIndex: 2,
      opacity: hide ? 0.3 : 1,
      position: "relative",
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

export const InputText3 = ({
  placeholder,
  translate,
  onChange,
  focus,
  blur,
  active,
}) => {
  const [text, onChangeText] = useState("");
  const [onFocus, onChangeFocus] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (active === "identifiant") {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [active]);

  useEffect(() => {
    if (onChange != undefined) {
      onChange(text);
    }
  }, [text]);

  const handleblur = (e) => {
    if (blur != undefined) {
      blur();
    }
    onChangeFocus(false);
  };
  const handleFocus = (e) => {
    if (focus != !undefined) {
      focus("mdp");
    }
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
                    ? -ResponsiveHeight(15)
                    : -ResponsiveHeight(22),
              },
            ]
          : [{ translateY: 0 }],
      opacity: hide ? 0.3 : 1,
    },
  });

  return (
    <View style={{ position: "relative", zIndex: 99 }}>
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
