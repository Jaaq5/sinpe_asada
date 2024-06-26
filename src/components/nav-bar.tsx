import React from "react";
import Image from "next/image";
import Link from "next/link";
//"use client";

const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 h-16">
      <div className="flex-1">
        <Link href="/">
          <span className="btn btn-ghost text-xl cursor-pointer">
            ASADA Dulce Nombre de Naranjo
          </span>
        </Link>
        <Link href="/imagenes">
          <span className="btn btn-ghost text-xl cursor-pointer">
            Control SINPE
          </span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Buscar"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          ></div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
