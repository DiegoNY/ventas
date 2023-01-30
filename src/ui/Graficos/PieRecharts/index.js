import React from 'react';
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';




function RechartsPie({ fill, data, innerRadius, outerRadius, tooltip, colors, label }) {
    const COlORS = colors;
    const data01 = [
        { name: 'Producto C', value: 500 },
        { name: 'Producto A', value: 500 }

    ];

    return (

        <ResponsiveContainer width={"100%"} aspect={2}>
            <PieChart>
                <Pie
                    dataKey="value"
                    data={data || data01}
                    innerRadius={innerRadius || 19}
                    outerRadius={outerRadius || 25}
                    fill={fill || "#8884d8"}
                    label={label}

                >
                    {!!colors && data01.map((entry, index) => {
                        return <Cell key={`cell-${index}`} fill={COlORS[index % COlORS.length]} />
                    })}
                    <Legend align='right' wrapperStyle={{ position: 'absolute', top: 10, right: 0, }} layout='vertical' />

                </Pie>

                {!!tooltip && <Tooltip />}


            </PieChart>
        </ResponsiveContainer>

    )
}

export { RechartsPie }