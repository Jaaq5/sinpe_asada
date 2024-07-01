// src/components/dropzone.tsx

export const setServiceNumber = (
  text: string,
  setTextInputValues: (value: React.SetStateAction<string[]>) => void
) => {
  const lowerCaseText = text.toLowerCase();

  const serviceNumberPatterns: {
    [key: string]: { regex: RegExp };
  } = {
    motivo: {
      regex: /\bmotivo\s+(.+?)\b(\d{3,4})\b/,
    },
    motivo2: {
      regex: /\bmotivo\s\b(\d{3,4})\b/,
    },
    paja: {
      regex: /\bpaja\s+(\d+)\b/,
    },
    paja2: {
      regex: /\bpaja(\d+)\b/,
    },
    bncr: {
      regex: /(\d{4})\s*.*?\s*concepto/,
    },
    bac: {
      regex: /\bdetalle\s+(.+?)*\b(\d{3,5})\b/,
    },
  };

  let matchedPattern: string | undefined;
  let matchedServiceNumber: string | undefined;

  // Iteramos sobre las claves de serviceNumberPatterns para encontrar coincidencias
  Object.keys(serviceNumberPatterns).some((patternKey: string) => {
    const { regex } = serviceNumberPatterns[patternKey];
    const match = text.match(regex);
    if (match) {
      //console.log("match", match);
      matchedPattern = patternKey;
      if (
        matchedPattern === "paja" ||
        matchedPattern === "paja2" ||
        matchedPattern === "motivo2" ||
        matchedPattern === "bncr"
      ) {
        matchedServiceNumber = match[1];
        return true;
      } else {
        matchedServiceNumber = match[2];
        return true;
      }
    }
    return false;
  });

  if (matchedPattern && matchedServiceNumber) {
    const serviceNumberFormatted = matchedServiceNumber.slice(-4);

    setTextInputValues((prevValues) => [
      serviceNumberFormatted,
      ...prevValues.slice(1),
    ]);

    console.log("Service number match:", serviceNumberFormatted);
    return;
  }
  // Si no se encontró ninguna fecha válida, establecemos "Pendiente"
  setTextInputValues((prevValues) => [
    "Pendiente", // Modificar el primer valor con fechaFormateada
    ...prevValues.slice(1), // Mantener los valores restantes sin cambios
  ]);
  console.log("Service number match:", matchedServiceNumber);
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
    bncrOrBp: {
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
    if (matchedPattern === "bncrOrBp") {
      const fechaFormateada = matchedDate.slice(0, 6) + matchedDate.slice(-2);
      setTextInputValues((prevValues) => [
        ...prevValues.slice(0, 1),
        fechaFormateada,
        ...prevValues.slice(2),
      ]);
      console.log("Date match:", fechaFormateada);
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
        console.log("Date match:", fechaFormateada);
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
  console.log("Date match:", matchedDate);
};

export const setAmount = (
  extractedText: string,
  setTextInputValues: (value: React.SetStateAction<string[]>) => void
) => {
  const lowerCaseText = extractedText.toLowerCase();

  const amountPatterns: {
    [key: string]: { regex: RegExp };
  } = {
    BCR1: {
      regex: /\bdebitado\s+(.*?)\s+comisión/,
    },
    BCR2: {
      regex: /\btransferido\s+(.*?)\s+motivo/,
    },
    BCR3: {
      regex: /\b\d{1,3}(?:\.\d{3})+(?:,\d{2})+\b/,
    },
    BNCR1: {
      regex: /\d{1,3}(?:,\d{1,3})+(?:\.\d{2})+\s*colones/,
    },
    BAC1: {
      regex: /\bmonto\s+(.*?)\s+/,
    },
    Generic2: {
      regex: /\b\d{1,3}(?:\,\d{3})+(?:.\d{2})+\b/,
    },
  };

  let matchedPattern: string | undefined;
  let matchedAmount: string | undefined;

  Object.keys(amountPatterns).some((patternKey: string) => {
    const { regex } = amountPatterns[patternKey];
    const match = extractedText.match(regex);
    if (match) {
      matchedPattern = patternKey;
      //console.log("Matched pattern:", matchedPattern);
      //console.log("Match:", match);

      if (
        matchedPattern === "BCR1" ||
        matchedPattern === "BCR2" ||
        matchedPattern === "BAC1"
      ) {
        matchedAmount = match[1];
        return true;
      } else {
        matchedAmount = match[0];
        return true;
      }
    }
    return false;
  });

  if (matchedPattern && matchedAmount) {
    // Delete first number
    if (
      matchedPattern === "BCR1" ||
      matchedPattern === "BCR2" ||
      matchedPattern === "BAC1"
    ) {
      matchedAmount = matchedAmount.substring(1);
    } else if (matchedPattern === "BNCR1") {
      let index = matchedAmount.lastIndexOf(" colones");
      matchedAmount = matchedAmount.substring(0, index);
    }

    const amountFormatted = matchedAmount;

    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[2] = amountFormatted;
      return newValues;
    });

    console.log("Amount match:", amountFormatted);
    return;
  }

  setTextInputValues((prevValues) => {
    const newValues = [...prevValues];
    newValues[2] = "Pendiente";
    return newValues;
  });
  console.log(`Amount match: ${matchedAmount}`);
};

/**
 * Sets the bank name based on extracted text using predefined regex patterns.
 *
 * @param {string} extractedText - The text from which to extract and identify the bank.
 * @param {function} setTextInputValues - Function to update the state with new input values.
 * @returns {void}
 *
 * @example
 *
 *  setBank('Text with bcr keyword', setTextInputValues);
 */
export const setBank = (
  extractedText: string,
  setTextInputValues: (inputValue: React.SetStateAction<string[]>) => void
) => {
  /**
   * Array of objects containing regex patterns and corresponding bank names.
   *
   * @const {Array<{ regex: RegExp, bankName: string }>}
   */
  const bankRegexs = [
    { regex: /\b(bcr|documento)\b/gi, bankName: "BCR" },
    {
      regex: /\b(transacción procesada|fecha del pago|concepto)\b/gi,
      bankName: "BNCR",
    },
    { regex: /\b(bac|hola)\b/gi, bankName: "BAC" },
    {
      regex: /\b(pase|ha enviado|has pasado|ha pasado)\b/gi,
      bankName: "SMS",
    },
    { regex: /\b(banco popular)\b/gi, bankName: "BP" },
    { regex: /\bft[a-zA-Z\d]{8,15}\b/, bankName: "BP" },
  ];

  let matchedBankRegex: { regex: RegExp; bankName: string } | undefined;

  // Iterate through regex patterns to find a match
  for (const match of bankRegexs) {
    const bankRegex = match.regex;
    if (extractedText.match(bankRegex)) {
      matchedBankRegex = match;
      break;
    }
  }

  // Update state based on matched bank regex
  if (matchedBankRegex) {
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[3] = matchedBankRegex.bankName;
      return newValues;
    });
    console.log(`Bank match: ${matchedBankRegex.bankName}`);

    // Pending when not match found
  } else {
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[3] = "Pendiente";
      return newValues;
    });
    console.log(`Bank match: ${matchedBankRegex}`);
  }
};

/**
 * Sets the transaction code based on extracted text using predefined regex patterns.
 *
 * @param {string} extractedText - The text from which to extract and identify the transaction code.
 * @param {function} setTextInputValues - Function to update the state with new input values.
 * @returns {void}
 *
 * @example
 *
 *  setTransactionCode('Text with FT12345678 keyword', setTextInputValues);
 */
export const setTransactionCode = (
  extractedText: string,
  setTextInputValues: (inputValue: React.SetStateAction<string[]>) => void
) => {
  const transactionCodePatterns: {
    [key: string]: { regex: RegExp };
  } = {
    BP: {
      regex: /\bft[a-zA-Z\d]{8,18}\b/,
    },
    BAC: {
      regex: /\breferencia\s+(\d{8,26})\b/,
    },
    BCR: {
      regex: /\bdocumento\s+(\d{6,9})\b/,
    },
    BNCR1: {
      regex: /\b(\d{8})\s+(\s*comprobante)+\b/,
    },
    BNCR2: {
      regex: /\b(9\d{7})\s*(\d{1,3})*\b/,
    },
  };

  let matchedPattern: string | undefined;
  let matchedTransactionCode: string | undefined;

  // Iterate over the keys of transactionCodePatterns to find matches
  Object.keys(transactionCodePatterns).some((patternKey: string) => {
    const { regex } = transactionCodePatterns[patternKey];
    const match = extractedText.match(regex);
    if (match) {
      matchedPattern = patternKey;
      matchedTransactionCode = match[1];
      //console.log("Match:", match);
      console.log("Match pattern:", matchedPattern);
      return true;
    }
    return false;
  });

  // If a match is found
  if (matchedPattern && matchedTransactionCode) {
    // Example of additional processing if needed
    const transactionCodeFormatted = matchedTransactionCode.slice(-8); // Take the last 8 characters

    // Update state with new transaction code
    setTextInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[4] = transactionCodeFormatted;
      return newValues;
    });

    console.log("Transaction code match:", transactionCodeFormatted);
    return;
  }

  // If no valid transaction code is found, set "Pending"
  setTextInputValues((prevValues) => {
    const newValues = [...prevValues];
    newValues[4] = "Pendiente";
    return newValues;
  });
  console.log(`Transaction code match: ${matchedTransactionCode}`);
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
  setTextInputValues: (inputValue: React.SetStateAction<string[]>) => void
) => {
  if (extractedText) {
    const lowerCaseText = extractedText.toLowerCase();
    setServiceNumber(lowerCaseText, setTextInputValues);
    setDate(lowerCaseText, setTextInputValues);
    setAmount(lowerCaseText, setTextInputValues);
    setBank(lowerCaseText, setTextInputValues);
    setTransactionCode(lowerCaseText, setTextInputValues);
  }
};
