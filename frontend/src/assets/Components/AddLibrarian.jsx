import {Link} from "react-router-dom";
import "../CSS/Pop-up.css";
import PropTypes from "prop-types";

export default function AddLibrarian({changeView}) {
    const addLibrarian = async () => {
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
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "name": uname,
                "email": uemail,
                "city": city,
                "address": address,
                "country": country,
                "phone": phone,
                "password": password
            });

            let response = await fetch("http://localhost:3000/api/admin//add-librarian", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            if (data.status != "success") {
                alert("Something went wrong!");
            }
                changeView();
        } catch (e) {
            console.log(e);
        }

    }
    return (
        <div id="pop-up-container" onClick={(e) => {
            if (e.target.id == "pop-up-container") {
                changeView();
            }
        }}>
            <div className="login-container">
                <div className="container">
                    <div className="signin-form">
                        <h2>Add Librarian</h2>
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

                            <button type="button" onClick={addLibrarian}>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
AddLibrarian.propTypes = {
    changeView: PropTypes.func.isRequired,
}