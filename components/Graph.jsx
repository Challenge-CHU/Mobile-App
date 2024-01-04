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
  const { weekSteps } = useStepCountStore();

  const [steps, setSteps] = useState([]);

  const [average, setAverage] = useState();
  const [percentAverage, setPercentAverage] = useState(1);
  const Days = ["L", "M", "M", "J", "V", "S", "D"];

  const handleGetCurrentWeekSteps = () => {
    //FakeValues, uncomment for debug
    // const tableauValeurs = [1000, 5000, 200, 8000, 3400, 25000, 2000];

    const tableauValeurs = weekSteps.map((item) => item.value);
    setSteps(tableauValeurs);
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
          <Bar steps={steps[0] ?? 0} />
          <Bar steps={steps[1] ?? 0} />
          <Bar steps={steps[2] ?? 0} />
          <Bar steps={steps[3] ?? 0} />
          <Bar steps={steps[4] ?? 0} />
          <Bar steps={steps[5] ?? 0} />
          <Bar steps={steps[6] ?? 0} />
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

const Bar = React.memo(({ steps }) => {
  const { goal } = useStepCountStore();
  const percent = (steps * 100) / MAX_GRAPH_VALUE;
  const height = percent > 100 ? 100 : percent;

  const colors = [Colors.barGraphColors.good, Colors.barGraphColors.bad];

  return (
    <View style={{ ...styles.barContainer }}>
      <View
        style={{
          ...styles.bar,
          height: height + "%" ?? "0%",
          backgroundColor:
            steps >= goal
              ? Colors.barGraphColors.good
              : Colors.barGraphColors.bad,
        }}
      ></View>
    </View>
  );
});

const Day = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const GoalLine = () => {
  const { goal } = useStepCountStore();

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
        bottom: `${percent - 2}%`,
        left: 0,
        right: 0,
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
    alignItems: "center",
    // backgroundColor: "purple",
  },
  wrapper: {
    width: "80%",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    gap: ResponsiveHeight(0.95),
    marginHorizontal: "auto",
    // backgroundColor: "blue",
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
    width: "100%",
    height: 2,
    backgroundColor: Colors.colors.blue,
    position: "absolute",
    zIndex: 3,
  },
  averageLine: {
    width: "100%",
    position: "absolute",
    zIndex: 3,
  },
});

export default Graph;
