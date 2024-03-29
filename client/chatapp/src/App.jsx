import React from 'react';
import './App.css'
import Home from "./components/home"
import Chat from "./components/chat"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [data, setData] = useState({})
  const handleSubmit = (event, data) => {
    setData(data)
    data=JSON.stringify(data)
    sessionStorage.setItem("inpData",data)

  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home handleSubmit={handleSubmit} />}></Route>
          <Route path="/chat" element={<Chat />} ></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
