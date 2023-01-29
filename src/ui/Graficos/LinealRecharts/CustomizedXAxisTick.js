import React from 'react';
import { Tick } from 'recharts';

const CustomizedXAxisTick = (props) => {
    const { x, y, payload, className } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={1} y={10} dy={0} textAnchor="middle" fill="#FFFFFF" className={className}>
                {payload.value}
            </text>
        </g>
    );
};

export default CustomizedXAxisTick;