import { MAX_TIME_VALUE, MILLISECONDS_PER_MINUTE, MILLISECONDS_PER_SECOND } from '../constants/gameConstants';

/**
 * Check if a puzzle configuration is solvable
 * @param {Array} tiles - Array of tile values
 * @returns {boolean} - True if solvable, false otherwise
 */
export const isSolvable = (tiles) => {
    const flattenTiles = tiles.filter((tile) => tile !== null);
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

/**
 * Count inversions in an array
 * @param {Array} array - Array to count inversions in
 * @returns {number} - Number of inversions
 */
export const countInversions = (array) => {
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

/**
 * Check if tiles are in correct order (puzzle solved)
 * @param {Array} tiles - Array of tile values
 * @returns {boolean} - True if solved, false otherwise
 */
export const reviewTiles = (tiles) => {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i + 1) return false;
    }
    return true;
};

/**
 * Shuffle tiles to create a solvable puzzle
 * @param {Array} tiles - Array of tile values to shuffle
 */
export const shuffleTiles = (tiles) => {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    while (!isSolvable(tiles)) {
        // Reshuffle if the initial state is not solvable
        shuffleTiles(tiles);
    }
};

/**
 * Generate initial tile configuration for a given level
 * @param {number} level - Puzzle level (grid size)
 * @returns {Array} - Array of tile values
 */
export const generateTiles = (level) => {
    const tiles = Array.from({ length: level * level - 1 }, (_, index) => index + 1);
    tiles.push(null); // Representing the empty space

    shuffleTiles(tiles);
    return tiles;
};

/**
 * Search for path to empty space in upward direction
 * @param {Array} currentTiles - Current tile configuration
 * @param {number} index - Starting index
 * @param {number} level - Puzzle level
 * @returns {Array} - Path to empty space
 */
export const searchUp = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index - level < 0) return [];
    const path = searchUp(currentTiles, index - level, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};

/**
 * Search for path to empty space in downward direction
 * @param {Array} currentTiles - Current tile configuration
 * @param {number} index - Starting index
 * @param {number} level - Puzzle level
 * @returns {Array} - Path to empty space
 */
export const searchDown = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index + level > level * level - 1) return [];
    const path = searchDown(currentTiles, index + level, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};

/**
 * Search for path to empty space in leftward direction
 * @param {Array} currentTiles - Current tile configuration
 * @param {number} index - Starting index
 * @param {number} level - Puzzle level
 * @returns {Array} - Path to empty space
 */
export const searchLeft = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index % level === 0 || index - 1 < 0) return [];
    const path = searchLeft(currentTiles, index - 1, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};

/**
 * Search for path to empty space in rightward direction
 * @param {Array} currentTiles - Current tile configuration
 * @param {number} index - Starting index
 * @param {number} level - Puzzle level
 * @returns {Array} - Path to empty space
 */
export const searchRight = (currentTiles, index, level) => {
    if (currentTiles[index] === null) return [index];
    if (index % level === level - 1 || index + 1 > level * level - 1) return [];
    const path = searchRight(currentTiles, index + 1, level);
    if (path.length === 0) return path;
    path.push(index);
    return path;
};

/**
 * Format milliseconds into MM:SS.ss format
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (milliseconds) => {
    if (milliseconds === MAX_TIME_VALUE) return "-:--.-";
    const minutes = Math.floor(milliseconds / MILLISECONDS_PER_MINUTE);
    const seconds = ((milliseconds % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND).toFixed(2);
    return `${minutes}:${parseInt(seconds, 10).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
    })}.${Math.floor((milliseconds % MILLISECONDS_PER_SECOND) / 10).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0,
    })}`;
}; 