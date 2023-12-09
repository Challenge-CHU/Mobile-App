import React from "react";
import BackgroundFetchScreen from "../tools/BackgroundTask";
import { StyleSheet, Text, View, Button } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const Social = () => {

  const handleGetDate = () => {
    console.log(new Date().toISOString().split("T")[0]);
  };
  return (
    <View>
      <Text>Social</Text>
      <Button title="kilou" onPress={handleGetDate} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Social;
