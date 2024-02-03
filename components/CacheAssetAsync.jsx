import { Asset, Font } from "expo-asset";
export default function cacheAssetsAsync({
  images = [],
  fonts = [],
  videos = [],
}) {
  return Promise.all([
    ...cacheImages(images),
    // ...cacheFonts(fonts),
    // ...cacheVideos(videos),
  ]);
}
function cacheImages(images) {
  return images.map((image) => Asset.fromModule(image).downloadAsync());
}
