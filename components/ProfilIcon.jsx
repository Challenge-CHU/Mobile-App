import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

const ProfilIcon = ({ width, heigth, id }) => {
  const [img, setImg] = useState(null);

  useEffect(() => {
    switch (id) {
      case 1:
        setImg("cheval");
        break;
      case 2:
        setImg("crocodile");
        break;
      case 3:
        setImg("elan");
        break;
      case 4:
        setImg("koala");
        break;
      case 5:
        setImg("lapin");
        break;
      case 6:
        setImg("lion");
        break;
      case 7:
        setImg("pinguin");
        break;
      case 7:
        setImg("tigre");
        break;
      default:
        break;
    }
  }, [id]);

  const {
    imageCache,
    getImageFromCache,
    fetched,
    addImageToCache,
    updateFetched,
  } = useImageStore();
  return (
    <>
      <Image
        source={{ uri: getImageFromCache(img) }}
        style={{ objectFite: "contain", width: width, heigth: heigth }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ProfilIcon;
