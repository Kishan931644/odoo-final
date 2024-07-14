import Header from "./Header.jsx";
import {Link} from "react-router-dom";
import "../CSS/Home.css";
import {useEffect, useState} from "react";

export default function Index() {
    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }

            let response = await fetch("http://localhost:3000/api/book//get-all-books", {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            if (data.status == "success") {
                let listOfBooks = data.data.books;
                setBook(listOfBooks);
            }
        }
        fetchBooks();
    }, []);
    return (
        <>
            <Header childrens={
                <button type="button">
                    {(localStorage.getItem("token")==null) ?( <Link to="/login">Login</Link>) : (
                        <Link to="/logout">Log out</Link>)}
                </button>}/>
            <main className="main-container">
                <div className="home-header">
                    <h2>Search the book available in Library</h2>
                    <form role="search">
                        <div className="input-container">
                            <input type="search" className="search-input" value="" name="s"
                                   placeholder="Search Book name,author"/>
                            <button type="submit" className="search-submit" name="submit"><i
                                className="material-icons">search</i></button>
                        </div>
                    </form>
                </div>

                <div className="main-books-container">
                    <div className="new-available">
                        <h2>New Available</h2>
                        <div className="books-container">

                            {book && <div className="book-card">
                                <div className="book-img-container">
                                    <img src="/Img/sample%20book.jpg" alt=""/>
                                </div>
                                <div className="content">
                                    <Link to={"/"} className="book-name">{book.title}</Link>
                                    <div className="details">
                                        <div className="author">{book.author}</div>
                                        <div className="realese-year"> {book.year}</div>
                                    </div>
                                    <div className="description"></div>
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="trending-bok">
                        <h2>Trending Available</h2>
                        <div className="books-container">
                            <div className="book-card">
                                <div className="book-img-container">
                                    <img src="/Img/sample%20book.jpg" alt=""/>
                                </div>
                                <div className="content">
                                    <Link to={"/"} className="book-name">Python Tricks</Link>
                                    <div className="details">
                                        <div className="author">Parth gajjar,Ayushi khana</div>
                                        <div className="realese-year"> . 2020</div>
                                    </div>
                                    <div className="description">Lorem Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Consequatur distinctio dolore odio veniam. A commodi culpa
                                        cupiditate eaque eius ipsa itaque iusto laboriosam magnam maiores, minima modi
                                        nam officia quaerat quas qui quidem sapiente suscipit tempore ullam vel
                                        veritatis vitae voluptatibus! Amet at autem commodi cumque doloremque enim eos,
                                        hic iusto laborum, minus mollitia obcaecati possimus praesentium quia
                                        voluptatum. Animi, aperiam aspernatur assumenda dicta distinctio facere fuga
                                        ipsa ipsum libero nemo nisi nobis, nostrum quos reprehenderit voluptatibus. Ad
                                        animi ea eius illo iste minus perferendis, quas ratione reiciendis voluptatem!
                                        Assumenda atque deserunt dolorem eligendi facilis impedit in incidunt ipsa iure
                                        maxime modi natus, nesciunt odio qui quisquam quod sint sit tempore ut
                                        voluptate. Ad adipisci culpa cupiditate distinctio dolores ducimus, eligendi,
                                        fugiat impedit incidunt, ipsam itaque maiores minima molestiae nam perspiciatis
                                        quidem quo quod reprehenderit sunt temporibus velit voluptates voluptatum. Ab
                                        accusantium ad alias amet architecto at consectetur consequatur delectus eos et
                                        eveniet expedita explicabo fugiat hic illum incidunt itaque iure laboriosam
                                        laborum laudantium magnam maiores nihil nostrum numquam obcaecati odio odit
                                        officia omnis perspiciatis rem, repudiandae saepe soluta tempora temporibus unde
                                        vel voluptate? Aspernatur consectetur hic ipsum perspiciatis suscipit! Ab
                                        asperiores assumenda at eius inventore iusto libero nesciunt non odit, omnis
                                        perspiciatis possimus quo voluptate, voluptatem voluptatum! Adipisci explicabo
                                        minima nobis quibusdam reiciendis! At, commodi optio? Alias consequuntur enim
                                        facere iusto, maiores minus necessitatibus officia similique totam voluptate. A
                                        aperiam assumenda minus nobis officia! Ab amet aperiam culpa cum cupiditate,
                                        esse est illo odio porro provident quas quidem quos repudiandae totam unde vero
                                        voluptatem! Aliquid, architecto asperiores, cumque esse eum ex excepturi iste
                                        modi officia repellat sint tempore ullam veritatis! Ex, mollitia omnis quaerat
                                        qui unde ut. Alias cum eaque eligendi enim excepturi, explicabo fugiat in modi
                                        natus non officiis, quam repellendus? Error expedita minima quam repellendus,
                                        tempore veritatis! ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aspernatur, delectus, dolorum est exercitationem labore laboriosam natus,
                                        obcaecati perspiciatis placeat quam quo saepe ut vitae. Aperiam eos facilis fuga
                                        molestias nihil.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}