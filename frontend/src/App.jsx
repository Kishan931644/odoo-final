import {useEffect} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./assets/Components/Index.jsx";
import Login from "./assets/Components/Login.jsx";
import Registration from "./assets/Components/Registration.jsx";
import User from "./assets/Components/User.jsx";

function App() {
    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => console.log(data))
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/index" element={<Index/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/user" element={<User/>}/>
            </Routes>
        </BrowserRouter>
    )


}

export default App
