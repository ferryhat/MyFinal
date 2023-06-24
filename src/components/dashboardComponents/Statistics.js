import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import TotalIncomeChart from './Chartotalincome';
import Logstats from './LogStat';
import { AdminContext } from '../../App';
import TotalCars from './Totalcars';
import Totalusers from './totalusers';

const Statistics = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);

    const [income, setIncome] = useState([]);
    const [carCount, setCarCount] = useState({});
    const chartRef = useRef(null);

    const getrentcarincome = async () => {
        try {
            const res = await fetch('/getrentcarincome', {
                method: 'GET',
            });

            const data = await res.json();

            setIncome(data);

            // Calculate the count for each car
            const count = {};
            data.forEach((item) => {
                item.soldItems.forEach((soldItem) => {
                    const { brand, model } = soldItem;
                    const carKey = `${brand}-${model}`;
                    count[carKey] = count[carKey] ? count[carKey] + 1 : 1;
                });
            });

            setCarCount(count);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getrentcarincome();
    }, []);

    useEffect(() => {
        if (Object.keys(carCount).length >= 0) {
            // Create chart
            const labels = Object.keys(carCount);
            const values = Object.values(carCount);

            const chartConfig = {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Rented times',
                            data: values,
                            backgroundColor: 'rgba(228, 87, 46)',
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
                    indexAxis: 'y', // Display bars horizontally
                    barThickness: 'flex', // Distribute bar width evenly
                },
            };

            const chart = new window.Chart(chartRef.current, chartConfig);

            // Cleanup
            return () => {
                chart.destroy();
            };
        }
    }, [carCount]);

    const Loginbutton = () => {
        if (adminState) {
            return (
                <div>
                    <button className="logoutbtnDash">
                        <NavLink className="nav-link" to="/adminsignout">
                            logout
                        </NavLink>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="logoutbtnDash">
                        <NavLink className="nav-link" to="/signin">
                            login
                        </NavLink>
                    </button>
                </div>
            );
        }
    };

    return (
        <>
            <div className="sidebar">
                <div className="logo-details">
                    <i className=''></i>
                    <span className='logo_name1'>Krily</span><span className="logo_name">Car</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <NavLink className="dashlinks" to="/dashboard">
                            <i className='bx bx-grid-alt' style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dashlinks" to="/addcars">
                            <i class="fa-sharp fa-solid fa-square-plus" style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Add Cars</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dashlinks" to="/getrentcarsforadmin">
                            <i class="fa-sharp fa-solid fa-car" style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Available Rent Cars</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dashlinks" to="/rentcarsreports">
                            <i class="fa-solid fa-sack-dollar" style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Rent Cars Income</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dashlinks" to="/availableusers">
                            <i class="fa-solid fa-users" style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Available Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dashlinks" to="/messages">
                            <i class="fa-solid fa-envelope" style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Users Messages</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dashlinks" to="/requests">
                            <i class="fa-solid fa-envelope" style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Booking Requests</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dashlinks" to="/st">
                            <i class="fa-solid
                             fa-signal" style={{ color: "#ffffff" }}></i>
                            <span className="allLinks_name">Statistics</span>
                        </NavLink>
                    </li>
                </ul>

                <div className="logoutbtnDashDiv">
                    <Loginbutton />
                </div>
            </div>
            <section className="home-section">
                <nav>
                    <div className="sidebar-button">
                        <span className="dashboard">Dashboard</span>
                    </div>

                    <div className="profile-details">
                        <span className="admin_name">Admin</span>
                    </div>
                </nav>
                <div className="salecartableDiv">
                    <h1 className="heading">
                        <span>Most Rented Cars</span>
                    </h1>

                    {/* Bar chart */}
                    <div className="chartContainer">
                        <canvas ref={chartRef}></canvas>
                    </div>
                    <div className="totalIncomeTableDiv">


                        < TotalIncomeChart />
                        <Logstats />

                        <section className='total-cars-box' >
                            <TotalCars />

                        </section>
                        <section className='total-cars-box' >
                            <Totalusers />

                        </section>


                    </div>
                </div>
            </section>
        </>
    );
};

export default Statistics;