import React from "react";
import "./LevelWindow.css";
import { Link, useLocation } from "react-router-dom";

const LevelWindow = () => {
    const location = useLocation();
    const puzzleLevels = [3, 4, 5, 6];
    return (
        <div className="level-window">
            <div className="window-name">Select Level</div>
            <hr className="line" />
            <div className="window-list">
                {puzzleLevels.map((level, index) => (
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
