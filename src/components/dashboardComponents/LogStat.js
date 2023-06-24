import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../../App';

const Logstats = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);
    const [getUsers, setGetUsers] = useState([]);

    const canvasRef = useRef(null);

    const getallusers = async () => {
        try {
            const res = await fetch('/getavailableusers', {
                method: 'GET',
            });

            const data = await res.json();
            setGetUsers(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getallusers();
    }, []);

    useEffect(() => {
        if (canvasRef.current && getUsers.length > 0) {
            const ctx = canvasRef.current.getContext('2d');
            const labels = getUsers.map((user) => user.name);
            const data = getUsers.map((user) => user.tokens.length);

            // Chart customization and drawing logic here
            // You can use the ctx variable to interact with the canvas and draw the chart

            // Example: Draw a bar chart
            const chart = new window.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Logged in times',
                            data: data,
                            backgroundColor: 'rgba(255, 27, 28)',
                            borderColor: 'rgba(0, 0, 0)',
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
    }, [getUsers]);

    return (
        <>



            <h1 className="heading">
                <span>Most Logged in Users</span>
            </h1>

            <canvas ref={canvasRef}></canvas>

        </>
    );
}

export default Logstats;
