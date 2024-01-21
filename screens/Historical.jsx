import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";
import LittleWalkyMsg from "../components/LittleWalkyMsg";
import Calendar from "../components/Calendar";
import Graph from "../components/Graph";
import GlobalStats from "../components/GlobalStats";
import useStepCount from "../hooks/useStepCount";
import { useStepCountStore } from "../store/useStepCountStore";

const fakeData = [
  { int: 7000, description: "Pas cumulés" },
  { int: 100, description: "Km cumulés" },
  { int: 7549, description: "Pas en moyenne par jour" },
];

const Historical = () => {
  const { startDateChallenge, endDateChallenge } = useStepCountStore();
  const rangeStartDate = startDateChallenge; // 1er Mars 2023
  const rangeEndDate = endDateChallenge;

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <>
      <PlateformSafeView>
        <View>
          <LittleWalkyMsg message="Consulte ton historique et tes progrès." />
          <View>
            <Calendar
              rangeStartDate={rangeStartDate}
              rangeEndDate={rangeEndDate}
              isSelectedDay={(day) => setSelectedDay(day)}
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
        {selectedDay != null ? (
          <SelectedDayLayout date={selectedDay} />
        ) : (
          <AllDaysLayout />
        )}
      </BottomSheet>
    </>
  );
};

const AllDaysLayout = () => {
  const [data, setData] = useState(null);
  const { computeAllDataFromBegining } = useStepCount();

  useEffect(() => {
    const fetchData = async () => {
      const stats = await computeAllDataFromBegining();

      setData(stats);
    };

    fetchData();
  }, []);

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
      {/* <GlobalStats data={data} flex /> */}
      {/* <GlobalStats data={fakeData} flex /> */}
      {data && <GlobalStats data={data} flex />}
    </>
  );
};
const SelectedDayLayout = ({ date }) => {
  const [formatDate, setFormatDate] = useState(null);
  const [data, setData] = useState(null);
  const { handleFormatDate, calculateStatsForDate } = useStepCount();

  useEffect(() => {
    const fetchData = async () => {
      const dateString = handleFormatDate(date);
      setFormatDate(dateString);

      const stats = await calculateStatsForDate(date);
      setData(stats);
    };

    fetchData();
  }, [date]);

  return (
    <>
      <Text style={[styles.text, { marginBottom: 32 }]}>{formatDate}</Text>
      {data && <GlobalStats data={data} flex justifyStart />}
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
