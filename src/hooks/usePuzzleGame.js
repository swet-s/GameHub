import { useState, useEffect, useCallback } from 'react';
import { generateTiles, reviewTiles, searchUp, searchDown, searchLeft, searchRight } from '../utils/puzzleUtils';
import { MAX_TIME_VALUE, BEST_TIME_KEY_PREFIX } from '../constants/gameConstants';

/**
 * Custom hook for managing puzzle game state
 * @param {number} level - Puzzle level
 * @returns {Object} - Game state and handlers
 */
export const usePuzzleGame = (level) => {
    const [state, setState] = useState(() => generateTiles(level));
    const [running, setRunning] = useState(false);
    const [won, setWon] = useState(false);
    const [time, setTime] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [currTime, setCurrTime] = useState(0);
    const [bestTime, setBestTime] = useState(MAX_TIME_VALUE);

    // Update time variable in real time
    useEffect(() => {
        let animationFrameId;

        const updateClock = () => {
            setTime(new Date());
            animationFrameId = requestAnimationFrame(updateClock);
        };

        updateClock();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleRefresh = useCallback(() => {
        setState(generateTiles(level));
        setRunning(false);
        setWon(false);
        setTime(new Date());
        setStartTime(new Date());
        setCurrTime(0);

        const storedBestTime = localStorage.getItem(`${BEST_TIME_KEY_PREFIX}${level}`);
        if (storedBestTime) {
            setBestTime(parseFloat(storedBestTime));
        } else {
            setBestTime(MAX_TIME_VALUE);
        }
    }, [level]);

    useEffect(() => {
        handleRefresh();
    }, [level, handleRefresh]);

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
                let storedBestTime = localStorage.getItem(`${BEST_TIME_KEY_PREFIX}${level}`);
                if (!storedBestTime) storedBestTime = MAX_TIME_VALUE;
                if (_currTime < parseFloat(storedBestTime))
                    localStorage.setItem(`${BEST_TIME_KEY_PREFIX}${level}`, _currTime.toString());
            }
        }

        setState(currentTiles);
    };

    return {
        state,
        running,
        won,
        time,
        startTime,
        currTime,
        bestTime,
        handleReplay,
        handleTileClick
    };
}; 