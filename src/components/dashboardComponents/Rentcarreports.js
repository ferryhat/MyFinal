import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AdminContext } from '../../App';

const Rentcarreports = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);

    const [income, setIncome] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    const getRentCarIncome = async () => {
        try {
            const res = await fetch('/getrentcarincome', {
                method: 'GET',
            });

            const data = await res.json();

            setIncome(data);
            setFilteredIncome(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRentCarIncome();
    }, []);

    const handleFilterChange = (event) => {
        setFilterDate(event.target.value);

        if (event.target.value === '') {
            setFilteredIncome(income);
        } else {
            const selectedDate = new Date(event.target.value);
            const filteredData = income.filter((item) => {
                const itemDate = new Date(item.createdAt);
                // Compare only the date components
                return (
                    itemDate.getFullYear() === selectedDate.getFullYear() &&
                    itemDate.getMonth() === selectedDate.getMonth() &&
                    itemDate.getDate() === selectedDate.getDate()
                );
            });
            setFilteredIncome(filteredData);
        }
    };


    const LoginButton = () => {
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
                    <LoginButton />
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
                        <span>Rented Cars Income Report</span>
                    </h1>

                    <div className="filter-container">
                        <label htmlFor="filterDate">Filter by Date:</label>
                        <input
                            type="date"
                            id="filterDate"
                            value={filterDate}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <table className="salecartable">
                        <thead>
                            <tr>
                                <th>BRAND</th>
                                <th>MODEL</th>
                                <th>BOOKED DAYS</th>
                                <th>INCOME</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredIncome.map((item) =>
                                item.soldItems.map((soldItem) => (
                                    <tr key={soldItem._id}>
                                        <td>{soldItem.brand}</td>
                                        <td>{soldItem.model}</td>
                                        <td>{soldItem.bookedDays}</td>
                                        <td>{soldItem.totalIncome} DA</td>
                                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default Rentcarreports;
