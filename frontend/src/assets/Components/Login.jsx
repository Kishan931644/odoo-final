import "../CSS/Login.css";
import {Link} from "react-router-dom";
import Header from "./Header.jsx";

export default function Login() {
    return (
        <>
            <Header childrens={
                <button><Link to="/"> Home</Link></button>
            }/>
            <div className="login-container">
                <div className="container">
                    <div className="signin-form">
                        <h2>Sign In</h2>
                        <form>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" required/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required/>
                            </div>
                            <button type="submit">Login</button>
                        </form>
                        <div className="links-container">
                            <Link to={"/Login"}>Sign up with Google</Link>
                            <Link to="/Registration">Sign up with Email</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}