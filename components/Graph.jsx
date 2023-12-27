import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import aspectRatio from "../tools/AspectRatio";
import { Colors } from "../styles";
import Svg, { Line } from "react-native-svg";
import Percentage, { PercentageOf } from "../tools/Percentage";
import { useStepCountStore } from "../store/useStepCountStore";
import useStepCount from "../hooks/useStepCount";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";

const MAX_GRAPH_VALUE = 15000; // La valeur maximum pour le graphique

const Graph = () => {
  const { weekSteps } = useStepCount();

  const [steps, setSteps] = useState([
    1200, 5000, 200, 8000, 3400, 10000, 2000,
  ]);
  // const [steps, setSteps] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [average, setAverage] = useState();
  const [percentAverage, setPercentAverage] = useState(1);
  const Days = ["L", "M", "M", "J", "V", "S", "D"];

  const handleGetCurrentWeekSteps = () => {
    //TODO: fix calcul moyenn parce que la moyenne est calculer avec les zéros
    //Ajouter ici
    //Récupérer le jour, si c'est lundi alors la moyenne c'est la valeur de lundi
    //SI c'est mardi alors calcul de moyenn avec Lundi + MArdi
    // let initStepsValues = [0, 0, 0, 0, 0, 0, 0];
    let initStepsValues = [1200, 5000, 200, 8000, 3400, 10000, 2000];

    let copy = initStepsValues.map((item, idx) => {
      return weekSteps[idx] !== undefined ? weekSteps[idx].value : item;
    });
    // console.log("gaou: ", copy);
    setSteps(copy);
  };

  const handleComputeAverage = () => {
    let computeAverage = steps.reduce((a, b) => a + b, 0) / steps.length;
    let computePercentAverage = Math.round(
      Percentage(computeAverage, MAX_GRAPH_VALUE)
    );

    setAverage(computeAverage);
    setPercentAverage(computePercentAverage);
  };

  useEffect(() => {
    if (weekSteps != undefined) {
      handleGetCurrentWeekSteps();
      handleComputeAverage();
    }
  }, []);

  useEffect(() => {
    if (weekSteps != undefined) {
      handleGetCurrentWeekSteps();
      handleComputeAverage();
    }
  }, [weekSteps]);

  useEffect(() => {
    handleComputeAverage();
  }, [steps]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.containerBars}>
          <GoalLine />
          <AverageLine percent={percentAverage} />

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
  const { goal } = useStepCountStore();
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
            steps >= goal
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
  const { goal } = useStepCountStore();

  // percent 10k => 15k puis récup ce percent pour 75
  const percentGoal = Percentage(goal, MAX_GRAPH_VALUE);
  const percent = PercentageOf(ResponsiveHeight(8.89), percentGoal);
  return (
    <View
      style={{ ...styles.goalline, bottom: percent, right: 0, left: 0 }}
    ></View>
  );
};
const AverageLine = ({ percent }) => {
  const [value, setValue] = useState(percent);

  useEffect(() => {
    setValue(percent);
  }, [percent]);
  return (
    <View
      style={{
        ...styles.averageLine,
        bottom: `${value}%`,
        left: 0,
      }}
    >
      <Svg height="2" width="100%">
        <Line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
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
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "purple",
  },
  wrapper: {
    width: "80%",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "flex-end",
    gap: ResponsiveHeight(0.95),
  },
  containerBars: {
    width: "100%",
    height: ResponsiveHeight(8.89),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    // backgroundColor: "red",
  },
  containerDays: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
  },
  bar: {
    width: ResponsiveWidth(6.41),
    height: "100%",
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
    fontSize: ResponsiveHeight(1.4),
    fontWeight: "700",
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  goalline: {
    width: "110%",
    height: 2,
    backgroundColor: Colors.colors.blue,
    position: "absolute",
    zIndex: 3,
  },
  averageLine: {
    width: "110%",
    position: "absolute",
    zIndex: 3,
  },
});

export default Graph;
