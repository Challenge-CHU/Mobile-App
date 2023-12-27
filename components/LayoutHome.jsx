import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Card from "./Card";
import Graph from "./Graph";
import { ResponsiveHeight, ResponsiveWidth } from "../tools/ResponsiveHeight";

export const LayoutHome = () => {
  return (
    <>
      {/* Card Statistique */}
      <Card
        style={{
          width: "100%",
          height: ResponsiveHeight(17.3),
        }}
      >
        <Text
          style={{
            fontSize: ResponsiveHeight(1.9),
            fontWeight: "700",
          }}
        >
          Historique & statistiques
        </Text>

        <Graph />
      </Card>

      <View
        style={{
          width: "100%",
          paddingBottom: ResponsiveHeight(2.84),
          flexDirection: "row",
          alignItems: "center",
          gap: ResponsiveWidth(8.72),
        }}
      >
        <Card
          style={{
            width: "55%",
            height: "100%",
            position: "relative",
            height: ResponsiveHeight(15.28),
          }}
        >
          <Text
            style={{
              fontSize: ResponsiveHeight(1.9),
              fontWeight: "700",
            }}
          >
            Titre du badge
          </Text>
          <Image
            source={require("../assets/Badge2.png")}
            style={{
              width: ResponsiveWidth(27.95),
              height: ResponsiveHeight(8.89),
              position: "absolute",
              top: -12,
              right: -40,
              objectFit: "contain",
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: ResponsiveHeight(1.9) }}>
              1% Obtention
            </Text>
            <Text style={{ fontSize: ResponsiveHeight(1.9) }}>0/100</Text>
          </View>
        </Card>
        <Card
          style={{
            width: ResponsiveWidth(28.97),
            height: ResponsiveHeight(15.28),
            position: "relative",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -ResponsiveHeight(1.42),
            }}
          >
            <Image
              source={require("../assets/iconfriend.png")}
              style={{
                width: ResponsiveWidth(12.56),
                height: ResponsiveHeight(7.11),
                objectFit: "contain",
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              marginTop: ResponsiveHeight(1.42),
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: ResponsiveHeight(1.9),
                fontWeight: "700",
              }}
            >
              Ajouter un Ami
            </Text>
          </View>
        </Card>
      </View>
    </>
  );
};

export const LayoutHomeGlobal = () => {
  return (
    <View style={{ flexGrow: 1, gap: ResponsiveHeight(1.42) }}>
      <Card style={{ height: ResponsiveHeight(6), width: "100%" }}></Card>
      <Card style={{ height: ResponsiveHeight(6), width: "100%" }}></Card>
      <Card style={{ height: ResponsiveHeight(6), width: "100%" }}></Card>
    </View>
  );
};

const styles = StyleSheet.create({});
