/**
 * Algorythme:
 *
 * 1/ Récupérer la date de début et de fin
 *
 * 2/ Récupérer les dates entre:
 *  -SI même années alors on garde la même année
 *  -SI pas même années on récupérer les années entre
 *
 * 3/ Changer de mois
 *  - SI le mois d'après ou d'avant n'est pas dans la range alors on emp^che de cliquer + changement de style
 *  - Changer d'année quand on a à été au bout des mois (janvier ou décembre)
 *
 * 4/ cliquer sur un jour
 *  -SI le jour est = ou inférieur à aujourd'hui alors on le rend pas cliquable + style avec opacity
 *  - récupérer les données de ces jours
 *
 * 5/ Responvie UI
 */

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Colors } from "../styles";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";
import aspectRatio from "../tools/AspectRatio";

const Calendar = ({ rangeStartDate, rangeEndDate }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(rangeStartDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(
    rangeStartDate.getFullYear()
  );

  const [isNextMonthEnabled, setNextMonthEnabled] = useState(true);

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateYearsBetween = (start, end) => {
    const years = [];
    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
      years.push(year);
    }
    return years;
  };

  const handleMonthChange = (isNext) => {
    console.log("yo mama");
    //Vérifier si le mois d'après
    setSelectedMonth((prevMonth) => {
      //Récupère le mis d'après ou précédent avec l'année en cours
      let newMonth = isNext ? prevMonth + 1 : prevMonth - 1;
      let newYear = selectedYear;
      console.log("select year: ", selectedYear);
      console.log("select month: ", selectedMonth);

      //Détermine si il faut changer d'année
      if (newMonth < 0) {
        newYear -= 1;
        newMonth = 11;
      } else if (newMonth > 11) {
        newYear += 1;
        newMonth = 0;
      }
      console.log("middle: ", newMonth);

      //Récupère la date et vérifie si elle est comprise entre la date de fin de et début
      const newMonthDate = new Date(newYear, newMonth, 1);
      console.log(
        "Début de laventure: ",
        rangeStartDate,
        "nouvelle date de laventure: ",
        newMonthDate,
        "Est ce que la nouvelle date est inférieur au début ?: ",

        newMonthDate < rangeStartDate,
        " ou supérieur à la fin? ",
        newMonthDate > rangeEndDate
      );
      if (newMonthDate < rangeStartDate || newMonthDate > rangeEndDate) {
        console.log(
          "biiitch: ",
          newMonthDate < rangeStartDate || newMonthDate > rangeEndDate
        );
        return prevMonth;
      }

      //Si c'est le cas alors on ajoute la nouvelle année et le nouveau mois sinon on retourne l'ancien
      setSelectedYear(newYear);
      return newMonth;
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    const dateButoir = rangeEndDate;
    const nextMonthDate = new Date(selectedYear, selectedMonth + 1, 1);

    setNextMonthEnabled(nextMonthDate < dateButoir);
  }, [selectedYear, selectedMonth]);

  const renderDay = ({ item }) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const isPastDay =
      selectedYear < currentDate.getFullYear() ||
      (selectedYear === currentDate.getFullYear() &&
        (selectedMonth < currentMonth ||
          (selectedMonth === currentMonth && item < currentDay)));

    return (
      <TouchableOpacity
        style={{
          ...styles.dayContainer,
          backgroundColor:
            selectedDay === item ? Colors.colors.orange : "white",
          opacity: isPastDay ? 1 : 0.5,
        }}
        onPress={() => handleDayPress(item)}
        disabled={!isPastDay}
      >
        <Text
          style={{
            ...styles.dayText,
            color: selectedDay === item ? "#ffffff" : Colors.colors.blue,
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleDayPress = (day) => {
    setSelectedDay((prevDay) => (prevDay === day ? null : day));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCalendar}>
        <ArrowButton left={true} onPress={() => handleMonthChange(false)} />
        <Text style={styles.monthText}>
          {months[selectedMonth]} - {selectedYear}
        </Text>
        <ArrowButton
          onPress={() => handleMonthChange(true)}
          disabled={!isNextMonthEnabled}
          style={{ opacity: isNextMonthEnabled ? 1 : 0.5 }}
        />
      </View>
      <FlatList
        data={days.slice(0, getDaysInMonth(selectedYear, selectedMonth))}
        renderItem={renderDay}
        keyExtractor={(item) => item.toString()}
        numColumns={8}
        contentContainerStyle={styles.calendar}
        scrollEnabled={false}
      />
    </View>
  );
};

const ArrowButton = ({ left, onPress, disabled }) => {
  console.log("bouton arrow: ", left, " alors disabled: ", disabled);
  return (
    <TouchableOpacity
      style={styles.arrowButton}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        source={require("../assets/arrow-calendar.png")}
        style={{
          objectFit: "contain",
          width: ResponsiveHeight(2.8),
          height: ResponsiveHeight(2.8),
          transform: [{ scaleX: left ? -1 : 1 }],
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    paddingHorizontal: ResponsiveHeight(2.8),
    paddingVertical: ResponsiveHeight(1.6),
    justifyContent: "center",
    borderRadius: ResponsiveHeight(1.6),
    alignItems: "center",
  },
  calendar: {
    height: ResponsiveHeight(21.3),
    backgroundColor: "rgba(255,255,255, 0.5)",
    borderRadius: ResponsiveHeight(1.7),
    paddingHorizontal: ResponsiveHeight(1.8),
    paddingVertical: ResponsiveHeight(1.4),
    justifyContent: "center",
  },
  dayContainer: {
    width: ResponsiveHeight(2.9),
    height: ResponsiveHeight(2.9),
    justifyContent: "center",
    alignItems: "center",
    margin: ResponsiveHeight(0.5),
    borderRadius: ResponsiveHeight(0.5),
  },
  dayText: {
    color: Colors.colors.blue,
    fontSize: aspectRatio(ResponsiveHeight(1.7)),
  },
  headerCalendar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ResponsiveHeight(2.8),
    marginBottom: ResponsiveHeight(1.8),
  },
  monthText: {
    flex: 1,
    textAlign: "center",
    fontSize: ResponsiveHeight(2.3),
  },
  arrowButton: {},
});

export default Calendar;
