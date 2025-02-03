import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StatusBar, Style } from "@capacitor/status-bar";

const container = document.getElementById("root");
const root = createRoot(container!);
StatusBar.setStyle({ style: Style.Dark });
root.render(
  // removed the <React.StrictMode> tag
      <App />
);
