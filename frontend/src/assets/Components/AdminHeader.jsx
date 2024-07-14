import {Link} from "react-router-dom";

export default function AdminHeader() {
    return (
        <header className="Header">
            <div className="logo-container">
                <img src="/Img/header-logo.png" alt="logo"/>
            </div>
            <div className="right-side">
              <button> <Link to={"/admin/dashboard"} >Dashboard</Link></button>
                <button><Link to={"/admin/user"} >User</Link></button>
                <button><Link to={"/admin/librarian"} >Librarian</Link></button>
                <button><Link to={"/admin/book"} >Books</Link></button>
                <button><Link to={"/admin/logout"} >Logout</Link></button>
            </div>
        </header>
    );
}