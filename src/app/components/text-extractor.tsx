// app/components/TextExtractor.tsx
// Client rendering, useState use it
"use client";

import React, { useState } from "react";
import Tesseract from "tesseract.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  handleImageChange,
  handleExtractAllText,
  handleExtractText,
} from "../lib/image-utils";

import {
  handleFileChange,
  handleUpdateFile,
  handleTestUpdateFile,
} from "../lib/file-utils";
import {
  handleDragOver,
  handleDragLeave,
  handleDrop,
} from "../lib/drag-and-drop-utils";

interface TextExtractorProps {}

const TextExtractor: React.FC<TextExtractorProps> = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [dragOver, setDragOver] = useState<boolean>(false);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => handleImageChange(event, setSelectedImage)}
      />
      <div
        onDragOver={(event) => handleDragOver(event, setDragOver)}
        onDragLeave={(event) => handleDragLeave(event, setDragOver)}
        onDrop={(event) => handleDrop(event, setDragOver, setSelectedImage)}
        style={{
          border: "2px dashed gray",
          padding: "20px",
          marginTop: "20px",
          backgroundColor: dragOver ? "lightgray" : "white",
        }}
      >
        Arrastra y suelta una imagen aquí, o selecciona una imagen usando el
        botón de arriba.
      </div>
      {selectedImage && (
        <div>
          <button
            onClick={() => handleExtractText(selectedImage, setExtractedText)}
          >
            Extract Text
          </button>
          <button
            onClick={() =>
              handleExtractAllText(selectedImage, setExtractedText)
            }
          >
            Extract all Text
          </button>
        </div>
      )}
      {extractedText && (
        <div>
          <h2>Extracted Numbers:</h2>
          <p>{extractedText}</p>
        </div>
      )}
      <input
        type="file"
        accept=".xlsx"
        onChange={(event) => handleFileChange(event, setSelectedFile)}
      />
      {selectedFile && (
        <div>
          <button onClick={() => handleUpdateFile(selectedFile, extractedText)}>
            Update File
          </button>
          <button onClick={() => handleTestUpdateFile(selectedFile)}>
            Test Update File
          </button>
        </div>
      )}
    </div>
  );
};

export default TextExtractor;
