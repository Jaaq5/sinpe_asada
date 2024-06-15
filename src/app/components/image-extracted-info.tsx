"use client";
// components/LabeledTextInputs.tsx
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Group,
  Button,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import { IconCopy, IconCheck, IconRefresh } from "@tabler/icons-react";

interface LabeledTextInputsProps {
  labels: string[];
  placeholders?: string[];
  initialValues?: string[];
  onValuesChange?: (values: string[]) => void;
}

const LabeledTextInputs: React.FC<LabeledTextInputsProps> = ({
  labels,
  placeholders = [],
  initialValues = [],
  onValuesChange,
}) => {
  const [values, setValues] = useState<string[]>(
    new Array(labels.length).fill("")
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialValues.length > 0) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    if (onValuesChange) {
      onValuesChange(newValues);
    }
  };

  const handleCopy = (index: number) => {
    const textField = document.getElementById(
      `textInput_${index}`
    ) as HTMLInputElement;
    if (textField) {
      textField.select();
      document.execCommand("copy");
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleUpdateExcel = () => {
    console.log("Valores actuales de los TextInput:", values);
    // Aquí podrías implementar la lógica para actualizar el excel
  };

  return (
    <Group gap="xs" justify="center">
      {labels.map((label, index) => (
        <div key={index} style={{ position: "relative", width: "40%" }}>
          <TextInput
            id={`textInput_${index}`}
            label={label}
            placeholder={placeholders[index] || ""}
            value={values[index]}
            onChange={(event) => handleChange(index, event.currentTarget.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <Tooltip
            label={copiedIndex === index ? "Copiado" : "Copiar"}
            withArrow
            position="right"
          >
            <ActionIcon
              color={copiedIndex === index ? "teal" : "gray"}
              variant="subtle"
              onClick={() => handleCopy(index)}
              style={{
                position: "absolute",
                top: rem(4),
                right: rem(4),
              }}
            >
              {copiedIndex === index ? (
                <IconCheck style={{ width: rem(16) }} />
              ) : (
                <IconCopy style={{ width: rem(16) }} />
              )}
            </ActionIcon>
          </Tooltip>
        </div>
      ))}
      <Button
        color="green"
        rightSection={<IconRefresh size={14} />}
        onClick={handleUpdateExcel}
      >
        Actualizar excel
      </Button>
    </Group>
  );
};

export default LabeledTextInputs;
