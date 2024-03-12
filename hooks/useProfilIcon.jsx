import React from "react";

export default function useProfilIcon() {
  const profilIcons = [
    { id: 1, url: "cheval", name: "cheval" },
    { id: 2, url: "crocodile", name: "crocodile" },
    { id: 3, url: "elan", name: "elan" },
    { id: 4, url: "koala", name: "koala" },
    { id: 5, url: "lapin", name: "lapin" },
    { id: 6, url: "lion", name: "lion" },
    { id: 7, url: "pinguin", name: "pinguin" },
    { id: 8, url: "tigre", name: "tigre" },
  ];

  const getIconById = (id) => {
    const icon = profilIcons.find((icon) => icon.id === id);
    return icon ? icon.url : null;
  };
  return {
    getIconById,
    profilIcons,
  };
}
