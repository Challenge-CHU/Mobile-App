import { Dimensions } from "react-native";
import aspectRatio from "./AspectRatio";

const { height, width } = Dimensions.get("window");
const { screenHeight } = Dimensions.get("screen");

const ResponsiveHeight = (percentage) =>
  Math.round((height * percentage) / 100);

const ResponsiveWidth = (percentage) => Math.round((width * percentage) / 100);

export { ResponsiveHeight, ResponsiveWidth };
