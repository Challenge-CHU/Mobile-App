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
import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import { LayoutHome, LayoutHomeGlobal } from "../components/LayoutHome";
import { useStepCountStore } from "../store/useStepCountStore";
import SplashScreen from "../components/SplashScreen";
import { ChallengesAPI, UserAPI } from "../utils/api";
import { useUserStore } from "../store/useUserStore";

const Home = () => {
  const {
    startDateChallenge,
    endDateChallenge,
    dailySteps,
    challengeId,
    numberOfUsers,
    totalSteps,
    averageStepsPerUser,
    todaySteps,
    updateStats,
    allSteps,
  } = useStepCountStore();

  const { handleGetStepsFromBeginning, handleGetCountStepForADay } =
    useStepCount();

  const data = [
    { int: todaySteps, description: "Pas cumulés aujourd'hui" },
    { int: numberOfUsers, description: "Marcheurs" },
    { int: totalSteps, description: "Pas depuis le début" },
    { int: averageStepsPerUser, description: "Pas moyen par marcheur" },
  ];

  const { updateBadges, updateFriends, userId, token } = useUserStore();
  const [steps, setSteps] = useState(dailySteps);
  const [fetched, setFetched] = useState(false);

  const [visibleChild, setVisibleChild] = useState(1);
  const scrollViewRef = useRef(null);

  const halfWindowsHeigth = Dimensions.get("window").height / 2; //50 VH
  const STEP_GOAL = 10000;

  const handleOnVisibleChildChange = useCallback((visibleInt) => {
    setVisibleChild(visibleInt);
  });

  useEffect(() => {
    setSteps(dailySteps);
  }, [dailySteps]);

  const allFetch = async () => {
    await FetchBadgesAndFriends();
    await FetchStatsGlobal();
    setFetched(true);
  };

  /**
   * Synchronise les pas en bdd
   *
   * Si il y a une date avec des pas Alors on envoie la différence entre la date et la date du jour
   * Si il n'y a rien on envoi toutes les entrée depuis le début du challenge
   */
  const syncSteps = async () => {
    try {
      console.log("debut sync");
      //Récupère la dernière entré des pas
      const responseSteps = await UserAPI.getSteps(userId);

      if (responseSteps.data.data.length > 0) {
        const allStepss = await handleGetStepsFromBeginning();

        const transformedData = allStepss.map((item) => ({
          date: item.endDate,
          steps: item.value,
          challenge_id: challengeId,
        }));

        const startDate = new Date(startDateChallenge);
        const endDate = new Date(endDateChallenge);

        // Filtrer les objets qui se situent entre les dates fournies
        const filteredData = transformedData.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });

        const response = UserAPI.putSteps(userId, filteredData);
      } else {
        let date = new Date();
        const stepsToday = await handleGetCountStepForADay(date);
        console.log("todayyy []: ", stepsToday);

        const dataSteps = [
          {
            date: date.toISOString(),
            steps: stepsToday,
            challenge_id: challengeId,
          },
        ];

        const response = await UserAPI.putSteps(userId, dataSteps);
        console.log("Réusssiiii: ", response.status);
      }
    } catch (e) {
      console.log("Error sync steps: ", e);
    }
  };

  const FetchBadgesAndFriends = async () => {
    try {
      const responseBadges = await UserAPI.getBadges();
      const responseFriends = await UserAPI.getFriends(userId);

      updateBadges(responseBadges.data.data);
      updateFriends(responseFriends);
    } catch (e) {
      console.log("Error fetch Home Badges and friends");
    }
  };
  const FetchStatsGlobal = async () => {
    try {
      const responseStats = await ChallengesAPI.getStats(challengeId);
      let objResponse = { ...responseStats.data.data };
      updateStats(
        objResponse.numberOfUsers,
        objResponse.totalSteps,
        objResponse.averageStepsPerUser,
        objResponse.todaySteps,
        objResponse.totalDistanceInEarthCircumnavigations,
        objResponse.totalCO2SavedInKg,
        objResponse.totalDistanceInKilometers
      );
    } catch (e) {
      console.log("Error fetch global stats: ", e);
    }
  };

  useEffect(() => {
    try {
      allFetch();
      syncSteps();
    } catch (e) {
      console.log("error useEffect fetch home: ", e);
    }
  }, []);

  useEffect(() => {
    try {
      allFetch();
      syncSteps();
    } catch (e) {
      console.log("error useEffect fetch home: ", e);
    }
  }, [token, userId]);

  const tabNames = ["Perso", "Global"];

  if (!fetched) return <SplashScreen />;

  return (
    <>
      <PlateformSafeView styles={{ backgroundColor: "#ffffff" }}>
        <View style={{ backgroundColor: Colors.colors.blue, display: "flex" }}>
          <View
            style={{
              height: halfWindowsHeigth - ResponsiveHeight(1.4),
              borderWidth: 1,
              borderColor: "transparent",
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              overflow: "hidden",
              backgroundColor: "#ffffff",
              zIndex: 1,
              paddingTop: ResponsiveHeight(1.18),
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

            <ScrollTabView
              onChange={handleOnVisibleChildChange}
              tabNames={tabNames}
              color="#000000"
            >
              {/* <ProgressCircle objectif={STEP_GOAL} progression={test} /> */}
              <ProgressCircle objectif={STEP_GOAL} progression={dailySteps} />
              <GlobalStats data={data} flex />
            </ScrollTabView>

            <LittleWalkyMsg
              message={
                visibleChild === 1
                  ? "Swipe à droite pour découvrir ce que nous avons accompli ensemble !"
                  : "Swipe à gauche et découvre tes résultats du jour"
              }
              hideWalky={true}
            />
          </View>

          {/* FIn header blanc */}
          <View
            style={{
              backgroundColor: Colors.colors.blue,
              height: "100%",
              zIndex: 0,
              paddingVertical: aspectRatio(12),
              paddingHorizontal: ResponsiveWidth(6.15),
              flexDirection: "column",
              gap: ResponsiveHeight(2.84),
            }}
          >
            <LayoutHome value={visibleChild} />
          </View>
        </View>
      </PlateformSafeView>
    </>
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
