// app/ui/Header.tsx
import React from "react";
import NavBar from "./nav-bar";
import { HeaderTabs } from "./mantine-nav-bar";

const Header: React.FC = () => {
  return (
    <header>
      <HeaderTabs /> {/* Incluye el NavBar aquí */}
      <br />
      {/* Aquí puedes añadir otros elementos del encabezado si los necesitas */}
    </header>
  );
};

export default Header;
