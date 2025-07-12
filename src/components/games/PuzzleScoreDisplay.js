import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from '../../utils/puzzleUtils';

/**
 * Component for displaying puzzle game score and controls
 * @param {Object} props - Component props
 * @param {boolean} props.running - Whether the game is running
 * @param {boolean} props.won - Whether the game is won
 * @param {Date} props.time - Current time
 * @param {Date} props.startTime - Game start time
 * @param {number} props.currTime - Current game time
 * @param {number} props.bestTime - Best time achieved
 * @param {Function} props.onReplay - Replay button click handler
 * @returns {JSX.Element} - Score display component
 */
const PuzzleScoreDisplay = ({ 
    running, 
    won, 
    time, 
    startTime, 
    currTime, 
    bestTime, 
    onReplay 
}) => {
    return (
        <div className="score-container">
            <div className="info-header">
                <code className="sub-header-small">Current</code>
                <code className="sub-header-small">Best</code>
            </div>
            <div className="score-header">
                <h3 className="sub-header-large">
                    {running ? formatTime(time - startTime) : formatTime(currTime)}
                </h3>
                <h3 className="sub-header-large">{formatTime(bestTime)}</h3>
            </div>
            <div className="puzzle-center">
                {!won && (
                    <button className="puzzle-button" onClick={onReplay}>
                        <FontAwesomeIcon icon={faRedo} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PuzzleScoreDisplay; 