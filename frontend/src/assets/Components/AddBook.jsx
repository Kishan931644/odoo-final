import {Link} from "react-router-dom";
import "../CSS/Pop-up.css";
import PropTypes from "prop-types";

export default function AddBook({changeView}) {
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
            if (data.status !== "success") {
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
                                <label htmlFor="username">ISBN:</label>
                                <input type="number" id="isbn" name="ISBN" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="username">Title:</label>
                                <input type="text" id="uemail" name="uemail" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Description:</label>
                                <input type="text" id="desc" name="desc" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Author:</label>
                                <input type="text" id="author" name="author" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Publisher:</label>
                                <input type="text" id="publisher" name="publisher" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Image:</label>
                                <input type="file" id="Image" name="Image" required/>
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Year: </label>
                                <input type="year" id="publish_year" name="publish_year" required/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Available: </label>
                                <input type="number" id="avl" name="avl" required/>
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