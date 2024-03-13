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
import useProfilIcon from "../hooks/useProfilIcon";

const fakedata = [
  { id: 1, url: "cheval", name: "cheval" },
  { id: 2, url: "crocodile", name: "crocodile" },
  { id: 3, url: "elan", name: "elan" },
  { id: 4, url: "koala", name: "koala" },
  { id: 5, url: "lapin", name: "lapin" },
  { id: 6, url: "lion", name: "lion" },
  { id: 7, url: "pinguin", name: "pinguin" },
  { id: 8, url: "tigre", name: "tigre" },
];

const AddPseudo = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const navigation = useNavigation();
  const { profilIcons, getIconById } = useProfilIcon();

  const [pseudo, setPseudo] = useState("");
  const { updateUsername, updateProfilIcon, profilIcon } = useUserStore();
  const { fetched } = useImageStore();
  const [onFocus, setOnFocus] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [pseudoError, setPseudoError] = useState(false);
  const [walkyMsg, setWalkyMsg] = useState();
  const [displaySplash, setDisplaySplash] = useState();

  const { steps, allSteps, weekSteps } = useStepCountStore();

  useEffect(() => {
    if (pseudoError && imgError)
      setWalkyMsg("Ton Pseudo est invalide et tu n'as pas choisi d'avatar.");
    if (pseudoError && !imgError) setWalkyMsg("Ton pseudo est invalide.");
    if (!pseudoError && imgError) setWalkyMsg("Choisis un avatar.");
    if (!pseudoError && !imgError)
      setWalkyMsg("Je m’apelle Walky, et toi, comment dois-je t’appeler ?");
  }, [imgError, pseudoError]);

  const handleContinue = () => {
    let error = false;

    if (selectedImg === null || selectedImg === undefined) {
      console.log("err img man");
      error = true;
      setImgError(true);
    }

    if (pseudo.trim() === "" || pseudo === "" || null || undefined) {
      console.log("error pseud man");
      error = true;
      setPseudoError(true);
    }

    updateProfilIcon(selectedImg);
    updateUsername(pseudo);
    console.log(profilIcon, " iiicon");
    if (!imgError && !pseudoError && !error) {
      console.log("alors on a choisi qui bernard: ", selectedImg);
      setDisplaySplash(true);
      setTimeout(handleNavigate, 2000);
    }
  };

  const handleNavigate = () => {
    navigation.navigate("Home");
  };

  const handleLoad = () => {
    setLoadImg((prev) => prev + 1);
  };

  const handleChangePseudo = (pseudo) => {
    setPseudoError(false);
    console.log("pseudo new: ", pseudo);

    //TODO regex vérifier si la string est vide et si le pseudo est conforme et dispo
    setPseudo(pseudo);
  };

  const handleChangeImg = (id) => {
    setImgError(false);
    setSelectedImg(id);
  };

  if (!fetched || displaySplash) {
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
          <BubbleMessage msg={walkyMsg} />

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
            {profilIcons.map((item, idx) => {
              return (
                <IconProfil
                  key={item.id}
                  id={item.id}
                  selected={selectedImg === item.id ? true : false}
                  onClick={handleChangeImg}
                  onLoad={handleLoad}
                  width={ResponsiveHeight(7)}
                  height={ResponsiveHeight(7)}
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
    fontSize: aspectRatio(ResponsiveHeight(2.1)),
    fontWeight: "600",
    textAlign: "left",
  },
});

export default AddPseudo;
