import Header from "./Header.jsx";
import {useNavigate} from "react-router-dom";

export default function Notification() {
    const navigate = useNavigate();

    if (localStorage.getItem('token') === null) {
        navigate('/login');
    }

    return (
        <>
            <Header childrens={
                <button>Logout</button>
            }/>

            <div className="container">
                <h1>Notifications</h1>
                <ul className="notification-list">
                    <div className="alert alert-info">Book info</div>
                    <div className="alert alert-info">Here's some information you may find useful!</div>
                    <div className="alert alert-info">Here's some information you may find useful!</div>
                </ul>
            </div>
        </>
    );
}