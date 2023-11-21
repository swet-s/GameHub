import React from "react";
import "./Footer.css";

const Footer = ({ text }) => {
    return (
        <footer className="footer">
            <div className="copyright">&copy; 2023 {text}. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
