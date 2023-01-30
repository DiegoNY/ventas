import { className } from 'gridjs';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import CustomizedXAxisTick from './CustomizedXAxisTick.js';
import CustomizedYAxisTick from './CustomizedYAxisTick.js';

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

function RechartsLineal({ datos, dataKey, aspect, height }) {

    return (
        <>
            <ResponsiveContainer width="100%" height={height || '100%'} aspect={aspect}>
                <LineChart
                    width={500}
                    height={300}
                    data={datos || data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" tick={<CustomizedXAxisTick className="text-xs text-center " />} tickLine={false} />
                    <YAxis tick={<CustomizedYAxisTick className="text-xs text-center " />} tickLine={false} />
                    <Tooltip contentStyle={{ borderWidth: 1 }} />
                    {dataKey?.map(dataKey => {
                        return <Line type="monotone" dataKey={dataKey.name} stroke={dataKey.stroke} dot={{ r: 5 }} activeDot={{ r: 7 }} strokeWidth={3} />
                    })}
                    {!dataKey && <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={{ r: 5 }} activeDot={{ r: 7 }} strokeWidth={3} />}

                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export { RechartsLineal }
