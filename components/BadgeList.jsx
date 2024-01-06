import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";

//En param un titre nullable + une liste de badge

/**
 * Levels des badges
 *
 * 1: bronze
 * 2: Argent
 * 3: Gold
 *
 */

let Unlockbadges = [
  { id: 1, name: "Badge marcheur", level: 2, unlock: false },
  { id: 2, name: "Badge streaker", level: 1, unlock: true },
  { id: 3, name: "Badge beau gosse", level: 3, unlock: true },
  { id: 4, name: "Badge Globe Trotteur", level: 1, unlock: false },
];

Unlockbadges.sort((a, b) => {
  if (b.unlock !== a.unlock) {
    return b.unlock - a.unlock;
  }
  return b.level - a.level;
});

let Allbadges = [
  { id: 1, name: "Badge marcheur", level: 2, unlock: false },
  { id: 1, name: "Badge streaker", level: 1, unlock: true },
  { id: 1, name: "Badge beau gosse", level: 3, unlock: true },
  { id: 0, name: "Badge Globe Trotteur", level: 1, unlock: false },
];

const BadgeList = ({ titre }) => {
  return (
    <View style={{ gap: 32 }}>
      {titre && (
        <Text style={{ fontSize: ResponsiveHeight(2.3), fontWeight: "700" }}>
          {titre}
        </Text>
      )}

      {/* <FlatList
        data={Unlockbadges}
        renderItem={(item) => <Badges badge={item} />}
        keyExtractor={(item) => item.id}
      /> */}

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: ResponsiveHeight(4),
        }}
      >
        {Unlockbadges.map((badge) => {
          return <Badges key={badge.id} badge={badge} />;
        })}
      </View>
    </View>
  );
};

const Badges = ({ badge }) => {
  let levels = {
    1: require("../assets/badges/bronze.png"),
    2: require("../assets/badges/silver.png"),
    3: require("../assets/badges/gold.png"),
  };

  return (
    <View>
      <Image
        source={levels[badge.level]}
        style={{
          width: ResponsiveWidth(27.9),
          height: ResponsiveHeight(8.88),
          objectFit: "contain",
          opacity: badge.unlock ? 1 : 0.25,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BadgeList;
