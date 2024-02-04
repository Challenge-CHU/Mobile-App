import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";

const IconProfil = ({ url, onClick, name, selected, onLoad }) => {
  const handleClick = () => {
    if (onClick != undefined) {
      onClick(name);
    }
  };

  const handleLoad = () => {
    if (onLoad != undefined) {
      onLoad;
    }
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <Image
        // source={url}
        source={{ uri: url }}
        style={{
          width: 59,
          height: 72,
          opacity: selected ? 0.5 : 1,
          // width: ResponsiveWidth(19.2),
          // height: ResponsiveHeight(10.9),
        }}
        resizeMode="contain"
        onLoad={handleLoad}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default IconProfil;
