import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FifteenPuzzle from "./components/games/FifteenPuzzle";
import CoinToss from "./components/games/CoinToss";
import LevelWindow from "./components/LevelWindow";
import { PUZZLE_LEVELS, APP_NAME } from "./constants/gameConstants";

function App() {
    return (
        <Router>
            <Header text={APP_NAME} />
            <Routes>
                <Route path="/" element={<CoinToss />} />
                <Route path="/levelwindow" element={<LevelWindow />} />
                {PUZZLE_LEVELS.map((level) => (
                    <Route
                        key={`fifteenpuzzle${level}`}
                        path={`/fifteenpuzzle${level}`}
                        element={<FifteenPuzzle level={level} />}
                    />
                ))}
                <Route path="/cointoss" element={<CoinToss />} />
            </Routes>
            <Footer text={APP_NAME} />
        </Router>
    );
}

export default App;
