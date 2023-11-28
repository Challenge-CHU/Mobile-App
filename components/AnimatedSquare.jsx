import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedSquare = () => {
  const colorValue = useSharedValue("red");

  const handlePress = () => {
    // Change la couleur du carré à chaque clic
    colorValue.value = colorValue.value === "red" ? "blue" : "red";
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={[
            styles.square,
            {
              backgroundColor: colorValue,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 100,
    height: 100,
  },
});

export default AnimatedSquare;
