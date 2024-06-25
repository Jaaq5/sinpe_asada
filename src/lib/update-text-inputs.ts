// src/app/components/dropzone.tsx

/**
 * Finds a transaction code in the text.
 *
 * This function uses a regular expression to search for a transaction code in the given text.
 *
 * @param {string} text - The text to search for a transaction code.
 * @returns {string | null} The found transaction code or null if not found.
 */
const findTransactionCode = (text: string, bank: string): string | null => {
  //console.log("Text is:", text);

  if (bank === "BP") {
    const regex = /\bft[a-zA-Z\d]{8,18}\b/;
    //console.log("El texto es", text);
    const match = text.match(regex);
    console.log("Transaction code match", match);
    return match ? match[0] : null;
    // BAC #####################################################################
  } else if (bank === "BAC") {
    console.log("Text is", text);
    const regex = /\breferencia\s+(\d{8,26})\b/;
    const match = text.match(regex);
    console.log("Transaction code match", match);
    if (match) {
      const fullMatch = match[0]; // Captura completa de 23-26 dígitos
      const lastEightDigits = fullMatch.slice(-8); // Extrae los últimos 8 dígitos
      return lastEightDigits;
    }
    return null;
    // BCR #####################################################################
  } else if (bank === "BCR") {
    const regex = /\bdocumento\s+(\d{6,9})\b/;
    //console.log("El texto es", text);
    const match = text.match(regex);
    console.log("Transaction code match", match);
    if (match) {
      const fullMatch = match[0];
      const lastEightDigits = fullMatch.slice(-8);
      return lastEightDigits;
    }
    return null;
  } else {
    console.log("No transaction code found");
    return null;
  }
};

{
  /*
export const setTransactionCode = (
  text: string,
  setTextInputValues: (value: React.SetStateAction<string[]>) => void
) => {
  const transactionCode = findTransactionCode(text);
  if (transactionCode) {
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[4] = transactionCode;
      return newValues;
    });
  }
};
*/
}

/**
 * Sets the bank information based on the extracted text.
 *
 * This function analyzes the given text to determine which bank it is
 * associated with and updates the text input values accordingly.
 * It also attempts to find a transaction code if present.
 *
 * @param {string} text - The extracted text from the document.
 * @param {(value: React.SetStateAction<string[]>) => void} setTextInputValues - Function to update the text input values.
 */
export const setBank = (
  text: string,
  setTextInputValues: (value: React.SetStateAction<string[]>) => void
) => {
  const lowerCaseText = text.toLowerCase();

  // TODO This is for Banco Popular only
  //const transactionCode03 = findTransactionCode(text, "BCR");
  const transactionCode01 = findTransactionCode(text, "BP");
  //const transactionCode02 = findTransactionCode(text, "BAC");

  if (lowerCaseText.includes("bcr") || lowerCaseText.includes("documento")) {
    console.log("Banco encontrado: BCR");
    const transactionCode03 = findTransactionCode(text, "BCR");
    if (transactionCode03) {
      setTextInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[3] = "BCR";
        newValues[4] = transactionCode03.toUpperCase();
        return newValues;
      });
    } else {
      setTextInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[3] = "BCR";
        newValues[4] = "Pendiente";
        return newValues;
      });
    }
  } else if (lowerCaseText.includes("bac") || lowerCaseText.includes("hola")) {
    console.log("Banco encontrado: BAC");
    const transactionCode02 = findTransactionCode(text, "BAC");
    if (transactionCode02) {
      setTextInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[3] = "BAC";
        newValues[4] = transactionCode02.toUpperCase();
        return newValues;
      });
    } else {
      setTextInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[3] = "BAC";
        newValues[4] = "Pendiente";
        return newValues;
      });
    }
  } else if (
    lowerCaseText.includes("transacción procesada") ||
    lowerCaseText.includes("fecha del pago") ||
    lowerCaseText.includes("concepto")
  ) {
    console.log("Banco encontrado: BNCR");
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[3] = "BNCR";
      return newValues;
    });
  } else if (lowerCaseText.includes("banco popular")) {
    console.log("Banco encontrado: BP");
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[3] = "BP";
      return newValues;
    });
  } else if (transactionCode01) {
    console.log(
      `Banco encontrado: BP, Código de transacción: ${transactionCode01}`
    );
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[3] = "BP";
      newValues[4] = transactionCode01.toUpperCase();
      return newValues;
    });
    // TODO Others banks remaining
  } else {
    console.log("NO ENCONTRADO");
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[3] = "No encontrado";
      return newValues;
    });
  }
};

export const setDate = (
  text: string,
  setTextInputValues: (value: React.SetStateAction<string[]>) => void
) => {
  const lowerCaseText = text.toLowerCase();

  const datePatterns: {
    [key: string]: { regex: RegExp; months?: { [key: string]: string } };
  } = {
    bcr: {
      regex:
        /\b\d{1,2}\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre),?\s+\d{4}\b/,
      months: {
        enero: "01",
        febrero: "02",
        marzo: "03",
        abril: "04",
        mayo: "05",
        junio: "06",
        julio: "07",
        agosto: "08",
        septiembre: "09",
        octubre: "10",
        noviembre: "11",
        diciembre: "12",
      },
    },
    bac: {
      regex:
        /\b\d{1,2}\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre),?\s+\d{4}\b/,
      months: {
        enero: "01",
        febrero: "02",
        marzo: "03",
        abril: "04",
        mayo: "05",
        junio: "06",
        julio: "07",
        agosto: "08",
        septiembre: "09",
        octubre: "10",
        noviembre: "11",
        diciembre: "12",
      },
    },
    bncr: {
      regex: /\b\d{2}\/\d{2}\/\d{4}\b/,
    },
    otro: {
      regex: /tu_nuevo_regex_aqui/,
      months: {
        // Define aquí los meses y sus números correspondientes
      },
    },
  };

  let matchedPattern: string | undefined;
  let matchedDate: string | undefined;

  // Iteramos sobre las claves de datePatterns para encontrar coincidencias
  Object.keys(datePatterns).some((bank: string) => {
    const { regex } = datePatterns[bank];
    const match = text.match(regex);
    if (match) {
      matchedPattern = bank;
      matchedDate = match[0];
      return true; // Salimos del bucle al encontrar la primera coincidencia
    }
    return false;
  });

  // Si encontramos una coincidencia
  if (matchedPattern && matchedDate) {
    const { regex, months } = datePatterns[matchedPattern];

    // Manejar el patrón específico de bncr
    if (matchedPattern === "bncr") {
      const fechaFormateada = matchedDate.slice(0, 6) + matchedDate.slice(-2);
      setTextInputValues((prevValues) => [
        ...prevValues.slice(0, 1),
        fechaFormateada,
        ...prevValues.slice(2),
      ]);
      console.log("Fecha formateada:", fechaFormateada);
      return;
    }

    // Para otros patrones como bcr y bac
    const regexExtract = /(\d{1,2})\s+(de)?\s*(\w+),?\s+(\d{4})/;
    const matchExtract = matchedDate.match(regexExtract);

    if (matchExtract) {
      const [, dia, , mes, ano] = matchExtract;
      const mesNumero = months ? months[mes.toLowerCase()] : undefined;

      if (mesNumero) {
        const fechaFormateada = `${dia}/${mesNumero}/${ano.slice(-2)}`;
        setTextInputValues((prevValues) => [
          ...prevValues.slice(0, 1),
          fechaFormateada,
          ...prevValues.slice(2),
        ]);
        console.log("Fecha formateada:", fechaFormateada);
        return;
      }
    }
  }

  // Si no se encontró ninguna fecha válida, establecemos "Pendiente"
  setTextInputValues((prevValues) => [
    ...prevValues.slice(0, 1),
    "Pendiente",
    ...prevValues.slice(2),
  ]);
  console.log("La fecha no coincide con el patrón especificado.");
};

export const setAmount = (
  text: string,
  setTextInputValues: (value: React.SetStateAction<string[]>) => void
) => {
  const lowerCaseText = text.toLowerCase();

  // Expresión regular para buscar un número con decimales después de la palabra "transferido"
  //const regexAmount = /transferido\s+([\d.]+\,\d+)\b/i;
  const regexAmount = /transferido\s+(.*?)\s+motivo/;

  const match = lowerCaseText.match(regexAmount);
  console.log("Amount match:", match);

  if (match) {
    let amountText = match[1]; // Captura el texto que coincide con la expresión regular

    // Quitamos el primer dígito
    if (amountText.length > 1) {
      amountText = amountText.substring(1); // Eliminamos el primer dígito
    } else {
      amountText = "0"; // Si solo hay un dígito, establecemos el monto como 0
    }

    // Actualizamos el estado con el valor del monto
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[2] = amountText;
      return newValues;
    });

    console.log("Monto encontrado:", amountText);
  } else {
    console.log("Texto después de 'transferido' no es un número válido.");
  }
};

/**
 * Updates text input values based on the extracted text.
 *
 * This function processes the extracted text and calls `setBank` to determine the bank information
 * and update the text input values accordingly.
 *
 * @param {string} extractedText - The text extracted from the document.
 * @param {(value: React.SetStateAction<string[]>) => void} setTextInputValues - Function to update the text input values.
 */
export const updateTextInputs = (
  extractedText: string,
  setTextInputValues: (value: React.SetStateAction<string[]>) => void
) => {
  if (extractedText) {
    const lowerCaseText = extractedText.toLowerCase();
    setBank(lowerCaseText, setTextInputValues);
    //setTransactionCode(lowerCaseText, setTextInputValues);
    setAmount(lowerCaseText, setTextInputValues);
    setDate(lowerCaseText, setTextInputValues);
    //setServiceNumber(lowerCaseText, setTextInputValues)
  }
};
