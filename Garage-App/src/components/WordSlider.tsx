import React from "react";
import "./WordSlider.css";

interface WordSliderProps {
    staticText: string;
    words: string[];
    className?: string;
}

const WordSlider: React.FC<WordSliderProps> = ({
    staticText,
    words,
    className = "",
}) => {
    return (
        <div className={`word-slider-container ${className}`}>
            <div className="word-slider">
                <span className="static-text">{staticText}</span>
                <div className="words">
                    {words.map((word, index) => (
                        <span key={index} className="word">
                            {word}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WordSlider;
