import React, { useEffect, useState } from "react";
import "../CSS/Librarian.css";
import "../CSS/User.css";
import AdminHeader from "./AdminHeader.jsx";
import AddLibrarian from "./AddLibrarian.jsx";

export default function Library() {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const headersList = {
                    Authorization: localStorage.getItem("token"),
                };
                const response = await fetch("http://localhost:3000/api/book/get-all-books", {
                    method: "GET",
                    headers: headersList
                });

                const data = await response.json();
                console.log(data);
                if (data.status === "success") {
                    setBooks(data.data.books);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
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
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>Image</th>
                                <th>Year</th>
                                <th>Available</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books.map((book) => (
                                <tr key={book.title}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.image}</td>
                                    <td>{book.year}</td>
                                    <td>{book.available}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )
                }
            </div>

            {status && <AddLibrarian changeView={changeView} />}
        </>
    );
}

