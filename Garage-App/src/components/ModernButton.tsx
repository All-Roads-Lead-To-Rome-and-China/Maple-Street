import React from "react";
import "./ModernButton.css";

interface ModernButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    className?: string;
}

const ModernButton: React.FC<ModernButtonProps> = ({
    children,
    onClick,
    isLoading = false,
    disabled = false,
    type = "button",
    variant = "primary",
    className = "",
}) => {
    const handleClick = () => {
        if (!isLoading && !disabled && onClick) {
            onClick();
        }
    };

    return (
        <button
            type={type}
            className={`modern-button ${variant} ${isLoading ? "loading" : ""} ${className}`}
            onClick={handleClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <>
                    <svg
                        className="spinner"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                            opacity=".25"
                        />
                        <path
                            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                        />
                    </svg>
                    <span className="text">Loading...</span>
                </>
            ) : (
                <>
                    <svg className="arr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                    <span className="text">{children}</span>
                    <span className="circle"></span>
                    <svg className="arr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                </>
            )}
        </button>
    );
};

export default ModernButton;
