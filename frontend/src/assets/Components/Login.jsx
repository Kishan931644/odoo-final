import "../CSS/Login.css";
import {Link, useNavigate} from "react-router-dom";
import Header from "./Header.jsx";
import {useEffect, useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const signupWithGoogle = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/google", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": localStorage.getItem("token")
                }
            });

            const data = await response.json();
            data && console.log(data);
            if (data.status === "success") {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("role", data.data.role);
                if (data.data.role === "admin") {
                    navigate("/admin/dashboard");
                }else if(data.data.role === "user") {
                    navigate("/");
                }else if(data.data.role === "librarian") {
                    navigate("/library");
                }
            } else {
                setError(data.data.message);
            }
        } catch (e) {
            console.error("Error signing up with Google:", e);
            setError(e);
        }
    }
    
    const LoginUser = async () => {
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "email": email,
                "password": password,
            });

            let response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();

            if (data.status == "success") {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("role", data.data.role);
                if (data.data.role === "admin") {
                    navigate("/admin/dashboard");
                }else if(data.data.role === "user") {
                    navigate("/");
                }else if(data.data.role === "librarian") {
                    navigate("/library");
                }
            } else {
                console.log(data)
                setError(data.data.message);
            }
        } catch (e) {
            console.log(e)
            setError(e);
        }
    }

    return (
        <>
            <Header childrens={
                <button><Link to="/"> Home</Link></button>
            }/>
            <div className="login-container">
                <div className="container">
                    <div className="signin-form">
                        <h2>Sign In</h2>
                        {error && <div className="error">{error}</div>}

                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="uemail" name="uemail" value={email} onChange={(e) => {
                                    setEmail((e.target.value))
                                }} required/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => {
                                    setPassword((e.target.value))
                                }} required/>
                            </div>
                            <button type="button" onClick={LoginUser}>Login</button>
                        </form>
                        <div className="links-container">
                            <button onClick={signupWithGoogle}>Sign up with Google</button>
                            <Link to="/Registration">Sign up with Email</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}