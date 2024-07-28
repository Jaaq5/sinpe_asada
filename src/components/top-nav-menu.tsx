// components/TopNavMenu.tsx

import React from "react";
import styles from "@/styles/top-nav-menu.module.css";

export interface TopNavMenuProps {
  text1?: string;
  text2?: string;
  text3?: string;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * A navigation menu component with customizable link texts and colors.
 *
 * @component
 * @example
 * return (
 *   <TopNavMenu text1="Consult" text2="Services" text3="Contact" backgroundColor="#eee" textColor="#333" />
 * )
 */
const TopNavMenu: React.FC<TopNavMenuProps> = ({
  text1 = "Consultar recibo",
  text2 = "Trámites",
  text3 = "Contacto",
  backgroundColor = "var(--nav-background-color)", // Use CSS variable
  textColor = "var(--link-color)", // Use CSS variable
}) => {
  return (
    <nav className={styles.nav} style={{ backgroundColor }}>
      <ul className={styles.menu}>
        <li>
          <a
            href="#consultar-recibo"
            className={styles.link}
            style={{ color: textColor }}
          >
            {text1}
          </a>
        </li>
        <li>
          <a
            href="#tramites"
            className={styles.link}
            style={{ color: textColor }}
          >
            {text2}
          </a>
        </li>
        <li>
          <a
            href="#contacto"
            className={styles.link}
            style={{ color: textColor }}
          >
            {text3}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavMenu;
