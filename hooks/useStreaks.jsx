import { useEffect } from "react";
import { useStepCountStore } from "../store/useStepCountStore";

const useStreaks = () => {
  const { updateStreak } = useStepCountStore(); // Utilisez votre store Zustand ici

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        //Todo changer avec l'url du backend
        const response = await fetch("votre-backend/api/streaks");
        const data = await response.json();

        // Mettez à jour le store Zustand avec les streaks
        store.setStreaks(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des streaks :", error);
      }
    };

    fetchStreaks();
  }, [store]);
};

export default useStreaks;
