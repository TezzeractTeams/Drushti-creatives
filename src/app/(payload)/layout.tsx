/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { payloadServerFunction } from "./actions";
import { importMap } from "./admin/importMap.js";
import "./custom.css";

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={payloadServerFunction}>
    {children}
  </RootLayout>
);

export default Layout;
