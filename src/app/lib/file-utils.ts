// app/lib/fileUtils.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React from "react";

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedFile(file);
  }
};

export const handleUpdateFile = (
  selectedFile: File | null,
  extractedText: string,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
) => {
  if (selectedFile && extractedText) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: (string | number | null | undefined)[][] =
        XLSX.utils.sheet_to_json(sheet, { header: 1 });

      let columnIndex = -1;
      for (let i = 0; i < json[0].length; i++) {
        if (json[0][i] === "Transaccion") {
          columnIndex = i;
          break;
        }
      }

      if (columnIndex === -1) {
        console.error('No se encontró la columna "Transaccion".');
      } else {
        let foundEmptyCell = false;
        for (let i = 1; i < json.length; i++) {
          if (!json[i][columnIndex]) {
            json[i][columnIndex] = extractedText;
            foundEmptyCell = true;
            break;
          }
        }

        if (!foundEmptyCell) {
          json.push([]);
          json[json.length - 1][columnIndex] = extractedText;
        }

        const updatedSheet = XLSX.utils.aoa_to_sheet(json);
        const updatedWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(updatedWorkbook, updatedSheet, "Sheet1");
        const wbout = XLSX.write(updatedWorkbook, {
          bookType: "xlsx",
          type: "array",
        });

        // Ahora actualizamos el estado del archivo seleccionado
        setSelectedFile(
          new File([wbout], selectedFile.name, {
            type: "application/octet-stream",
          })
        );
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  } else {
    console.error("No hay archivo seleccionado o texto extraído.");
  }
};

export const handleDownloadFile = (updatedFile: File | null) => {
  if (updatedFile) {
    saveAs(updatedFile, "Control_SINPE_Junio_2024.xlsx");
  } else {
    console.error("No hay archivo actualizado para descargar.");
  }
};

export const handleTestUpdateFile = (selectedFile: File | null) => {
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: (string | number | null | undefined)[][] =
        XLSX.utils.sheet_to_json(sheet, { header: 1 });

      let columnIndex = -1;
      for (let i = 0; i < json[0].length; i++) {
        if (json[0][i] === "Transaccion") {
          columnIndex = i;
          break;
        }
      }

      if (columnIndex === -1) {
        console.error('No se encontró la columna "Transaccion".');
      } else {
        let foundEmptyCell = false;
        for (let i = 1; i < json.length; i++) {
          if (!json[i][columnIndex]) {
            json[i][columnIndex] = "Texto de prueba";
            foundEmptyCell = true;
            break;
          }
        }

        if (!foundEmptyCell) {
          json.push([]);
          json[json.length - 1][columnIndex] = "Texto de prueba";
        }

        const updatedSheet = XLSX.utils.aoa_to_sheet(json);
        const updatedWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(updatedWorkbook, updatedSheet, "Sheet1");
        const wbout = XLSX.write(updatedWorkbook, {
          bookType: "xlsx",
          type: "array",
        });

        saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "Test_File.xlsx"
        );
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  } else {
    console.error("No hay archivo seleccionado.");
  }
};
