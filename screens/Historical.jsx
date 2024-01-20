import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import LittleWalkyMsg from "../components/LittleWalkyMsg";
import Calendar from "../components/Calendar";
import Graph from "../components/Graph";
import GlobalStats from "../components/GlobalStats";

const fakeData = [
  { int: 7000, description: "Pas cumulés" },
  { int: 100, description: "Km cumulés" },
  { int: 7549, description: "Pas en moyenne par jour" },
];

const Historical = () => {
  const rangeStartDate = new Date(2023, 2, 1); // 1er Mars 2023
  const rangeEndDate = new Date(2024, 10, 30);
  // console.log("month ptn: ", rangeStartDate.getMonth());
  return (
    <>
      <PlateformSafeView>
        {/* <PlateformSafeView styles={{ backgroundColor: "#ffffff" }}> */}
        <View>
          <LittleWalkyMsg message="Consulte ton historique et tes progrès." />
          <View>
            <Calendar
              rangeStartDate={rangeStartDate}
              rangeEndDate={rangeEndDate}
            />
          </View>
        </View>
      </PlateformSafeView>
      <BottomSheet
        styles={{
          height: ResponsiveHeight(48),
          padding: 0,
          paddingHorizontal: ResponsiveWidth(8.7),
          paddingTop: ResponsiveHeight(2.8),
        }}
      >
        <AllDaysLayout />
      </BottomSheet>
    </>
  );
};

const AllDaysLayout = () => {
  return (
    <>
      <Text style={styles.text}>7 derniers jours</Text>
      <Graph />
      <View
        style={{
          marginTop: ResponsiveHeight(2.6),
        }}
      >
        <Text style={styles.text}>Depuis le début</Text>
      </View>
      <GlobalStats data={fakeData} flex />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: ResponsiveHeight(2.3),
    fontWeight: "700",
  },
});

export default Historical;
