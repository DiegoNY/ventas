import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import CustomizedXAxisTick from '../LinealRecharts/CustomizedXAxisTick';
import CustomizedYAxisTick from '../LinealRecharts/CustomizedYAxisTick';

const dataPrueba = [
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

];


function RechartsBar({ data, fill, fill_2, dataKey, height, width, name }) {

    return (
        <ResponsiveContainer width={"100%"}  aspect={2}>
            <BarChart
                width={width || 500}
                height={300}
                aspect={2}
                data={data || dataPrueba}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey={name || "name"} tick={<CustomizedXAxisTick className="text-xs text-center " />} tickLine={true} />
                <YAxis tick={<CustomizedYAxisTick className="text-xs text-center " />} tickLine={false} />

                <Tooltip />
                {dataKey?.map(dataKey => {
                    return <Bar dataKey={dataKey.name} fill={dataKey.fill} barSize={dataKey.barSize} />
                })}

                {!dataKey &&
                    <Bar dataKey="uv" fill={fill || "#fca5a5"} barSize={30} />

                }
                {!dataKey &&
                    <Bar dataKey="pv" fill={fill_2 || "#fdba74"} barSize={30} />
                }
            </BarChart>
        </ResponsiveContainer>
    )
}

export { RechartsBar }