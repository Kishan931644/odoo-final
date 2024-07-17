import {useEffect} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./assets/Components/Index.jsx";
import Login from "./assets/Components/Login.jsx";
import Registration from "./assets/Components/Registration.jsx";
import User from "./assets/Components/User.jsx";
import Dashboard from "./assets/Components/Dashboard.jsx";
import Librarian from "./assets/Components/Librarian.jsx";
import {GoogleOAuthProvider} from '@react-oauth/google';
import Logout from "./assets/Components/logout.jsx";
import Library from "./assets/Components/Library.jsx";
import Notification from "./assets/Components/Notification.jsx";

function App() {
    // useEffect(() => {
    //     fetch('http://localhost:3000/')
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    // }, []);

    return (
        <GoogleOAuthProvider clientId="27845722517-td15see51ltocmv30uq0a7gdmq1ujdd3.apps.googleusercontent.com">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/index" element={<Index/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/user" element={<User/>}/>
                    <Route path="/admin/dashboard" element={<Dashboard/>}/>
                    <Route path="/admin/user" element={<User/>}/>
                    <Route path="/admin/librarian" element={<Librarian/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/library" element={<Library/>}/>
                    <Route path="/notification" element={<Notification/>}/>
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )


}

export default App
