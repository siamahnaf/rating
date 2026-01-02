import { useState, useEffect, ReactElement } from "react";
import RatingItem from "./RatingItem";

interface RatingProps {
    maxRating?: number;
    value: number;
    icon?: ReactElement;
    fractions?: number;
    onChange?: (e: number) => void;
    onHover?: (e: number) => void;
    readOnly?: boolean;
    size?: number;
    emptyColor?: string;
    fillColor?: string;
    toolTip?: boolean;
    customTooltip?: { step: number, text: string }[];
}

const Rating: React.FC<RatingProps> = ({
    maxRating = 5,
    value,
    icon,
    fractions = 1,
    onChange,
    onHover,
    readOnly = false,
    size = 24,
    emptyColor = "#dfe2e6",
    fillColor = "#fab005",
    toolTip = false,
    customTooltip
}) => {
    const [rating, setRating] = useState<number>(value || 0);

    const isSvgElement = (element: ReactElement) => {
        return element.type === 'svg';
    };

    if (icon && !isSvgElement(icon)) {
        throw new Error("The `icon` prop must be an SVG element.");
    }


    //Calculate Rating
    const calculateRating = (
        event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>,
        currentRating: number,
    ) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        let x: number;

        // Determine the position of the cursor relative to the element
        if ('clientX' in event) {
            x = event.clientX - rect.left;
        } else {
            x = (currentRating / maxRating) * rect.width;
        }

        const width = rect.width;
        let newRating = (x / width) * maxRating;

        // Round to the nearest fraction
        newRating = Math.round(newRating / fractions) * fractions;

        // Ensure the rating doesn't drop below the minimum fraction
        newRating = Math.max(newRating, fractions);  // Change from 1 to fractions
        return newRating;
    };


    //Handler
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (readOnly) return;
        const newRating = calculateRating(event, rating);
        setRating(newRating);
        onHover?.(newRating);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (readOnly) return;
        const newRating = calculateRating(event, rating);
        onChange?.(newRating);
    };

    //Effect
    useEffect(() => {
        setRating(value);
    }, [value])

    return (
        <div
            style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
            <div
                tabIndex={0}
                className="rating-container"
                onMouseMove={!readOnly ? handleMouseMove : undefined}
                onMouseLeave={() => setRating(value)}
                onClick={!readOnly ? handleClick : undefined}
                role="slider"
                aria-valuenow={rating}
                aria-valuemin={0}
                aria-valuemax={maxRating}
                aria-label="Character rating"
                style={{ cursor: !readOnly ? 'pointer' : 'default', width: "max-content" }}
            >
                {[...Array(maxRating)].map((_, index) => (
                    <RatingItem
                        key={index + 1}
                        position={index + 1}
                        rating={rating}
                        emptyColor={emptyColor}
                        fillColor={fillColor}
                        size={size}
                        step={fractions}
                        icon={icon}
                    />
                ))}
            </div>
            {toolTip &&
                <div style={{ background: "black", color: "white", padding: "4px 10px", borderRadius: "5px", fontWeight: 500 }}>
                    {customTooltip ? (customTooltip.find(a => a.step.toFixed(2) == rating.toFixed(2))?.text || rating.toFixed(2)) : rating.toFixed(2)}
                </div>
            }
        </div>
    );
};

export default Rating;