import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FifteenPuzzle from "./components/games/FifteenPuzzle";
import CoinToss from "./components/games/CoinToss";
import LevelWindow from "./components/LevelWindow";

function App() {
    const puzzleLevels = [3, 4, 5, 6];

    return (
        <Router>
            <Header text="GameHub" />
            <Routes>
                <Route path="/" element={<LevelWindow />} />
                <Route path="/levelwindow" element={<LevelWindow />} />
                {puzzleLevels.map((level) => (
                    <Route
                        key={`fifteenpuzzle${level}`}
                        exact
                        path={`/fifteenpuzzle${level}`}
                        element={<FifteenPuzzle level={level} />}
                    />
                ))}
                <Route exact path="/cointoss" element={<CoinToss />} />
            </Routes>

            <Footer text="GameHub" />
        </Router>
    );
}

export default App;
