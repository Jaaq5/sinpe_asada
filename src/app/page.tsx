import Image from "next/image";
import React from "react";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Bienvenidos a la ASADA de Agua
          </h2>
          <p className="mt-3 text-lg text-gray-500 sm:mt-5 sm:text-xl">
            Proporcionando agua potable de calidad a nuestra comunidad.
          </p>
        </div>
      </main>
    </div>
  );
}
