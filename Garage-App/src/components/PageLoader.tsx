import React from "react";
import "./PageLoader.css";

interface PageLoaderProps {
    isVisible: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="page-loader-overlay">
            <div className="page-loader">
                <div className="page-loader__bar"></div>
                <div className="page-loader__bar"></div>
                <div className="page-loader__bar"></div>
                <div className="page-loader__bar"></div>
                <div className="page-loader__bar"></div>
                <div className="page-loader__ball"></div>
            </div>
        </div>
    );
};

export default PageLoader;
