import React from "react";
import FooterCpn from "./footer";
import HeaderCpn from "./header";
import NavbarCpn from "./navbar";

export default function MasterLayout({ children, title }) {
  return (
    <>
      <HeaderCpn title={title ? title : ""} />
      <div className="container">
        <NavbarCpn />
        <main>{children}</main>
        <FooterCpn />
      </div>
    </>
  );
}
