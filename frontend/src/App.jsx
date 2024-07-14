import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./assets/Components/Index.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
