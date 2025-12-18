import { useState } from "react";
import {Heart} from "lucide-react";

function HeartButton({like_count}) {
    const [count, setCount] = useState(56); // initialize the number

    function HeartClick() {
        setCount(count + 1); // increase by 1
    }

    return (
        <div className="heart-btn" style={{ display: "flex", alignItems: "flex-start", marginRight: "2rem", gap: "0.5rem" }}>
            <Heart size={30} onClick={HeartClick}></Heart>
            <p>{like_count}</p>
        </div>
    );
}

export default HeartButton;
