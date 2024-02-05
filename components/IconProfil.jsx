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
          width: ResponsiveHeight(6.9),
          height: ResponsiveHeight(8.5),
          opacity: selected ? 0.5 : 1,
        }}
        resizeMode="contain"
        onLoad={handleLoad}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default IconProfil;
