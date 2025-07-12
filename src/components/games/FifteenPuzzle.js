import React from "react";
import { isMobile, isTablet } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { usePuzzleGame } from "../../hooks/usePuzzleGame";
import PuzzleScoreDisplay from "./PuzzleScoreDisplay";
import "./FifteenPuzzle.css";

/**
 * Fifteen Puzzle game component
 * @param {Object} props - Component props
 * @param {number} props.level - Puzzle level (grid size)
 * @returns {JSX.Element} - Fifteen puzzle game component
 */
const FifteenPuzzle = ({ level }) => {
    const {
        state,
        running,
        won,
        time,
        startTime,
        currTime,
        bestTime,
        handleReplay,
        handleTileClick
    } = usePuzzleGame(level);

    return (
        <div style={{
            userSelect: "none",
            touchAction: "none",
            WebkitUserSelect: "none",
        }}>
            <PuzzleScoreDisplay
                running={running}
                won={won}
                time={time}
                startTime={startTime}
                currTime={currTime}
                bestTime={bestTime}
                onReplay={handleReplay}
            />
            <div className="game-container">
                <div className={`puzzle-container ${won ? "won" : ""} level-${level}`}>
                    {state.map((value, index) =>
                        isMobile || isTablet ? (
                            <div
                                key={index}
                                className={`puzzle-tile ${won ? "won" : ""} ${value === null ? "empty" : ""
                                    } level-${level}`}
                                onTouchStart={() => handleTileClick(index)}
                            >
                                {value}
                            </div>
                        ) : (
                            <div
                                key={index}
                                className={`puzzle-tile ${won ? "won" : ""} ${value === null ? "empty" : ""
                                    } level-${level}`}
                                onMouseDown={() => handleTileClick(index)}
                            >
                                {value}
                            </div>
                        )
                    )}
                    {won && (
                        <button className="won-button" onClick={handleReplay}>
                            <FontAwesomeIcon icon={faRedo} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FifteenPuzzle;
