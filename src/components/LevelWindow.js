import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PUZZLE_LEVELS } from "../constants/gameConstants";
import "./LevelWindow.css";

/**
 * Level selection window component
 * @returns {JSX.Element} - Level window component
 */
const LevelWindow = () => {
    const location = useLocation();

    return (
        <div className="level-window">
            <div className="window-name">Select Level</div>
            <hr className="line" />
            <div className="window-list">
                {PUZZLE_LEVELS.map((level, index) => (
                    <span key={index} className="window-item">
                        <Link
                            to={`/fifteenpuzzle${level}`}
                            className={
                                location.pathname === `/fifteenpuzzle${level}` ? "selected" : ""
                            }
                        >
                            {level}*{level}
                        </Link>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LevelWindow;
