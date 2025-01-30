import React, { JSX, cloneElement } from 'react';
import determineWidth from "../utils/determineWidth";

interface RatingItemProps {
    position: number;
    rating: number;
    icon?: JSX.Element;
    emptyColor?: string;
    fillColor?: string;
    size: number;
    step: number;
}

const RatingItem: React.FC<RatingItemProps> = ({
    position,
    rating,
    emptyColor,
    fillColor,
    icon,
    size,
    step,
}) => {
    const width = determineWidth(position, rating, step);

    return (
        <span
            style={{
                position: 'relative',
                display: 'inline-flex',
                background: 'none',
                border: 'none',
                cursor: 'inherit',
                padding: 0,
                outline: 'none',
                lineHeight: 0,
                verticalAlign: 'middle',
            }}
            aria-label={`Rate ${position}`}
            className="rating-symbol"
        >

            {icon ?
                cloneElement(icon, {
                    viewBox: "0 0 24 24",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    style: {
                        width: size,
                        height: size,
                        fill: emptyColor,
                        stroke: emptyColor,
                        color: emptyColor,
                    }
                })

                : <svg
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        width: size,
                        height: size,
                        fill: emptyColor,
                        stroke: emptyColor,
                    }}
                >
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>}

            {icon ?
                cloneElement(icon, {
                    viewBox: "0 0 24 24",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    style: {
                        top: 0,
                        left: 0,
                        position: 'absolute',
                        zIndex: 9,
                        fill: `${fillColor} !important`,
                        stroke: fillColor,
                        color: fillColor,
                        overflow: 'hidden',
                        width: size,
                        height: size,
                        boxSizing: 'border-box',
                        verticalAlign: 'middle',
                        clipPath: `inset(0 ${100 - width}% 0 0)`,
                    }
                })
                : <svg
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        top: 0,
                        left: 0,
                        position: 'absolute',
                        fill: fillColor,
                        stroke: fillColor,
                        overflow: 'hidden',
                        width: size,
                        height: size,
                        boxSizing: 'border-box',
                        verticalAlign: 'middle',
                        clipPath: `inset(0 ${100 - width}% 0 0)`,
                    }}
                >
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>}
        </span>
    );
};

export default RatingItem;