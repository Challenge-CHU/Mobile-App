import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Walky from "../components/Walky";
import BubbleMessage from "../components/BubbleMessage";
import Button from "../components/Button";
import aspectRatio from "../tools/AspectRatio";
import InputText, { InputText2 } from "../components/InputText";
import { useNavigation } from "@react-navigation/native";
import { useImageStore } from "../store/useImageStore";
import FirstLoadingScreen from "./FirstLoadingScreen";
import SplashScreen from "../components/SplashScreen";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";

const SignUp = () => {
  const navigation = useNavigation();
  const {
    imageCache,
    getImageFromCache,
    fetched,
    addImageToCache,
    updateFetched,
  } = useImageStore();

  const [onFocus, setOnFocus] = useState(false);

  const handleConnect = () => {
    navigation.navigate("AddPseudo");
  };

  if (!fetched) return <SplashScreen />;

  return (
    <>
      <PlateformSafeView>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: "14%",
            paddingHorizontal: ResponsiveHeight(4.7),
            marginTop: ResponsiveHeight(4.9),
            marginBottom: ResponsiveHeight(2),
            // paddingHorizontal: 40,
            // marginTop: 42,
          }}
        >
          <View
            style={{
              width: ResponsiveHeight(17.7),
              height: ResponsiveHeight(8.2),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: getImageFromCache("new-chu-blc") }}
              style={{
                objectFit: "contain",
                width: "100%",
                height: ResponsiveHeight(8.5),
              }}
            />
          </View>
          <View
            style={{
              width: ResponsiveHeight(17.7),
              height: ResponsiveHeight(8.2),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: getImageFromCache("new-cesi-blc") }}
              style={{
                objectFit: "contain",
                width: "100%",
                height: ResponsiveHeight(8.5),
              }}
            />
          </View>
        </View>

        <View
          style={{
            height: ResponsiveHeight(34),
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
              transform: `translateY(-${ResponsiveHeight(9.2)}px)`,
            }}
          >
            <BubbleMessage
              msg={
                "Bienvenue sur le challenge des 10 000 pas ! Connecte toi pour débuter l'aventure."
              }
            />
            <View
              style={{
                position: "absolute",
                top: ResponsiveHeight(4),
                right: -ResponsiveHeight(7.7),
              }}
            >
              <Walky
                width={ResponsiveHeight(31.5)}
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
            position: "relative",
            zIndex: 99,
          }}
        >
          <View
            style={{
              marginTop: ResponsiveHeight(3.7),
              marginBottom: ResponsiveHeight(4.7),
              gap: ResponsiveHeight(1.8),
              position: "relative",
              zIndex: 99,
            }}
          >
            <InputText2
              placeholder="Identifiant"
              translate={true}
              focus={(param) => setOnFocus(param)}
              blur={() => setOnFocus(false)}
              active={onFocus}
            />
            <InputText
              placeholder="Mot de passe"
              translate={true}
              focus={(param) => setOnFocus(param)}
              blur={() => setOnFocus(false)}
              active={onFocus}
            />
            <Text style={styles.text}>
              Ces informations vous ont été envoyées par le CHU à la suite de
              votre inscription au challenge
            </Text>
          </View>

          <Button title="Se connecter" onPress={handleConnect} />
        </View>
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#000000",
            opacity: onFocus ? 0.5 : 0,
            zIndex: 1,
          }}
        ></View>
      </PlateformSafeView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: aspectRatio(ResponsiveHeight(1.8)),
  },
});

export default SignUp;
