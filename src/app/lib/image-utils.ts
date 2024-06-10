// app/lib/imageUtils.ts
import Tesseract from "tesseract.js";
import React from "react";

export const handleImageChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedImage(file);
  }
};

export const handleExtractAllText = (
  selectedImage: File | null,
  setExtractedText: React.Dispatch<React.SetStateAction<string>>
) => {
  if (selectedImage) {
    Tesseract.recognize(selectedImage, "spa", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
      })
      .catch((err) => {
        console.error(err);
        setExtractedText("Error extracting text");
      });
  }
};

export const handleExtractText = (
  selectedImage: File | null,
  setExtractedText: React.Dispatch<React.SetStateAction<string>>
) => {
  if (selectedImage) {
    Tesseract.recognize(selectedImage, "spa", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        const regex = /PAJA (\d+\.)\b/g;
        const numbers = text
          .match(regex)
          ?.map((match) => match.replace("PAJA ", ""));

        if (numbers && numbers.length > 0) {
          setExtractedText(numbers.join(", "));
        } else {
          setExtractedText("No se encontraron números después de 'PAJA'.");
        }
      })
      .catch((err) => {
        console.error(err);
        setExtractedText("Error extracting text");
      });
  }
};
