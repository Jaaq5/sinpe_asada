import Image from "next/image";
import React from "react";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <br />
      <div className="absolute inset-0 overflow-hidden">
        {/* Capa semitransparente */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        {/* Video de fondo */}
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          src="https://www.youtube.com/embed/rEe9DNmuqVw?autoplay=1&mute=1&controls=0&playlist=rEe9DNmuqVw&loop=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <main className="relative z-10 mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl tracking-tight font-extrabold sm:text-4xl">
            Bienvenidos a la ASADA de Dulce Nombre de Naranjo
          </h2>
          <p className="mt-3 text-lg sm:mt-5 sm:text-xl">
            El agua es fuente de vida.
          </p>
        </div>
      </main>
    </div>
  );
}
