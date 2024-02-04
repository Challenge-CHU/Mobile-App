import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Walky from "../components/Walky";
import BubbleMessage from "../components/BubbleMessage";
import Button from "../components/Button";
import aspectRatio from "../tools/AspectRatio";
import InputText from "../components/InputText";
import { useNavigation } from "@react-navigation/native";
import { useImageStore } from "../store/useImageStore";
import FirstLoadingScreen from "./FirstLoadingScreen";
import { Asset } from "expo-asset";
import ImageLoader from "../components/ImageLoader";
import SplashScreen from "../components/SplashScreen";

const SignUp = () => {
  const navigation = useNavigation();
  const {
    imageCache,
    getImageFromCache,
    fetched,
    addImageToCache,
    updateFetched,
  } = useImageStore();
  const [img1, setImg1] = useState(null);

  // useEffect(() => {
  //   if (!fetched) ImageLoader();
  // }, []);

  const handleConnect = () => {
    navigation.navigate("AddPseudo");
  };

  if (!fetched) return <SplashScreen />;

  return (
    <PlateformSafeView>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          height: "14%",
          paddingHorizontal: 40,
          marginTop: 42,
        }}
      >
        <View
          style={{
            width: 150,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: getImageFromCache("new-chu-blc") }}
            style={{ objectFit: "contain", width: "100%", height: 72 }}
          />
        </View>
        <View
          style={{
            width: 150,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: getImageFromCache("new-cesi-blc") }}
            // source={require("../assets/new-cesi-blc.png")}
            style={{ objectFit: "contain", width: "100%", height: 72 }}
          />
        </View>
      </View>

      <View
        style={{
          height: 341,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginHorizontal: "10%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            transform: "translateY(-80px)",
          }}
        >
          <BubbleMessage
            msg={
              "Bienvenue sur le challenge des 10 000 pas ! Connecte toi pour débuter l'aventure."
            }
          />
          <View style={{ position: "absolute", top: 12, right: -65 }}>
            <Walky />
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40,
          flexDirection: "column",
          // height: "22%",
        }}
      >
        <View style={{ marginTop: 32, marginBottom: 40, gap: 16 }}>
          <InputText placeholder="Mot de passe" translate={true} />
          <Text style={styles.text}>
            Ces informations vous ont été envoyées par le CHU à la suite de
            votre inscription au challenge
          </Text>
        </View>

        <Button title="Se connecter" onPress={handleConnect} />
        {/* input 1 et 2 */}
        {/* petit texte */}
        {/* Bouton */}
      </View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: aspectRatio(16),
  },
});

export default SignUp;
