import React, { useEffect, useMemo, useState } from "react";
import "../CSS/Librarian.css";
import "../CSS/User.css";
import AdminHeader from "./AdminHeader.jsx";
import AddLibrarian from "./AddLibrarian.jsx";

export default function Librarian() {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [librarians, setLibrarians] = useState([]);

   
    useEffect(() => {
        const fetchLibrarians = async () => {
            try {
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                    "Authorization": localStorage.getItem("token")
                }

                let response = await fetch("http://localhost:3000/api/librarian/get-librarians", {
                    method: "GET",
                    headers: headersList
                });

                const data = await response.json();
                if (data.status === "success") {
                    setLibrarians(data.data);
                }
            } catch (error) {
                console.error("Error fetching librarians:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLibrarians();
    }, []);

    const changeView = () => {
        setStatus(!status);
    }

    return (
        <>
            <AdminHeader />
            <div className="btn-container">
                <button onClick={changeView}>Add +</button>
            </div>

            <div className="user-container">
                <p>Click the names to see more data.</p>
                {
                    !loading &&
                    <table>
                        <thead>
                        <tr className="table-headers">
                            <th>Name</th>
                            <th>Number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                        </tr>
                        </thead>
                        <tbody>
                        {librarians.map((librarian) => (
                            <tr key={librarian.id}>
                                <td>{librarian.name}</td>
                                <td>{librarian.phone}</td>
                                <td>{librarian.email}</td>
                                <td>{librarian.address}</td>
                                <td>{librarian.city}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
                {loading && <p>Loading...</p>}
            </div>

            {
                status && <AddLibrarian changeView={changeView} />
            }
        </>
    );
}
