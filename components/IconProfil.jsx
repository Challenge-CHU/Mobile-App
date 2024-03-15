import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { SvgCssUri } from "react-native-svg";
import { useImageStore } from "../store/useImageStore";
import useProfilIcon from "../hooks/useProfilIcon";

const IconProfil = ({
  onClick,
  id,
  selected,
  onLoad,
  width,
  height,
  disabled,
}) => {
  const { getImageFromCache, fetched } = useImageStore();
  const { profilIcons, getIconById } = useProfilIcon();
  const [img, setImg] = useState(null);

  const handleClick = () => {
    if (onClick != undefined) {
      onClick(id);
    }
  };

  const handleLoad = () => {
    if (onLoad != undefined) {
      onLoad;
    }
  };

  useEffect(() => {
    const imgName = getIconById(id);
    setImg(imgName);
  }, [id]);

  return (
    <TouchableOpacity
      onPress={handleClick}
      disabled={!disabled || disabled === undefined ? false : true}
    >
      <SvgCssUri
        uri={getImageFromCache(img)}
        style={{
          width: width,
          height: height,
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
