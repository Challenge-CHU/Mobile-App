import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import { useImageStore } from "../store/useImageStore";

const GreyCard = () => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View
      style={{
        paddingVertical: 36,
        paddingHorizontal: 22,
        backgroundColor: "#FAFAFA",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        elevation: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        gap: 16,
      }}
    >
      <Text style={{ textAlign: "center" }}>
        Tu n’as pas encore d’amis, ajoute un ami pour suivre sa progression et
        progresser ensemble.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#317DBA",
          paddingHorizontal: 12,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          borderRadius: 6,
        }}
      >
        <Image
          source={{ uri: getImageFromCache("plus") }}
          style={{
            objectFit: "contain",
            width: 15,
            height: 15,
          }}
        />
        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
          Ajouter un ami
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GreyCard;
