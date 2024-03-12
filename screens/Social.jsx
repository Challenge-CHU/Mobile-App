import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
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
import ModalAnimated from "../components/ModalAnimated";

const Social = () => {
  const { getImageFromCache, imageCache } = useImageStore();
  const [visibleChild, setVisibleChild] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");
  const handleOnVisibleChildChange = useCallback((visibleInt) => {
    setVisibleChild(visibleInt);
  });

  const handlePressModal = () => {
    setModalVisible(true);
  };

  const friends = [
    { id: 1, name: "Joselito", steps: 1000, allSteps: 100000 },
    { id: 2, name: "Karine", steps: 45000, allSteps: 35000 },
    { id: 3, name: "Bruno", steps: 200, allSteps: 100000 },
    { id: 4, name: "Michel", steps: 500, allSteps: 15000 },
    { id: 5, name: "Michel", steps: 500, allSteps: 15000 },
    { id: 6, name: "Michel", steps: 500, allSteps: 15000 },
    { id: 7, name: "Michel", steps: 500, allSteps: 15000 },
    { id: 8, name: "Michel", steps: 500, allSteps: 15000 },
  ];

  const tabNames = ["Aujourd'hui", "Depuis le début"];

  return (
    <>
      <PlateformSafeView styles={{ backgroundColor: Colors.colors.blue }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: ResponsiveHeight(2.8),
          }}
        >
          <Text
            style={{
              fontSize: ResponsiveHeight(2.8),
              fontWeight: "600",
              color: "#ffffff",
            }}
          >
            Mes amis
          </Text>
          <TouchableOpacity
            onPress={handlePressModal}
            style={{
              backgroundColor: "#317DBA",
              paddingHorizontal: ResponsiveHeight(1.4),
              paddingVertical: ResponsiveHeight(0.9),
              flexDirection: "row",
              alignItems: "center",
              gap: ResponsiveHeight(0.7),
              borderRadius: ResponsiveHeight(0.7),
            }}
          >
            <Image
              source={{ uri: getImageFromCache("plus") }}
              style={{
                objectFit: "contain",
                width: ResponsiveHeight(1.8),
                height: ResponsiveHeight(1.8),
              }}
            />
            <Text
              style={{
                color: "#ffffff",
                fontSize: ResponsiveHeight(1.8),
                fontWeight: "600",
              }}
            >
              Ajouter un ami
            </Text>
          </TouchableOpacity>
        </View>
        {friends != undefined || friends.length > 0 ? (
          <FriendsScrollData
            handleOnVisibleChildChange={handleOnVisibleChildChange}
            tabNames={tabNames}
          />
        ) : (
          ""
        )}
      </PlateformSafeView>
      {friends === undefined || friends.length <= 0 ? (
        <NoFriendContent />
      ) : (
        <FriendContent friends={friends} visibleChild={visibleChild} />
      )}

      <ModalAnimated
        text="Veuillez entrer le pseudo de votre ami."
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

const SocialCard = ({ name, steps, allSteps, showGlobal }) => {
  const { getImageFromCache, imageCache } = useImageStore();

  return (
    <View
      style={{
        overflow: "visible",
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: Colors.colors.blue,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: ResponsiveHeight(1.1),
          // position: "relative",
          paddingVertical: ResponsiveHeight(0.9),
          paddingLeft: ResponsiveHeight(5.6),
          marginLeft: "5%",
          paddingRight: ResponsiveHeight(1.6),
          overflow: "visible",
          flex: 1,
        }}
      >
        <Image
          src={getImageFromCache("iconfriend")}
          style={{
            width: "20%",
            // width: ResponsiveHeight(5.6),
            height: "130%",
            // height: ResponsiveHeight(6.8),
            objectFit: "contain",
            position: "absolute",
            left: "-8%",
            // left: -ResponsiveHeight(1.6),
          }}
        />
        <View>
          <Text
            style={{
              fontSize: ResponsiveHeight(2.3),
              fontWeight: "600",
              color: "#ffffff",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: ResponsiveHeight(2.3),
              fontWeight: "600",
              color: "#ffffff",
            }}
          >
            {showGlobal === 2 ? allSteps : steps}
          </Text>
          <Text
            style={{
              fontSize: ResponsiveHeight(1.4),
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "left",
            }}
          >
            pas
          </Text>
        </View>
      </View>
    </View>
  );
};

const NoFriendContent = () => {
  return (
    <BottomSheet styles={{ height: ResponsiveHeight(70), padding: 0 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
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
  );
};

const FriendContent = ({ friends, visibleChild }) => {
  return (
    <BottomSheet
      styles={{
        height: ResponsiveHeight(58),
        padding: 0,
      }}
    >
      <FlatList
        style={{
          width: "100%",
          paddingVertical: ResponsiveHeight(5.2),
          paddingHorizontal: ResponsiveHeight(3.7),
        }}
        data={friends}
        renderItem={({ item }) => (
          <SocialCard
            name={item.name}
            steps={item.steps}
            allSteps={item.allSteps}
            showGlobal={visibleChild}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: ResponsiveHeight(2.8),
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
  );
};

const FriendsScrollData = ({ handleOnVisibleChildChange, tabNames }) => {
  return (
    <View
      style={{
        height: ResponsiveHeight(22),
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
            // flex: "0 1",
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
            // flex: "0 1",
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
  );
};
