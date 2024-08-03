"use client";
import React from "react";
import styles from "@/styles/top-nav-menu.module.css";

// Componente Logo
const Logo: React.FC = () => {
  return (
    <div>
      <img
        src="/top-nav-bar-logo.png"
        alt="Logo"
        className={styles.logoImage}
      />
    </div>
  );
};

export interface TopNavMenuProps {
  logoText?: string;
  invoiceLinkText?: string;
  servicesLinkText?: string;
  sinpeLinkText?: string;
  loginLinkText?: string;
  navBackgroundColor?: string;
  linkTextColor?: string;
  linkTextSize?: string;
  onInvoiceClick?: () => void;
  onServicesClick?: () => void;
  onSinpeClick?: () => void;
}

const TopNavMenu: React.FC<TopNavMenuProps> = ({
  logoText = "ASADA Dulce Nombre Naranjo",
  invoiceLinkText = "Consultar recibo",
  servicesLinkText = "Tramites",
  sinpeLinkText = "Sinpe",
  loginLinkText = "Iniciar sesión",
  navBackgroundColor,
  linkTextColor,
  linkTextSize,
  onInvoiceClick,
  onServicesClick,
  onSinpeClick,
}) => {
  return (
    <div className={styles.navBar}>
      {/* Logo image */}
      <Logo />
      {/* */}
      <a className={styles.logoText} href="/">
        {logoText}
      </a>
      <nav
        className={styles.nav}
        style={{ backgroundColor: navBackgroundColor }}
      >
        <ul className={styles.menu}>
          <li>
            <a
              style={{ color: linkTextColor, fontSize: linkTextSize }}
              className={styles.link}
              href="https://acueductoscr.com/Recibos?provincia=2&idacueducto=3"
              target="_blank"
              rel="noopener noreferrer"
              title="Consulte su recibo en AcueductosCR"
              accessKey="c"
              hrefLang="es-ES"
              type="text/html"
              tabIndex={1}
              onClick={onInvoiceClick}
            >
              {invoiceLinkText}
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              style={{ color: linkTextColor, fontSize: linkTextSize }}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onServicesClick && onServicesClick();
              }}
            >
              {servicesLinkText}
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              style={{ color: linkTextColor, fontSize: linkTextSize }}
              href="/sinpe"
              title="Obtenga la información de un comprobante "
              accessKey="s"
              hrefLang="es-ES"
              type="text/html"
              tabIndex={3}
              onClick={onSinpeClick}
            >
              {sinpeLinkText}
            </a>
          </li>
        </ul>
      </nav>
      {/* Login link */}
      <a className={styles.loginButton} href="/">
        {loginLinkText}
      </a>
    </div>
  );
};

export default TopNavMenu;
