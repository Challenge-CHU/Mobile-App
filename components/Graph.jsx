import React from "react";
import { View, StyleSheet, Text } from "react-native";
import aspectRatio from "../tools/AspectRatio";
import { Colors } from "../styles";
import Svg, { Line } from "react-native-svg";
import Percentage, { PercentageOf } from "../tools/Percentage";

const MAX_GRAPH_VALUE = 15000;
const GOAL = 10000;

const Graph = () => {
  const Days = ["L", "M", "M", "J", "V", "S", "D"];
  const steps = [1000, 5000, 10000, 7000, 450, 12000, 10000];

  const average = steps.reduce((a, b) => a + b, 0) / steps.length;
  const percentAvegrage = Percentage(average, MAX_GRAPH_VALUE);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.containerBars}>
          <GoalLine />
          <AverageLine value={percentAvegrage} />
          {steps.map((step, idx) => {
            return <Bar steps={step} key={idx} />;
          })}
        </View>
        <View style={styles.textContainer}>
          {Days.map((day, idx) => {
            return <Day text={day} key={idx} />;
          })}
        </View>
      </View>
    </View>
  );
};

const Bar = ({ text, steps }) => {
  //ICI calcul

  //Objectif = 10 000 pas = 80%
  //Steps = nombre de pas
  //Percent = steps * 100 / objectif = percent
  //(5 000 * 100) / Total = 10 000 = percent 100%

  //100% étant 75 en height

  //(5 000 * 80) / Total = 10 000 = percent 80%

  //Met plus que 10 000 puisque la bar représente 10 000

  //75 * (30/100)

  const percent = (steps * 100) / MAX_GRAPH_VALUE;
  const height = percent;

  const colors = [Colors.barGraphColors.good, Colors.barGraphColors.bad];

  //SI au dessus de 10 000 alors couleur good sinon couleur bad

  return (
    <View style={{ ...styles.barContainer }}>
      <View
        style={{
          ...styles.bar,
          height: percent + "%" ?? "0%",
          backgroundColor:
            steps >= GOAL
              ? Colors.barGraphColors.good
              : Colors.barGraphColors.bad,
        }}
      ></View>
    </View>
  );
};

const Day = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const GoalLine = () => {
  // percent 10k => 15k puis récup ce percent pour 75
  const percentGoal = Percentage(GOAL, MAX_GRAPH_VALUE);
  const percent = PercentageOf(75, percentGoal);
  return <View style={{ ...styles.goalline, bottom: percent }}></View>;
};
const AverageLine = ({ value }) => {
  const percent = PercentageOf(75, 70);

  return (
    <View style={{ ...styles.averageLine, top: value }}>
      <Svg height="50" width="100%">
        <Line
          x1="10"
          y1="25"
          x2="100%"
          y2="25"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wrapper: {
    // backgroundColor: "purple",

    width: "80%",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  containerBars: {
    // backgroundColor: "green",
    width: "100%",
    // maxHeight: "60%",
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    // flex: 1,
  },
  containerDays: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
  },
  bar: {
    width: aspectRatio(25),
    height: "100%",
    // flex: 1,
    borderRadius: 4,
    backgroundColor: "green",
  },
  barContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 7,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // backgroundColor: "yellow",
    // borderColor: "black",
    // borderWidth: 1,
  },
  goalline: {
    width: "110%",
    height: 2,
    // top: 75 / 3,
    backgroundColor: Colors.colors.blue,
    position: "absolute",
    zIndex: 3,
  },
  averageLine: {
    width: "110%",
    // height: 2,
    // top: 75 / 2,
    // backgroundColor: Colors.colors.blue,
    position: "absolute",
    // borderColor: "black",
    // borderWidth: 1,
    // borderRadius: 1,
    // borderStyle: "dashed",
    zIndex: 3,
  },
});

export default Graph;
