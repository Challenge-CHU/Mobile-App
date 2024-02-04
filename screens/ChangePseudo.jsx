import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Walky from "../components/Walky";
import BubbleMessage from "../components/BubbleMessage";
import Button from "../components/Button";
import aspectRatio from "../tools/AspectRatio";
import InputText from "../components/InputText";
import { useNavigation } from "@react-navigation/native";
import IconProfil from "../components/IconProfil";
import SplashScreen from "../components/SplashScreen";
import cacheAssetsAsync from "../components/CacheAssetAsync";
import { Asset, useAssets } from "expo-asset";
import { useUserStore } from "../store/useUserStore";
import { useImageStore } from "../store/useImageStore";

const fakedata = [
  { id: 1, url: require("../assets/iconfriend.png"), name: "image1" },
  { id: 2, url: require("../assets/iconfriend.png"), name: "image2" },
  { id: 3, url: require("../assets/iconfriend.png"), name: "image3" },
  { id: 4, url: require("../assets/iconfriend.png"), name: "image4" },
  { id: 5, url: require("../assets/iconfriend.png"), name: "image5" },
  { id: 6, url: require("../assets/iconfriend.png"), name: "imag6" },
  { id: 7, url: require("../assets/iconfriend.png"), name: "image7" },
  { id: 8, url: require("../assets/iconfriend.png"), name: "image8" },
];

const AddPseudo = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const navigation = useNavigation();

  const [pseudo, setPseudo] = useState("brr");
  const [assets, error] = useAssets([require("../assets/iconfriend.png")]);
  const { updateUsername } = useUserStore();
  const { getImageFromCache, fetched } = useImageStore();

  const handleContinue = () => {
    updateUsername(pseudo);
    navigation.navigate("Home");
  };

  const handleLoad = () => {
    setLoadImg((prev) => prev + 1);
  };

  const handleChangePseudo = (pseudo) => {
    console.log("pseudo new: ", pseudo);
    //TODO regex vérifier si la string est vide et si le pseudo est conforme et dispo
    setPseudo(pseudo);
  };

  if (!fetched) {
    return <SplashScreen />;
  }

  return (
    <View>
      <View
        style={{
          height: 341,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 64,
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
            msg={"Je m’apelle Walky, et toi, comment dois-je t’appeler ?"}
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
        <View
          style={{
            marginTop: 32,
            marginBottom: 40,
            // backgroundColor: "red",
            width: "100%",
          }}
        >
          <InputText
            placeholder="Pseudo"
            translate={false}
            onChange={handleChangePseudo}
          />
        </View>

        <View style={{ width: "100%", marginBottom: 64, gap: 14 }}>
          <Text style={styles.text}>Selectionne un Avatar</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {fakedata.map((item) => {
              return (
                <IconProfil
                  key={item.id}
                  url={getImageFromCache("iconfriend")}
                  name={item.name}
                  selected={selectedImg === item.name ? true : false}
                  onClick={(name) => setSelectedImg(name)}
                  onLoad={handleLoad}
                />
              );
            })}
          </View>
        </View>

        <Button title="Se connecter" onPress={handleContinue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
  },
});

export default AddPseudo;
