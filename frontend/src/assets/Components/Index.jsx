import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import "../CSS/Home.css";
import { useEffect, useState } from "react";

export default function Index() {
    const [book, setBook] = useState(null);
    const [popularBooks, setPopularBooks] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState(null);

    const [user, setProfile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": localStorage.getItem("token")
            }

            let response = await fetch("http://localhost:3000/api/user/getowndetails", {
                method: "POST",
                headers: headersList
            });

            let data = await response.json();
            if (data.status == "success") {
                let user = data.data.user;
                setProfile(user);
            }
        }

        fetchUser();
    }, []);


    useEffect(() => {
        const fetchBooks = async () => {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }

            let response = await fetch("http://localhost:3000/api/book/get-all-books", {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            console.log(data.data.books);
            if (data.status == "success") {
                let listOfBooks = data.data.books;
                setBook(listOfBooks);
            }
        }

        const fetchRecommendedBooks = async () => {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": localStorage.getItem("token")
            }

            let response = await fetch("http://localhost:3000/api/book/getrecommodadedbooks", {

                method: "GET",
                headers: headersList
            });
            let data = await response.json();

            let listOfBooks = data.data.books;
            setRecommendedBooks(listOfBooks);
            if (data.status == "success") {
            }
        }

        const fetchPopularBooks = async () => {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": localStorage.getItem("token")
            }

            let response = await fetch("http://localhost:3000/api/book/getpopularbooks", {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            if (data.status == "success") {
                let listOfBooks = data.data.popularBooks;
                setPopularBooks(listOfBooks);
            }
        }

        fetchBooks();
        fetchRecommendedBooks();
        fetchPopularBooks();
    }, []);
    return (
        <>
            <Header childrens={
                <button type="button">
                    {(localStorage.getItem("token") == null) ? (<Link to="/login">Login</Link>) : (
                        <Link to="/logout">Log out</Link>)}
                </button>}

            />
            <main className="main-container">
                <div className="home-header">
                    <h2>Search the book available in Library</h2>
                    <form role="search">
                        <div className="input-container">
                            <input type="search" className="search-input" value="" name="s"
                                placeholder="Search Book name,author" />
                            <button type="submit" className="search-submit" name="submit"><i
                                className="material-icons">search</i></button>
                        </div>
                    </form>
                </div>

                <div className="main-books-container">
                    <div className="new-available">
                        <h2>New Available</h2>
                        <div className="books-container">

                            {book &&
                                book?.map((book) => 

                                    (<div className="book-card">
                                        <div className="book-img-container">
                                            <img src={book.thubnnailLink && "/Img/sample%20book.jpg"} alt="" />
                                        </div>
                                        <div className="content">
                                            <Link to={"/"} className="book-name">{book.title}</Link>
                                            <div className="details">
                                                <div className="author">{book.author}</div>
                                                <div className="realese-year"> {book.year}</div>
                                            </div>
                                            <div className="description">{book.desc}</div>
                                        </div>
                                    </div>)
                                )}
                        </div>
                    </div>
                    {
                        user == null && (<div className="trending-bok">
                            <h2>Trending Available</h2>
                            <div className="books-container">
                                {
                                    popularBooks && popularBooks.map((book) => (

                                        <div className="book-card">
                                            <div className="book-img-container">
                                                <img src={book.thumnailLink} alt="" />
                                            </div>
                                            <div className="content">
                                                <Link to={"/"} className="book-name">{book.title}</Link>
                                                <div className="details">
                                                    <div className="author">{book.auther}</div>
                                                    <div className="realese-year">{book.year}</div>
                                                </div>
                                                <div className="description">{book.desc}</div>
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>
                        </div>)
                    }
                    {
                        user != null && (<div className="profile-container">

                            <div className="profile">
                                <div className="profile-img">
                                    <img src="/Img/Profile%20Image.png" alt="" />
                                </div>
                                <div className="profile-details">
                                    <div className="profile-role">Role: {user.role}</div>
                                    <div className="profile-name">Name: {user.name}</div>
                                    <div className="profile-">Email: {user.email}</div>
                                    <div className="profile-address">City: {user.city}</div>
                                    <div className="profile-country">Country: {user.country}</div>
                                </div>

                            </div>
                        </div>
                        )

                    }


                </div>
            </main>
        </>
    )
}