import React from 'react';
import { Tick } from 'recharts';

const CustomizedYAxisTick = (props) => {
    const { x, y, payload, className, fill } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={-4} y={2} textAnchor="end" fill={fill || "#FFFFFF"} className={className}>
                {payload.value}
            </text>
        </g>
    );
};

export default CustomizedYAxisTick;