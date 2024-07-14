import React, { useEffect, useState } from "react";
import "../CSS/Librarian.css";
import "../CSS/User.css";
import AdminHeader from "./AdminHeader.jsx";
import AddBook from "./AddBook.jsx";
import LibrarianHeader from "./LibrarianHeader.jsx";

export default function Library() {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const headersList = {
                    Authorization: localStorage.getItem("token"),
                };
                const response = await fetch("http://localhost:3000/api/book/get-all-users", {
                    method: "GET",
                    headers: headersList
                });

                const data = await response.json();
                console.log(data);
                if (data.status === "success") {
                    console.log(data);
                    setUser(data.data.users);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const changeView = () => {
        setStatus(!status);
    };

    return (
        <>
            <AdminHeader />
            <div className="btn-container">
                <button onClick={changeView}>Add +</button>
            </div>

            <div className="user-container">
                <p>Click the names to see more data.</p>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table>
                            <thead>
                            <tr className="table-headers">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Books</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.name}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address} , {user.city}, {user.country}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )
                }
            </div>

            {status && <AddBook changeView={changeView} />}
        </>
    );
}
