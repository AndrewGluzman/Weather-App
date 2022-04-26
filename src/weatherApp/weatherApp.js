import "./weatherApp.css";
import { Provider } from "react-redux";
import React from "react";
import Favorites from "./components/favorites";
import HomePage from "./components/homePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainBody from "./components/Body/mainBody";

function WeatherApp(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default WeatherApp;
