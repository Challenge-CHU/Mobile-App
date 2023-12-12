import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    interBlack: require("./assets/fonts/Inter-Black.otf"),
    interBold: require("./assets/fonts/Inter-Bold.otf"),
    InterRegular: require("./assets/fonts/Inter-Regular.otf"),
    InterMedium: require("./assets/fonts/Inter-Medium.otf"),
    AlegryaBlack: require("./assets/fonts/AlegreyaSansSC-Black.ttf"),
    AlegryaBold: require("./assets/fonts/AlegreyaSansSC-Bold.ttf"),
    AlegryaMedium: require("./assets/fonts/AlegreyaSansSC-Medium.ttf"),
    AlegryaRegular: require("./assets/fonts/AlegreyaSansSC-Regular.ttf"),
  });
