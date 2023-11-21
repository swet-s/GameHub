import React, { useState } from "react";
import "./CoinToss.css";

const CoinToss = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [totalFlip, setTotalFlip] = useState(0);
    const [headFlip, setHeadFlip] = useState(0);
    const [tailFlip, setTailFlip] = useState(0);
    const [result, setResult] = useState("Tap to flip");

    const tossCoin = () => {
        setIsFlipping(true);
        // Simulate a delay for the coin flip animation
        setTimeout(() => {
            const randomResult = Math.random() < 0.5 ? "Heads" : "Tails";
            setResult(randomResult);
            setTotalFlip((prevCount) => prevCount + 1);
            if (randomResult === "Heads") setHeadFlip((prevCount) => prevCount + 1);
            else setTailFlip((prevCount) => prevCount + 1);
            setIsFlipping(false);
        }, 1000);
    };

    return (
        <>
            {/* <h2>Flip a Coin</h2> */}
            <div className="coin-toss">
                <div className="score-container">
                    <div className="info-header">
                        <code className="sub-header-small">Heads</code>
                        <code className="sub-header-small">Tails</code>
                    </div>
                    <div className="score-header">
                        <h3 className="sub-header-large">{headFlip}</h3>
                        <h3 className="sub-header-large">{tailFlip}</h3>
                    </div>
                    <div className="score-header">
                        <code className="sub-header-small">
                            {totalFlip !== 0
                                ? `${((headFlip / totalFlip) * 100).toFixed(2)}%`
                                : "50.00%"}
                        </code>
                        <code className="sub-header-small">
                            {totalFlip !== 0
                                ? `${((tailFlip / totalFlip) * 100).toFixed(2)}%`
                                : "50.00%"}
                        </code>
                    </div>
                </div>

                <div className="coin-toss-container">
                    {isFlipping ? (
                        <div className="coin flip"></div>
                    ) : (
                        <div className="coin" onClick={tossCoin} disabled={isFlipping}>
                            {result === "Heads" || result === "Tails" ? (
                                <div className="side result">{result}</div>
                            ) : (
                                <div className="side">{result}</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CoinToss;
