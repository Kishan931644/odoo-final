import {Link} from "react-router-dom";

export default function AddLibrarian() {
    return (
        <div className="login-container">
            <div className="container">
                <div className="signin-form">
                    <h2>Sign In</h2>
                    <form>
                        <div className="input-group">
                            <label htmlFor="username">Name</label>
                            <input type="text" id="uname" name="uname" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="username">Email</label>
                            <input type="text" id="uemail" name="uemail" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required/>
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}