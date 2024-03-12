// ImageLoader.js
import React, { useEffect, useState } from "react";
import { Asset, useAssets } from "expo-asset";
import { useImageStore } from "../store/useImageStore";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const ImageLoader = () => {
  const { updateFetched, addImageToCache } = useImageStore();

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const imageAssets = await cacheImages([
          require("../assets/iconfriend.png"),
          require("../assets/avatar/lion.svg"),
          require("../assets/avatar/lapin.svg"),
          require("../assets/avatar/cheval.svg"),
          require("../assets/avatar/crocodile.svg"),
          require("../assets/avatar/elan.svg"),
          require("../assets/avatar/koala.svg"),
          require("../assets/avatar/tigre.svg"),
          require("../assets/avatar/pinguin.svg"),
          require("../assets/arrow-calendar.png"),
          require("../assets/backarrow.png"),
          // require("../assets/cesi-blanc.png"),
          // require("../assets/chu-blanc.png"),
          // require("../assets/new-chu-blc.png"),
          // require("../assets/new-cesi-blc.png"),
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
          require("../assets/plus.png"),
          require("../assets/chu.svg"),
          require("../assets/cesi.svg"),
        ]);
        let result = await Promise.all([...imageAssets]);

        result.map((image) => {
          addImageToCache(image.name, image.localUri);
        });
        updateFetched(true);
      } catch (e) {
        console.log(e);
        console.warn(e);
      } finally {
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return null;
};

export default ImageLoader;
