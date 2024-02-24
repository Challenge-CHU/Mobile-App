import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import PlateformSafeView from "../components/PlateformSafeView";
import Rive from "rive-react-native";
import { Colors } from "../styles";
import BottomSheet from "../components/BottomSheet";
import { ResponsiveHeight } from "../tools/ResponsiveHeight";
import Walky from "../components/Walky";
import GreyCard from "../components/GreyCard";
import { useImageStore } from "../store/useImageStore";
import ScrollTabView from "../components/ScrollTabView";
import CustomModal from "../components/Modal";

const Social = () => {
  const { getImageFromCache, imageCache } = useImageStore();
  const [visibleChild, setVisibleChild] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");
  const handleOnVisibleChildChange = useCallback((visibleInt) => {
    setVisibleChild(visibleInt);
  });
  // const friends = false;
  const friends = [
    { id: 1, name: "Joselito", steps: 1000, allSteps: 100000 },
    { id: 2, name: "Karine", steps: 45000, allSteps: 35000 },
    { id: 3, name: "Bruno", steps: 200, allSteps: 100000 },
    { id: 4, name: "Michel", steps: 500, allSteps: 15000 },
  ];

  const tabNames = ["Aujourd'hui", "Depuis le début"];

  if (!friends) {
    return (
      <>
        <PlateformSafeView styles={{ backgroundColor: Colors.colors.blue }}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 24,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "600", color: "#ffffff" }}>
              Mes amis
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#317DBA",
                paddingHorizontal: 12,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                borderRadius: 6,
              }}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={{ uri: getImageFromCache("plus") }}
                style={{
                  objectFit: "contain",
                  width: 15,
                  height: 15,
                }}
              />
              <Text
                style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}
              >
                Ajouter un ami
              </Text>
            </TouchableOpacity>
          </View>
        </PlateformSafeView>
        <BottomSheet styles={{ height: ResponsiveHeight(70), padding: 0 }}>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <View
              style={{
                height: ResponsiveHeight(33),
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Walky
                width={ResponsiveHeight(35.5)}
                height={ResponsiveHeight(44.1)}
                reverse
              />
            </View>
            <GreyCard />
          </View>
        </BottomSheet>
      </>
    );
  }

  return (
    <>
      <PlateformSafeView styles={{ backgroundColor: Colors.colors.blue }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 24,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "600", color: "#ffffff" }}>
            Mes amis
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#317DBA",
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              borderRadius: 6,
            }}
          >
            <Image
              source={{ uri: getImageFromCache("plus") }}
              style={{
                objectFit: "contain",
                width: 15,
                height: 15,
              }}
            />
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
              Ajouter un ami
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: ResponsiveHeight(22),
            // backgroundColor: "red",
            marginTop: ResponsiveHeight(3.7),
          }}
        >
          <ScrollTabView
            onChange={handleOnVisibleChildChange}
            tabNames={tabNames}
            color="#ffffff"
          >
            <View
              style={{
                flex: "0 1",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: ResponsiveHeight(1.4),
              }}
            >
              <Text
                style={{
                  fontSize: ResponsiveHeight(2.3),
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Ensemble vous avez marché
              </Text>
              <Text
                style={{
                  fontSize: ResponsiveHeight(2.3),
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                25 000 pas aujourd'hui
              </Text>
            </View>
            <View
              style={{
                flex: "0 1",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: ResponsiveHeight(1.4),
              }}
            >
              <Text
                style={{
                  fontSize: ResponsiveHeight(2.3),
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Ensemble vous avez marché
              </Text>
              <Text
                style={{
                  fontSize: ResponsiveHeight(2.3),
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                25 000 pas depuis le début
              </Text>
            </View>
          </ScrollTabView>
        </View>
      </PlateformSafeView>
      <BottomSheet
        styles={{
          height: ResponsiveHeight(58),
          padding: 0,
        }}
      >
        {/* <View style={{ gap: 24 }}>
          {friends.map((item) => {
            return <SocialCard />;
          })}
        </View> */}

        <FlatList
          style={{
            width: "100%",
            paddingVertical: 44,
            paddingHorizontal: 32,
          }}
          data={friends}
          renderItem={(item) => (
            <SocialCard name={item.name} steps={item.steps} />
          )}
          keyExtractor={(item) => item.id}
          // numColumns={8}
          contentContainerStyle={{
            gap: 24,
            width: "100%",
            margin: 0,
            padding: 0,
            overflow: "visible",
            marginHorizontal: 0,
            paddingHorizontal: 0,
          }}
          scrollEnabled={true}
        />
      </BottomSheet>
      <CustomModal
        text="Veuillez entrer votre nouveau pseudo."
        // text="Veuillez entrer le pseudo de votre ami que vous souhaitez ajouter"
        placeholder="Pseudo"
        onPress={() => setModalVisible((prev) => !prev)}
        modalVisible={modalVisible}
        onChangeText={onChangeText}
        BtnLabel="Changer"
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Social;

const SocialCard = ({ name, steps }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View style={{ overflow: "visible" }}>
      <View
        style={{
          backgroundColor: Colors.colors.blue,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 10,
          position: "relative",
          paddingVertical: 8,
          paddingLeft: 48,
          paddingRight: 14,
          overflow: "visible",
        }}
      >
        <Image
          src={getImageFromCache("iconfriend")}
          style={{
            width: 48,
            height: 58,
            objectFit: "contain",
            position: "absolute",
            left: -14,
          }}
        />
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#ffffff" }}>
            Nom de la personne
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#ffffff" }}>
            14 000
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>
            pas
          </Text>
        </View>
      </View>
    </View>
  );
};
