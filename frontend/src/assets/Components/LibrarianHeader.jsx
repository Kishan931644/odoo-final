import {Link} from "react-router-dom";

export default function LibrarianHeader() {
    return (
        <header className="Header">
            <div className="logo-container">
                <img src="/Img/header-logo.png" alt="logo"/>
            </div>
            <div className="right-side">
                <button> <Link to={"/librarian/dashboard"} >Dashboard</Link></button>
                <button><Link to={"/library"} >Books</Link></button>
                <button><Link to={"/logout"} >Logout</Link></button>
            </div>
        </header>
    );
}