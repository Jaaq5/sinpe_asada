// app/pages/page.tsx
//"use client";

import React, { Suspense } from "react";
import TextExtractor from "../../components/text-extractor";
import { BaseDemo } from "../../components/dropzone";
import LabeledTextInputs from "../../components/image-extracted-info";
//import Loading from "../loading";

const Page: React.FC = () => {
  return (
    <div>
      {/*<TextExtractor />*/}
      <div>
        <BaseDemo />
      </div>
      {/*
      <div className="p-8">
        <LabeledTextInputs
          labels={["Paja", "Fecha", "Monto", "Banco", "Transacción"]}
          placeholders={["1234", "01/01/24", "8.000,00", "BCR", "12345678"]}
          initialValues={["1234", "01/01/24", "8.000,00", "BCR", "12345678"]}
        />
      </div>
      */}
    </div>
  );
};

export default Page;
