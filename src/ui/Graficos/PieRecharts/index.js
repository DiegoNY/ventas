import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data01 = [
    { name: 'Cantidad productos', value: 400 }

];

function RechartsPie({ fill, data }) {

    return (

        <ResponsiveContainer width={"100%"} aspect={2}>
            <PieChart>
                <Pie
                    dataKey="value"
                    data={data || data01}
                    innerRadius={19}
                    outerRadius={25}
                    fill={fill || "#8884d8"}

                >
                </Pie>
            </PieChart>
        </ResponsiveContainer>

    )
}

export { RechartsPie }