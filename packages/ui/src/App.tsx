import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "./state/Store";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

export const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path={"/*"} element={<MainLayout />} />
        <Route path={"*"} element={<MainLayout />} />
      </Routes>
    </HashRouter>
  </Provider>
);
