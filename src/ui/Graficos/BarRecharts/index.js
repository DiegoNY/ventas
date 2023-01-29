import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'Producto',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Producto',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Producto',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Producto',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Producto',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Producto',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },


];


function RechartsBar() {

    return (
        <ResponsiveContainer width={"100%"} aspect={2}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Legend align='right' wrapperStyle={{ position: 'absolute', top: 10, right: 0, }} layout='vertical' />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
                <Bar dataKey="pv" fill="#efcfcf" barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export { RechartsBar }