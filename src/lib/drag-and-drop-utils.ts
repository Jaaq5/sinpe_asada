// app/lib/dragAndDropUtils.ts
import React from "react";

export const handleDragOver = (
  event: React.DragEvent<HTMLDivElement>,
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  setDragOver(true);
};

export const handleDragLeave = (
  event: React.DragEvent<HTMLDivElement>,
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  setDragOver(false);
};

export const handleDrop = (
  event: React.DragEvent<HTMLDivElement>,
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>,
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
) => {
  event.preventDefault();
  setDragOver(false);

  const file = event.dataTransfer.files[0]; // Obtener el archivo de la lista de archivos
  if (file) {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }
};
