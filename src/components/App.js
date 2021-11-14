import React from "react";
import Counter from "./Counter"
export default function () {
    const min=1,max=5,count=2;
    return (
        <div className="app">
            <Counter
            min={min}
            max={max}
            value={count}
        
            />
        </div>
    )
}