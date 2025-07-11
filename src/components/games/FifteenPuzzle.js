import React, { useState, useEffect } from "react";
import "./FifteenPuzzle.css";
// import "../Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { isMobile, isTablet } from "react-device-detect";

const isSolvable = (tiles) => {
    const flattenTiles = tiles.filter((tile) => tile !== null); // Remove the empty space
    const inversionCount = countInversions(flattenTiles);

    // If the grid width is even, solvability is determined by the sum of the inversion count and the row number of the empty space
    if (tiles.length % 2 === 0) {
        const emptyIndex = tiles.indexOf(null);
        const emptyRow = Math.floor(emptyIndex / Math.sqrt(tiles.length));
        return (inversionCount + emptyRow) % 2 !== 0;
    }

    // If the grid width is odd, solvability is determined only by the inversion count
    return inversionCount % 2 === 0;
};

const countInversions = (array) => {
    let inversions = 0;

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                inversions++;
            }
        }
    }

    return inversions;
};

const reviewTiles = (tiles) => {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i + 1) return false;
    }
    return true;
};

const shuffleTiles = (tiles) => {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    while (!isSolvable(tiles)) {
        // Reshuffle if the initial state is not solvable
        shuffleTiles(tiles);
    }
};

const generateTiles = (level) => {
    const tiles = Array.from({ length: level * level - 1 }, (_, index) => index + 1);
    tiles.push(null); // Representing the empty space

    shuffleTiles(tiles);
    return tiles;
};

const searchUp = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index - level < 0) return [];
    const path = searchUp(currentTiles, index - level, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};
const searchDown = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index + level > level * level - 1) return [];
    const path = searchDown(currentTiles, index + level, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};
const searchLeft = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index % level === 0 || index - 1 < 0) return [];
    const path = searchLeft(currentTiles, index - 1, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};
const searchRight = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index % level === level - 1 || index + 1 > level * level - 1) return [];
    const path = searchRight(currentTiles, index + 1, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};

const formatTime = (milliseconds) => {
    if (milliseconds === Number.MAX_VALUE) return "-:--.-";
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(2);
    return `${minutes}:${parseInt(seconds, 10).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
    })}.${Math.floor((milliseconds % 1000) / 10).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0,
    })}`;
};

const FifteenPuzzle = ({ level }) => {
    const [state, setState] = useState(generateTiles(level));
    const [running, setRunning] = useState(false);
    const [won, setWon] = useState(false);

    const [time, setTime] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [currTime, setCurrTime] = useState(0);
    const [bestTime, setBestTime] = useState(Number.MAX_VALUE);

    // Update time variable in real time
    useEffect(() => {
        let animationFrameId;

        const updateClock = () => {
            setTime(new Date());
            animationFrameId = requestAnimationFrame(updateClock);
            // console.log(level);
        };

        updateClock();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    useEffect(() => {
        handleRefresh();
    }, []);

    useEffect(() => {
        handleRefresh();
    }, [level]);

    const handleRefresh = () => {
        setState(generateTiles(level));
        setRunning(false);
        setWon(false);

        setTime(new Date());
        setStartTime(new Date());
        setCurrTime(0);

        const storedBestTime = localStorage.getItem(`bestTime-${level}`);
        if (storedBestTime) {
            setBestTime(parseFloat(storedBestTime));
        } else {
            setBestTime(Number.MAX_VALUE);
        }
    };

    const handleReplay = () => {
        setState(generateTiles(level));

        setWon(false);
        setRunning(false);
        setStartTime(Date.now());
        setCurrTime(0);
    };

    const handleTileClick = (index) => {
        if (won) return;

        const currentTiles = [...state];

        let path = [];
        if (path.length === 0) path = searchUp(currentTiles, index, level);
        if (path.length === 0) path = searchDown(currentTiles, index, level);
        if (path.length === 0) path = searchLeft(currentTiles, index, level);
        if (path.length === 0) path = searchRight(currentTiles, index, level);

        if (path.length < 2) return;

        // Tiles can only be moved if path length is at least two
        for (let i = 0; i < path.length - 1; i++) {
            // Swap tiles along the path
            [currentTiles[path[i]], currentTiles[path[i + 1]]] = [
                currentTiles[path[i + 1]],
                currentTiles[path[i]],
            ];
        }

        if (running === false) {
            setRunning(true);
            setStartTime(Date.now());
        }

        if (reviewTiles(currentTiles)) {
            setWon(true);
            setRunning(false);
            const _currTime = Date.now() - startTime;
            setCurrTime(_currTime);
            if (_currTime < bestTime) {
                setBestTime(_currTime);
                let storedBestTime = localStorage.getItem(`bestTime-${level}`);
                if (!storedBestTime) storedBestTime = Number.MAX_VALUE;
                if (_currTime < parseFloat(storedBestTime))
                    localStorage.setItem(`bestTime-${level}`, _currTime.toString());
            }
        }

        setState(currentTiles);
    };

    return (
        <div style={{
         userSelect: "none",
         touchAction: "none",
         WebkitUserSelect: "none",
        }}>
            {/* <h2>15-Puzzle</h2> */}
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
                        <button className="puzzle-button" onClick={handleReplay}>
                            <FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>
                        </button>
                    )}
                </div>
            </div>
            <div className="game-container">
                <div className={`puzzle-container ${won ? "won" : ""} level-${level}`}>
                    {state.map((value, index) =>
                        isMobile || isTablet ? (
                            <div
                                key={index}
                                className={`puzzle-tile ${won ? "won" : ""} ${
                                    value === null ? "empty" : ""
                                } level-${level}`}
                                onTouchStart={() => handleTileClick(index)}
                            >
                                {value}
                            </div>
                        ) : (
                            <div
                                key={index}
                                className={`puzzle-tile ${won ? "won" : ""} ${
                                    value === null ? "empty" : ""
                                } level-${level}`}
                                onMouseDown={() => handleTileClick(index)}
                            >
                                {value}
                            </div>
                        )
                    )}
                    {won && (
                        <button className="won-button" onClick={handleReplay}>
                            <FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FifteenPuzzle;
