import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import { EXTERNAL_LINKS } from "../constants/gameConstants";
import "./Header.css";

/**
 * Header component with navigation
 * @param {Object} props - Component props
 * @param {string} props.text - Header text
 * @returns {JSX.Element} - Header component
 */
const Header = ({ text }) => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleNavBar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    // Reset isSidebarOpen to false when the route changes
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const isCoinTossActive = location.pathname === "/cointoss" || location.pathname === "/";
    const isPuzzleActive = location.pathname === "/levelwindow" || location.pathname.startsWith("/fifteenpuzzle");

    return (
        <header className="header">
            <nav>
                <div className="row-1">
                    <span className="nav-name">{text}</span>
                    <FontAwesomeIcon
                        className="sidebar-button"
                        onClick={toggleNavBar}
                        icon={faNavicon}
                    />
                </div>
                <ul className={`nav-list ${isSidebarOpen ? "active" : ""}`}>
                    <hr className="content-separator" />
                    <li className="nav-item">
                        <Link
                            to="/cointoss"
                            className={isCoinTossActive ? "selected" : ""}
                        >
                            Coin-Toss
                        </Link>
                    </li>
                    <hr className="content-separator" />
                    <li className="nav-item">
                        <Link
                            to="/levelwindow"
                            className={isPuzzleActive ? "selected" : ""}
                        >
                            15-Puzzle
                        </Link>
                    </li>
                    <hr className="content-separator" />
                    <li className="nav-item">
                        <a
                            href={EXTERNAL_LINKS.INTRACTLE}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Intractle
                        </a>
                    </li>
                    <hr className="content-separator" />
                    <li className="nav-item">
                        <a
                            href={EXTERNAL_LINKS.SLIDE_CUBE_3D}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            3D Puzzle
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
