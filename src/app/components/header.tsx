// app/ui/Header.tsx
import React from "react";
import NavBar from "./nav-bar";

const Header: React.FC = () => {
  return (
    <header>
      <NavBar /> {/* Incluye el NavBar aquí */}
      {/* Aquí puedes añadir otros elementos del encabezado si los necesitas */}
    </header>
  );
};

export default Header;
