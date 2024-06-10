// app/pages/page.tsx
//"use client";

import React from "react";
import TextExtractor from "../components/text-extractor";

const Page: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <TextExtractor />
    </div>
  );
};

export default Page;
