import { color } from '@mui/system';
import React from 'react';
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';




function RechartsPie({ fill, data, innerRadius, outerRadius, tooltip, colors, label, filas }) {
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
                    {!!filas && filas.map((entry, index) => {
                        return <Cell key={`cell-${entry.cell}`} fill={entry.color} name={entry.name || ''} />
                    })}
                    <Legend align='right' wrapperStyle={{ position: 'absolute', top: 10, right: 0, }} layout='vertical' />

                </Pie>

                {!!tooltip && <Tooltip />}


            </PieChart>
        </ResponsiveContainer>

    )
}

export { RechartsPie }