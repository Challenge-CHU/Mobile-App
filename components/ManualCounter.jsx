import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

//Test pour animation COOL

const ManualCounter = ({ int }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.loop(translateY, {
  //     toValue: -40 + -1, // Ajoutez 1 pour le décalage initial
  //     duration: 1000,
  //   }).start();
  // }, [translateY]);

  const numString = int.toString();
  const charArray = numString.split("");
  const intArray = charArray.map((char) => parseInt(char, 10));
  console.log("int: ", intArray);

  return (
    <View style={styles.container}>
      {intArray.map((number, idx) => {
        // console.log(number)
        return (
          <RangeNumber
            key={idx}
            int={number}
            styled={{
              transform: [{ translateY }],
            }}
          />
        );
      })}
    </View>
  );
};

const RangeNumber = ({ int, styled }) => {
  const [currentNumber, setCurrentNumber] = useState();

  const positions = [
    "-14px",
    "-29px",
    "-43.5px",
    "-58px",
    "-72.5px",
    "-87px",
    "-101.8px",
    "-116.5px",
    "-131.5px",
    "-146px",
  ];
  console.log("int: ", styled);
  console.log("int: ", positions[int + 1]);

  // let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let numbers = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View
      style={{
        height: 12,
        overflow: "visible",
        backgroundColor: "red",
      }}
    >
      <Animated.View style={styled}>
        {numbers.map((int, idx) => {
          return (
            <Animated.Text
              key={idx}
              style={{
                fontSize: 12,
                color: "black",
                transition: ".3s",
                // transform: "translateY(-14px)",
                alignItems: "center",
              }}
            >
              {int}
            </Animated.Text>
          );
        })}
      </Animated.View>
      {/* <View
        style={{
          transform: `translateY(${positions[int]})`,
          transition: ".3s",
          // transform: "translateY(-14px)",
          alignItems: "center",
        }}
      >
        {numbers.map((int, idx) => {
          return (
            <Text key={idx} style={{ fontSize: 12 }}>
              {int}
            </Text>
          );
        })}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  counterText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "blue",
  },
});

export default ManualCounter;
