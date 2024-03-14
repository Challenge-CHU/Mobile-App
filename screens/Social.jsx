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
import { SvgCssUri } from "react-native-svg";
import useProfilIcon from "../hooks/useProfilIcon";
import IconProfil from "../components/IconProfil";
import { UserAPI } from "../utils/api";
import { useUserStore } from "../store/useUserStore";

const Social = () => {
  const { getImageFromCache, imageCache } = useImageStore();
  const {} = useProfilIcon();
  const { userId } = useUserStore();

  const [visibleChild, setVisibleChild] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");
  const [dataFriends, setDataFriends] = useState([]);
  const handleOnVisibleChildChange = useCallback((visibleInt) => {
    setVisibleChild(visibleInt);
  });

  const [allTodaySteps, setAllTodaySteps] = useState();
  const [allBeginSteps, setAllBeginSteps] = useState();

  const handlePressModal = () => {
    setModalVisible(true);
  };

  const handleValidate = async () => {
    try {
      const friend = {
        friend_pseudo: text,
      };

      console.log("ayo: ", friend, userId);
      const response = await UserAPI.postFriend(userId, friend);
      fetchFriends();
      setModalVisible(false);
      console.log("friends res: ", response);
    } catch (error) {
      console.log("Error post friend: ", error);
    }
  };

  const calculSomme = (tableau, cle) => {
    return tableau.reduce((total, objet) => total + objet[cle], 0);
  };

  const fetchFriends = async () => {
    try {
      const result = await UserAPI.getFriends(userId);
      setDataFriends(result.data.data);
      console.log("fetch les friends: ", result.data);
    } catch (error) {
      console.log("Error fetch friends: ", error);
    }
  };

  const tabNames = ["Aujourd'hui", "Depuis le début"];

  useEffect(() => {
    fetchFriends();
    setAllTodaySteps(calculSomme(dataFriends, "stepToday"));
    setAllBeginSteps(calculSomme(dataFriends, "stepsTotal"));
  }, []);

  useEffect(() => {
    setAllBeginSteps(calculSomme(dataFriends, "stepsTotal"));
    setAllTodaySteps(calculSomme(dataFriends, "stepToday"));
  }, [dataFriends]);

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
        {dataFriends != undefined || dataFriends.length > 0 ? (
          <FriendsScrollData
            handleOnVisibleChildChange={handleOnVisibleChildChange}
            tabNames={tabNames}
            todaySteps={allTodaySteps}
            beginSteps={allBeginSteps}
          />
        ) : (
          ""
        )}
      </PlateformSafeView>
      {dataFriends === undefined || dataFriends.length <= 0 ? (
        <NoFriendContent />
      ) : (
        <FriendContent friends={dataFriends} visibleChild={visibleChild} />
      )}

      <ModalAnimated
        text="Veuillez entrer le pseudo de votre ami."
        placeholder="Pseudo"
        onPress={() => setModalVisible((prev) => !prev)}
        modalVisible={modalVisible}
        onChangeText={onChangeText}
        BtnLabel="Changer"
        onValidate={handleValidate}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Social;

const SocialCard = ({ name, steps, allSteps, showGlobal, id, avatar }) => {
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
        <View
          style={{
            width: "20%",
            height: "130%",
            objectFit: "contain",
            position: "absolute",
            left: "-8%",
          }}
        >
          <IconProfil
            disabled={true}
            selected={false}
            id={avatar}
            width={"100%"}
            height={"100%"}
          />
        </View>

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
            mode={"idle"}
          />
        </View>
        <GreyCard />
      </View>
    </BottomSheet>
  );
};

const FriendContent = ({ friends, visibleChild }) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setData(friends);
  }, [friends]);

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
          marginTop: ResponsiveHeight(5),
          paddingHorizontal: ResponsiveHeight(3.7),
        }}
        data={friends}
        renderItem={({ item }) => (
          <SocialCard
            name={item.pseudo}
            avatar={parseInt(item.avatar_id)}
            id={item.id}
            steps={item.stepToday}
            allSteps={item.stepsTotal}
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

const FriendsScrollData = ({
  handleOnVisibleChildChange,
  tabNames,
  todaySteps,
  beginSteps,
}) => {
  const [begin, setBegin] = useState();
  const [today, setToday] = useState();

  useEffect(() => {
    setBegin(beginSteps);
    setToday(todaySteps);
    console.log("begin, ", begin);
  }, [begin, today]);
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
            {today} pas aujourd'hui
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
            {begin} pas depuis le début
          </Text>
        </View>
      </ScrollTabView>
    </View>
  );
};