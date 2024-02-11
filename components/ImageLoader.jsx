// ImageLoader.js
import React, { useEffect, useState } from "react";
import { Asset, useAssets } from "expo-asset";
import { useImageStore } from "../store/useImageStore";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      console.log("string ?");
      return Image.prefetch(image);
    } else {
      console.log("Not string ?");
      console.log("Not string ?: ", Asset.fromModule(image).downloadAsync());

      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const ImageLoader = () => {
  // const { addImageToCache } = useImageStore();
  const { updateFetched, addImageToCache } = useImageStore();


  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const imageAssets = await cacheImages([
          require("../assets/iconfriend.png"),
          require("../assets/arrow-calendar.png"),
          require("../assets/backarrow.png"),
          require("../assets/cesi-blanc.png"),
          require("../assets/chu-blanc.png"),
          require("../assets/new-chu-blc.png"),
          require("../assets/new-cesi-blc.png"),
          require("../assets/walkyy.png"),
          require("../assets/queue.png"),
          require("../assets/feuille.png"),
          require("../assets/earth.png"),
          require("../assets/close-cross.png"),
          require("../assets/littlewalky.png"),
          require("../assets/green-character.png"),
          require("../assets/setting-wheel.png"),
          require("../assets/timer.png"),
          require("../assets/badges/bronze.png"),
          require("../assets/badges/silver.png"),
          require("../assets/badges/gold.png"),
        ]);
        console.log("oh lala: ", imageAssets);
        let result = await Promise.all([...imageAssets]);
        console.log("mamama maaaaa: ", result);

        result.map((image) => {
          addImageToCache(image.name, image.localUri);
        });
        updateFetched(true);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        console.log("finally");
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return null; // Le composant n'a pas besoin de retourner du JSX s'il n'est pas rendu.
};

export default ImageLoader;
