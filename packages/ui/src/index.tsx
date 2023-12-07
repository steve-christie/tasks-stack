import "./init";
import React from "react";
import "./index.css";
import { App } from "./App";

import { createRoot } from "react-dom/client";

const appRoot = document.getElementById("root");

if (appRoot) {
  const root = createRoot(appRoot);
  root.render(<App />);
}
