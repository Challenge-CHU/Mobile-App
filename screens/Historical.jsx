import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";
import LittleWalkyMsg from "../components/LittleWalkyMsg";
import Calendar from "../components/Calendar";

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
      {/* <BottomSheet
        styles={{
          height: ResponsiveHeight(56),
          padding: 0,
        }}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default Historical;
