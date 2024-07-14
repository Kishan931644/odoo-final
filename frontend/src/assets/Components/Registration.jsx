import "../CSS/Login.css";
import {Link, useNavigate} from "react-router-dom";
import Header from "./Header.jsx";

export default function Registration() {
    const navigate = useNavigate();
    const Registar = async () => {
        try {
            const uname = document.getElementById("uname").value;
            const uemail = document.getElementById("uemail").value;
            const city = document.getElementById("city").value;
            const address = document.getElementById("address").value;
            const country = document.getElementById("country").value;
            const phone = document.getElementById("phone").value;
            const password = document.getElementById("password").value;

            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "name": uname,
                "address": address,
                "city": city,
                "country": country,
                "phone": phone,
                "password": password,
                "email": uemail
            });

            let response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            if (data.status == "success") {
                navigate("/login")
            } else {
                alert("Something went wrong!");
            }

        } catch (error) {
            console.log(error);
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
                        <h2>Register</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="input-group">
                                <label htmlFor="username">Name:</label>
                                <input type="text" id="uname" name="uname" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="username">Email:</label>
                                <input type="text" id="uemail" name="uemail" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">City:</label>
                                <input type="text" id="city" name="city" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Country:</label>
                                <input type="text" id="country" name="country" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Phone:</label>
                                <input type="text" id="phone" name="phone" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password: </label>
                                <input type="password" id="password" name="password" required/>
                            </div>

                            <button type="button" onClick={Registar}>Register</button>
                        </form>
                        <div className="links-container">
                            <Link to="/Login">Sign in with Email</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}