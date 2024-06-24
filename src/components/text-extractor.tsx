// app/components/TextExtractor.tsx
// Client rendering, useState use it
"use client";

import React, { useState } from "react";
import Tesseract from "tesseract.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Image from "next/image";

import {
  handleImageChange,
  handleExtractAllText,
  handleExtractText,
  handleExtractTransaction,
} from "../lib/image-utils";

import {
  handleFileChange,
  handleUpdateFile,
  handleTestUpdateFile,
  handleDownloadFile,
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div>
      <label htmlFor="image-upload" className="btn btn-primary">
        <i className="fas fa-cloud-upload-alt"></i>Cargar imagen
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={(event) =>
          handleImageChange(event, setSelectedImage, setImageUrl)
        }
        style={{ display: "none" }}
      />
      <div
        onDragOver={(event) => handleDragOver(event, setDragOver)}
        onDragLeave={(event) => handleDragLeave(event, setDragOver)}
        onDrop={(event) =>
          handleDrop(event, setDragOver, setSelectedImage, setImageUrl)
        }
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
      {/*
      {imageUrl && (
        <div>
          <h2>Imagen cargada:</h2>
          <div style={{ maxWidth: "30%", maxHeight: "30%" }}>
            <Image
              src={imageUrl}
              alt="Imagen cargada"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
        </div>
      )}
      */}
      {selectedImage && (
        <div>
          <button
            className="btn btn-outline btn-primary"
            onClick={() =>
              handleExtractTransaction(selectedImage, setExtractedText)
            }
          >
            Obtener transaccion
          </button>
          <button
            className="btn btn-outline btn-primary"
            onClick={() =>
              handleExtractAllText(selectedImage, setExtractedText)
            }
          >
            Obtener todo el texto
          </button>
        </div>
      )}
      {extractedText && (
        <div>
          <h2>Texto obtenido:</h2>
          <p>{extractedText}</p>
        </div>
      )}
      <label htmlFor="file-upload" className="btn btn-outline btn-accent">
        <i className="fas fa-cloud-upload-alt"></i>Cargar excel
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx"
        onChange={(event) => handleFileChange(event, setSelectedFile)}
        style={{ display: "none" }}
      />
      {selectedFile && (
        <div>
          <button
            className="btn btn-success"
            onClick={() =>
              handleUpdateFile(selectedFile, extractedText, setSelectedFile)
            }
          >
            Actualizar excel
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleDownloadFile(selectedFile)}
          >
            Descargar excel
          </button>
          {/*
          <button onClick={() => handleTestUpdateFile(selectedFile)}>
            Test Update File
          </button>
          */}
        </div>
      )}
      {imageUrl && (
        <div style={{ flex: 1 }}>
          <h2>Imagen cargada:</h2>
          <div style={{ maxWidth: "40%", maxHeight: "40%" }}>
            <Image
              src={imageUrl}
              alt="Imagen cargada"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextExtractor;
