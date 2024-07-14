import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./assets/Components/Index.jsx";

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )


}

export default App
