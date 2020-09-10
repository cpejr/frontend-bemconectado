import React from 'react';
import Total from "./Total";
import Month from "./Month";

export default function Stats() {
    return (
        <div className="h-100">
            <Total />
            <Month />
        </div>
    )
}