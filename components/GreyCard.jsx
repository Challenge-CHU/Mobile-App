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
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const GreyCard = ({ onPress }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View
      style={{
        paddingVertical: ResponsiveHeight(4.2),
        paddingHorizontal: ResponsiveHeight(2.6),
        backgroundColor: "#FAFAFA",
        borderRadius: ResponsiveHeight(0.7),
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        elevation: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: ResponsiveHeight(0.3),
        gap: ResponsiveHeight(1.8),
      }}
    >
      <Text style={{ textAlign: "center" }}>
        Tu n’as pas encore d’amis, ajoute un ami pour suivre sa progression et
        progresser ensemble.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#317DBA",
          paddingHorizontal: ResponsiveHeight(1.4),
          paddingVertical: ResponsiveHeight(0.9),
          flexDirection: "row",
          alignItems: "center",
          gap: ResponsiveHeight(0.7),
          borderRadius: ResponsiveHeight(0.7),
        }}
        onPress={onPress}
      >
        <Image
          source={{ uri: getImageFromCache("plus") }}
          style={{
            objectFit: "contain",
            width: ResponsiveHeight(1.7),
            height: ResponsiveHeight(1.7),
          }}
        />
        <Text
          style={{
            color: "#ffffff",
            fontSize: ResponsiveHeight(1.8),
            fontWeight: "600",
          }}
        >
          Ajouter un ami
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GreyCard;
