import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Walky, { Walky2 } from "../components/Walky";
import BubbleMessage from "../components/BubbleMessage";
import Button from "../components/Button";
import aspectRatio from "../tools/AspectRatio";
import InputText, { InputText3 } from "../components/InputText";
import { useNavigation } from "@react-navigation/native";
import IconProfil from "../components/IconProfil";
import SplashScreen from "../components/SplashScreen";
import { Asset, useAssets } from "expo-asset";
import { useUserStore } from "../store/useUserStore";
import { useImageStore } from "../store/useImageStore";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";
import { useStepCountStore } from "../store/useStepCountStore";

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

  const [pseudo, setPseudo] = useState("");
  const [assets, error] = useAssets([require("../assets/iconfriend.png")]);
  const { updateUsername } = useUserStore();
  const { getImageFromCache, fetched } = useImageStore();
  const [onFocus, setOnFocus] = useState(false);

  const { steps, allSteps, weekSteps } = useStepCountStore();

  console.log("Daily: ", steps);
  console.log("Weeks: ", weekSteps);
  console.log("All: ", allSteps);

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
          height: ResponsiveHeight(40.2),
          alignItems: "center",
          justifyContent: "center",
          marginTop: ResponsiveHeight(5.5),
        }}
      >
        <View
          style={{
            marginHorizontal: "10%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            transform: `translateY(-${ResponsiveHeight(9.4)}px)`,
          }}
        >
          <BubbleMessage
            msg={"Je m’apelle Walky, et toi, comment dois-je t’appeler ?"}
          />
          <View
            style={{
              position: "absolute",
              top: ResponsiveHeight(4),
              right: -ResponsiveHeight(7.7),
            }}
          >
            <Walky
              width={ResponsiveHeight(30.5)}
              height={ResponsiveHeight(40.1)}
              mode="idle"
            />
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: ResponsiveHeight(4.7),
          flexDirection: "column",
          zIndex: 3,
        }}
      >
        <View
          style={{
            marginTop: ResponsiveHeight(3.7),
            marginBottom: ResponsiveHeight(4.7),
            width: "100%",
            zIndex: 3,
          }}
        >
          <InputText3
            placeholder="Pseudo"
            translate={false}
            onChange={handleChangePseudo}
            active={onFocus}
            blur={() => setOnFocus(false)}
            focus={(param) => setOnFocus(param)}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginBottom: ResponsiveHeight(3.5),
            gap: ResponsiveHeight(1.6),
            zIndex: 1,
          }}
        >
          <Text style={styles.text}>Selectionne un Avatar</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: ResponsiveHeight(2.3),
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
      {/* <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#000000",
          opacity: onFocus ? 0.5 : 0,
        }}
      ></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: aspectRatio(ResponsiveHeight(2.1)),
    fontWeight: "600",
    textAlign: "left",
  },
});

export default AddPseudo;
