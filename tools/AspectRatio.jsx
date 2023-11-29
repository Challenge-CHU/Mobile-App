import React from "react";
import { View, StyleSheet, PixelRatio } from "react-native";

const aspectRatio = (fontSize) => {
  const fontScale = PixelRatio.getFontScale();
  const size = fontSize / fontScale;
  return size;
};

export default aspectRatio;
