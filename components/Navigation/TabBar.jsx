import { View, TouchableOpacity, Text, Platform } from "react-native";
import aspectRatio from "../../tools/AspectRatio";
import { Colors } from "../../styles";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ResponsiveHeight,
  ResponsiveWidth,
} from "../../tools/ResponsiveHeight";

function TabBar({ state, descriptors, navigation, route }) {
  const blueTheme = {
    background: Colors.colors.blue,
    text: Colors.colors.white,
  };
  const whiteTheme = {
    background: Colors.colors.white,
    text: Colors.colors.blue,
  };

  const focusedRoute = state.routes[state.index].name;

  return (
    <View
      style={{
        flexDirection: "row",
        height: "auto",
        height: ResponsiveHeight(7.58),
        backgroundColor:
          focusedRoute === "Home"
            ? blueTheme.background
            : whiteTheme.background,
        // backgroundColor: "red",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              opacity: isFocused ? 0.55 : 1,
              marginBottom: ResponsiveHeight(2.84),
              // Platform.OS === "ios" ? aspectRatio(24) : aspectRatio(8),
              gap: ResponsiveWidth(1.03),
            }}
            key={index}
          >
            <Text
              style={{
                color:
                  focusedRoute === "Home" ? blueTheme.text : whiteTheme.text,
                fontSize: ResponsiveHeight(2.84),
                // Platform.OS === "ios" ? aspectRatio(24) : aspectRatio(20),
                fontWeight: "700",
              }}
            >
              {label}
            </Text>

            <View
              style={{
                width: focusedRoute === label ? "50%" : 0,
                height: 2,
                borderRadius: 24,
                backgroundColor:
                  focusedRoute === "Home" ? blueTheme.text : whiteTheme.text,
                alignSelf: "center",
              }}
            ></View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default TabBar;
