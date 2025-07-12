import React from "react";
import { COPYRIGHT_YEAR } from "../constants/gameConstants";
import "./Footer.css";

/**
 * Footer component
 * @param {Object} props - Component props
 * @param {string} props.text - Footer text
 * @returns {JSX.Element} - Footer component
 */
const Footer = ({ text }) => {
    return (
        <footer className="footer">
            <div className="copyright">&copy; {COPYRIGHT_YEAR} {text}. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
