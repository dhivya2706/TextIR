import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SuperResolution from "./pages/SuperResolution";
import Colourization from "./pages/Colourization";
import Degrading from "./pages/Degrading";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/super-resolution" element={<SuperResolution />} />
        <Route path="/colourization" element={<Colourization />} />
        <Route path="/degrading" element={<Degrading />} />
      </Routes>
    </>
  );
}

export default App;