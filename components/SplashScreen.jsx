import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Rive from "rive-react-native";
import { Colors } from "../styles";

const SplashScreen = ({ navigation }) => {
  const idleUrl = process.env.EXPO_PUBLIC_S3_URL;
  useEffect(() => {
    // Effectuez les actions nécessaires (par exemple, chargement des données)
    // Une fois terminé, naviguez vers votre écran principal
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000); // Exemple : splash screen visible pendant 2 secondes
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Rive
        url={idleUrl}
        stateMachineName="State Machine 1"
        style={{ width: 400, height: 400 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.colors.blue,
  },
});

export default SplashScreen;
