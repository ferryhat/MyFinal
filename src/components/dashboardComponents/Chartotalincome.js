import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { AdminContext } from '../../App';

const TotalIncomeChart = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);

    const [income, setIncome] = useState([]);

    const canvasRef = useRef(null);

    const getrentcarincome = async () => {
        try {
            const res = await fetch('/getrentcarincome', {
                method: 'GET',
            });

            const data = await res.json();

            setIncome(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getrentcarincome();
    }, []);



    useEffect(() => {
        if (canvasRef.current && income.length > 0) {
            const ctx = canvasRef.current.getContext('2d');
            const labels = income.map((item) =>
                item.soldItems.map((soldItem) => `${soldItem.brand} ${soldItem.model}`)
            );
            const data = income.map((item) =>
                item.soldItems.map((soldItem) => soldItem.totalIncome)
            );

            // Chart customization and drawing logic here
            // You can use the ctx variable to interact with the canvas and draw the chart

            // Example: Draw a bar chart
            const chart = new window.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels.flat(),
                    datasets: [
                        {
                            label: 'Total Income',
                            data: data.flat(),
                            backgroundColor: 'rgba(130, 2, 99)',
                            borderColor: 'rgba(217, 3, 104)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            // Cleanup the chart when the component unmounts
            return () => {
                chart.destroy();
            };
        }
    }, [income]);

    return (
        <>


            <h1 className="heading">
                <span>Total Income by Car</span>
            </h1>
            <canvas ref={canvasRef}></canvas>



        </>
    );
};

export default TotalIncomeChart;
