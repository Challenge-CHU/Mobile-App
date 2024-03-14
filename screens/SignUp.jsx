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
import { SvgUri } from "react-native-svg/src/xml";
import { AuthAPI, setAuthHeader } from "../utils/api";
import { useStepCountStore } from "../store/useStepCountStore";
import { useUserStore } from "../store/useUserStore";
import { ChallengesAPI, UserAPI } from "../utils/api";

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
  const [displaySplash, setDisplaySplash] = useState(true);
  const [identifier, setIdentifier] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const { challengeId, updateStreak } = useStepCountStore();
  const {
    notificationToken,
    updateToken,
    token,
    updateUserId,
    updateIdentifier,
    updateUsername,
    updateProfilIcon,
  } = useUserStore();
  const [credsError, setCredsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMessage] = useState("");

  const handleConnect = async () => {
    try {
      setDisplaySplash(true);
      const creds = {
        identifier: identifier,
        challenge_id: challengeId,
        firebase_device_token: notificationToken,
        password: password,
      };

      const response = await AuthAPI.login(creds);
      console.log("Debut login");
      updateToken(response.data.token);
      setAuthHeader(response.data.token);
      console.log("Reponse Login: ", response.data.token);
      if (response.status === 200) {
        navigation.navigate("AddPseudo");
      }
    } catch (e) {
      setDisplaySplash(false);
      setCredsError(true);
      console.log("Error login: ", e);
    }
  };

  const handleChangeIdentifiant = (string) => {
    setCredsError(false);
    setIdentifier(string);
  };
  const handleChangePassword = (string) => {
    setCredsError(false);
    setPassword(string);
  };

  const FetchChallenge = async () => {
    try {
      const challengesDates = await ChallengesAPI.getActual();

      if (challengesDates.status === 204) updateDates(null, null);

      updateStartDate(challengesDates.data.data.start_date);
      updateEndDate(challengesDates.data.data.end_date);
      updateIdChall(challengesDates.data.data.id);

      console.log("chall: ", challengesDates.data);
      console.log("chall start: ", challengesDates.data.data.start_date);
      console.log("chall end: ", challengesDates.data.data.end_date);
      return true;
    } catch (e) {
      console.log("Error fetch challenges: ", e);
      return false;
    }
  };

  const FetchUserInfo = async () => {
    try {
      console.log("Debut fetch user info?");

      if (token != null) {
        setAuthHeader(token);
        const result = await UserAPI.getMe();
        console.log("Resultttt?: ", result.status);
        if (result.status === 200) {
          console.log("c'est bien 200");
          updateUserId(result.data.data.id);
          updateIdentifier(result.data.data.identifier);
          updateUsername(result.data.data.pseudo);
          updateStreak(result.data.data.streak);
          updateProfilIcon(parseInt(result.data.data.avatar_id));
          console.log("C B2O: ", result.data);
          navigation.navigate("Home");
        }
        console.log("Fin fetch user info");
      }
    } catch (e) {
      console.log("Error fetch me detection Token: ", e);
    }
  };

  useEffect(() => {
    // if (token != undefined) {
    FetchUserInfo();
    // }
    if (challengeId === undefined) {
      setDisplaySplash(true);
      const result = FetchChallenge();

      if (!result) navigation.navigate("NoChallenge");
    }
    //TODO: Ici tu check si ya pas de challenge bg
    if (!credsError)
      setMessage(
        "Bienvenue sur le challenge des 10 000 pas ! Connecte toi pour débuter l'aventure."
      );
    else setMessage("Vos identifiants sont incorrect.");
    setTimeout(() => {
      setDisplaySplash(false);
    }, 2000);
  }, []);
  useEffect(() => {
    FetchUserInfo();
  }, [token]);

  useEffect(() => {
    //Ici tu check si ya pas de challenge bg
    if (!credsError)
      setMessage(
        "Bienvenue sur le challenge des 10 000 pas ! Connecte toi pour débuter l'aventure."
      );
    else setMessage("Vos identifiants sont incorrect.");
  }, [credsError]);

  if (!fetched) return <SplashScreen />;

  return (
    <>
      {displaySplash ? <SplashScreen /> : null}

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
            <SvgUri
              width="100%"
              height="100%"
              uri={getImageFromCache("cesi")}
              fill={"#ffffff"}
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
            <SvgUri
              width="100%"
              height="100%"
              uri={getImageFromCache("chu")}
              fill={"#ffffff"}
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
            <BubbleMessage msg={msg} />
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
              onChange={handleChangeIdentifiant}
            />
            <InputText
              placeholder="Mot de passe"
              translate={true}
              focus={(param) => setOnFocus(param)}
              blur={() => setOnFocus(false)}
              active={onFocus}
              onChange={handleChangePassword}
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
