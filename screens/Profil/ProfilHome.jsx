import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import {
  ResponsiveHeight,
  ResponsiveWidth,
} from "../../tools/ResponsiveHeight";
import aspectRatio from "../../tools/AspectRatio";
import BadgeList from "../../components/BadgeList";
import Divider from "../../components/Divider";

const ProfilHome = ({ navigation }) => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: ResponsiveHeight(2.8),
          position: "relative",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <BadgeList titre="Badges" />
        </ScrollView>
        <View>
          {/* <BadgeList titre="Badges" />
          <Divider />
          <BadgeList titre="Badges collectifs" /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfilHome;
