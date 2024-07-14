import PropTypes from "prop-types";
import "../CSS/Header.css";

export default function Header({childrens}) {
    return (
        <header className="Header">
            <div className="logo-container">
                <img src="/Img/header-logo.png" alt="logo" />
            </div>
            <div className="right-side">
                {childrens}
            </div>
        </header>
    );
}
Header.propTypes = {
    childrens: PropTypes.node.isRequired,
}