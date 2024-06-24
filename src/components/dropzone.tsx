// components/BaseDemo.tsx
"use client";

import LabeledTextInputs from "./image-extracted-info";
import React, { useState, useEffect, useCallback } from "react";
import {
  Group,
  Text,
  rem,
  Image,
  SimpleGrid,
  Container,
  Grid,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  FileWithPath,
  DropzoneProps,
} from "@mantine/dropzone";
import Tesseract, { createWorker } from "tesseract.js";
import { updateTextInputs } from "../lib/update-text-inputs"; // Importamos la nueva función

interface ExtendedDropzoneProps extends Partial<DropzoneProps> {
  onFilesChange?: (files: FileWithPath[]) => void;
}

export function BaseDemo(props: ExtendedDropzoneProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileWithPath[]>([]);
  const [loadingPreviews, setLoadingPreviews] = useState<boolean>(false);
  const [fullHeight, setFullHeight] = useState<boolean>(false); // Estado para controlar la altura de la imagen
  const [extractedText, setExtractedText] = useState<string>("");
  const [textInputValues, setTextInputValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  // To avoid same image load fails
  const [previousFileName, setPreviousFileName] = useState<string | null>(null);

  const handleFilesChange = (newFiles: FileWithPath[]) => {
    setFiles(newFiles);
    if (props.onFilesChange) {
      props.onFilesChange(newFiles);
    }
  };

  const handleRejectedFiles = (rejected: FileWithPath[]) => {
    setRejectedFiles(rejected);
    console.log("rejected files", rejected);
    rejected.forEach((file) => {
      console.log("MIME type:", file.type);
    });
  };

  const processFile = async (file: FileWithPath) => {
    const worker = await createWorker("spa");
    const {
      data: { text },
    } = await worker.recognize(file);
    console.log("Texto extraído:", text);
    setExtractedText(text);
    setLoadingPreviews(false);
    await worker.terminate();
  };

  useEffect(() => {
    if (files.length > 0) {
      const file = files[0];
      console.log("Archivo actual: ", file.name);
      //console.log("Archivo anterior: ", previousFileName);

      // TODO Fix this to avoid loading the same image twice
      {
        /*
      if (file.name === previousFileName) {
        // Si el nombre del archivo es el mismo, no recargar ni reprocesar
        //updateTextInputs();
        //setLoadingPreviews(false);
        return;
      }
        */
      }
      //setLoadingPreviews(true); // Se establece a true antes de iniciar el proceso de reconocimiento
      //setPreviousFileName(file.name);
      processFile(file).catch((err) => console.error(err));
      //setLoadingPreviews(false); // Se establece a false cuando el proceso de reconocimiento ha terminado
    }
  }, [files]);

  useEffect(() => {
    if (extractedText) {
      updateTextInputs(extractedText, setTextInputValues);
      setLoadingPreviews(false);
    }
  }, [extractedText]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div key={index}>
        <Image
          alt="Imagen de comprobante de pago"
          src={imageUrl}
          onLoad={() => {
            //setLoadingPreviews(false);
            URL.revokeObjectURL(imageUrl);
          }}
          onError={() => setLoadingPreviews(false)}
          onClick={() => setFullHeight(!fullHeight)} // Cambia el estado al hacer clic en la imagen
          style={{
            maxWidth: "100%",
            maxHeight: fullHeight ? "100%" : "100vh", // Cambia la altura según el estado
            width: "auto",
            height: "auto",
            cursor: "pointer",
          }}
        />
      </div>
    );
  });

  return (
    <div style={{ flex: 1 }}>
      <Container style={{ display: "flex" }}>
        <div style={{ flex: 1, maxWidth: "80%" }}>
          <Dropzone
            loading={loadingPreviews}
            onDrop={(acceptedFiles) => {
              setLoadingPreviews(true);
              handleFilesChange(acceptedFiles);
              //handleRejectedFiles(rejectedFiles);
            }}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            maxFiles={1}
            // TODO This needs to be fixed
            //accept={IMAGE_MIME_TYPE}
            {...props}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
              <div>
                <Text size="xl" inline>
                  Arrastra el comprobante de pago aquí o haz clic
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  La imagen no debe exceder los 5MB
                </Text>
              </div>
            </Group>
          </Dropzone>
          <div>
            <LabeledTextInputs
              labels={["Paja", "Fecha", "Monto", "Banco", "Transacción"]}
              placeholders={["1234", "01/01/24", "8.000,00", "BCR", "12345678"]}
              initialValues={textInputValues}
              onValuesChange={setTextInputValues}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>{previews.length > 0 && previews}</div>
      </Container>
    </div>
  );
}
