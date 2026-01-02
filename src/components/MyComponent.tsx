"use client"
import { useState } from "react";
import { Rating } from "@siamf/rating";

const MyComponent = () => {
    const [rating, setRating] = useState<number>(0);

    return (
        <div>
            <Rating
                value={rating}
                onChange={(e) => setRating(e)}
                fractions={0.5}
                maxRating={5}
                size={30}
                toolTip
            />
        </div>
    );
};

export default MyComponent;