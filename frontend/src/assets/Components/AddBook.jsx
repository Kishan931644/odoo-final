import {Link} from "react-router-dom";
import "../CSS/Pop-up.css";
import PropTypes from "prop-types";
import {useState} from "react";

export default function AddBook({changeView}) {
    const [ISBN, setISBN] = useState("");
    const addBookDetails = async () => {
        try {
            let book_data = await fetchData();

            let headersList = {
                "Accept": "*/*",
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
            console.log(book_data);

            let bodyContent = JSON.stringify({
                "title": book_data.items[0].searchInfo,
                "desc":book_data.items[0].searchInfo.description,
                "genre": book_data.items[0].searchInfo.categories,
                "publisher":"",
                "year":book_data.items[0].searchInfo.publ,
                "isbn": ISBN,
                "quantity":1,
                "price": 10,
                "author": book_data.items[0].searchInfo.author.join(","),
                "thumbnailLink":book_data.items[0].searchInfo.imageLinks.thumbnail,
            });
            console.log(bodyContent);

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

    const fetchData = async () => {
        const result = await fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + ISBN);
        const data = await result.json();
        return data;
    }

    return (
        <div id="pop-up-container" onClick={(e) => {
            if (e.target.id === "pop-up-container") {
                changeView();
            }
        }}>
            <div className="login-container">
                <div className="container">
                    <div className="signin-form">
                        <h2>Add Book</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="input-group">
                                <label htmlFor="isbn">ISBN:</label>
                                <input type="number" value={ISBN} onChange={(e) => {
                                    setISBN(e.target.value)
                                }} onBlur={fetchData} id="isbn" name="ISBN" required/>
                            </div>


                            <button type="button" onClick={addBookDetails}>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
AddBook.propTypes = {
    changeView: PropTypes.func.isRequired,
}