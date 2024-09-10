import React from 'react';
import './App.css';
import Start from "./components/Start";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Make_test from './components/make_test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/make_test" element={<Make_test/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
