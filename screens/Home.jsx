import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import PlateformSafeView from "../components/PlateformSafeView";
import ProgressCircle from "../components/ProgressCircle";
import { Colors, Spacing, Typography } from "../styles";
import aspectRatio from "../tools/AspectRatio";
import useStepCount from "../hooks/useStepCount";
import ScrollTabView from "../components/ScrollTabView";
import GlobalStats from "../components/GlobalStats";
import FireTag from "../components/FireTag";
import TimerTag from "../components/TimerTag";
import LittleWalkyMsg from "../components/LittleWalkyMsg";
import Card from "../components/Card";
import Graph from "../components/Graph";
// import { useFonts } from "expo-font";
// let customFonts = {
//   // 'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf')
//   "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
//   "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
//   "AlegreyaSansSC-Bold": require("../assets/fonts/AlegreyaSansSC-Bold.ttf"),
// };

const Home = () => {
  //Child fais référence a une tab View (le grpah ou les stats globals)
  const [visibleChild, setVisibleChild] = useState(1);
  const scrollViewRef = useRef(null);

  const halfWindowsHeigth = Dimensions.get("window").height / 2; //50 VH
  const STEP_GOAL = 10000;

  //Hook pour récupérer la données depuis health au format: new Date(YYYY-MM-DD)
  const { steps } = useStepCount();

  const handleOnVisibleChildChange = (visibleInt) => {
    setVisibleChild(visibleInt);
  };

  return (
    <PlateformSafeView styles={{ backgroundColor: "#ffffff" }}>
      <View style={{ backgroundColor: Colors.colors.blue }}>
        <View
          style={{
            height: halfWindowsHeigth - aspectRatio(12),
            // height: halfWindowsHeigth,
            borderWidth: 1,
            borderColor: "transparent",
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            zIndex: 1,
            paddingTop: aspectRatio(10),
          }}
        >
          {/* View lottie fire + chrono */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FireTag />
            <TimerTag />
          </View>
          {/* selector tab perso && global */}

          <ScrollTabView onChange={handleOnVisibleChildChange}>
            <ProgressCircle objectif={STEP_GOAL} progression={steps} />
            <GlobalStats />
          </ScrollTabView>

          <LittleWalkyMsg
            message={
              visibleChild === 1
                ? "Encore un petit effort, tu y es presque !"
                : "Voici tout ce que nous avons \naccompli ensemble !"
            }
          />
        </View>

        {/* FIn header blanc */}
        <View
          style={{
            backgroundColor: Colors.colors.blue,
            flexGrow: 1,
            // transform: "translateY(-30px)",
            zIndex: 0,
            paddingVertical: aspectRatio(12),
            paddingHorizontal: 24,
            flexDirection: "column",
            gap: 24,
          }}
        >
          {visibleChild === 1 ? (
            <>
              {/* Card Statistique */}
              <Card
                style={{
                  width: "100%",
                  height:
                    Dimensions.get("screen").height / 2 / 2 - aspectRatio(64),
                }}
              >
                <Text style={{ fontSize: aspectRatio(16), fontWeight: "700" }}>
                  Historique & statistiques
                </Text>

                <Graph />
              </Card>

              <View
                style={{
                  width: "100%",
                  height:
                    Dimensions.get("screen").height / 2 / 2 - aspectRatio(64),
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 34,
                }}
              >
                <Card
                  style={{
                    width: "55%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Text>Titre du badge</Text>
                  <Image
                    source={require("../assets/Badge2.png")}
                    style={{
                      width: 109,
                      height: 75,
                      position: "absolute",
                      top: -12,
                      right: -36,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <Text>1% Obtention</Text>
                    <Text>0/100</Text>
                  </View>
                </Card>
                <Card
                  style={{
                    width: "auto",
                    flex: 1,
                    height: "100%",
                    position: "relative",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      transform: "translateY(-24px)",
                    }}
                  >
                    <Image
                      source={require("../assets/iconfriend.png")}
                      style={{
                        width: 49,
                        height: 60,
                        // transform: "translateY(-24px)",
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: aspectRatio(16),
                      fontWeight: "700",
                    }}
                  >
                    Ajouter un Ami
                  </Text>
                </Card>
              </View>
            </>
          ) : (
            <View>
              <Text>None</Text>
            </View>
          )}
        </View>
      </View>
    </PlateformSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
