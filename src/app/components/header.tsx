// app/ui/Header.tsx
import React from "react";
import NavLink from "./nav-link";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">ASADA de Agua</h1>
          </div>
          <nav className="hidden sm:flex sm:space-x-4">
            <NavLink href="imagenes">CONTROL SINPE </NavLink>
            <span className="ml-4">
              <NavLink href="#placeholder1">TEXTO 01</NavLink>
            </span>
            <span className="ml-4">
              <NavLink href="#placeholder2">TEXTO 02</NavLink>
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
