import React, { useEffect, useContext } from 'react';
import "../dashboard.css";
import { NavLink, useHistory } from "react-router-dom";

import { AdminContext } from "../App"

const Dashboard = () => {

    const { adminState, dispatchadmin } = useContext(AdminContext)

    const history = useHistory();

    const callDashboard = async () => {
        try {
            const res = await fetch('/dashboard', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
            history.push("/Dashboard");
        }
    }


    useEffect(() => {
        callDashboard();
    }, [])



    const Loginbutton = () => {

        if (adminState) {
            return <div>
                <button className="logoutbtnDash"><NavLink className="nav-link" to="/adminsignout">logout</NavLink></button>
            </div>
        }
        else {
            return <div>
                <button className="logoutbtnDash"><NavLink to="/signin">login</NavLink></button>

            </div>
        }
    }



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

                <div className="home-content" style={{ textAlign: "center" }}>
                    <h1>WELCOME TO DASHBOARD</h1><br />
                    <h3>Go To Add Cars Tab In Side Menu To Add Cars In Database</h3><br />
                    <h3>Go To Rent Cars Tab In Side Menu To Generate Income Reports of Rented Cars In Database</h3><br />
                    <h3>Go To Available Users Tab In Side Menu To See All Available Users Regestered In Database</h3><br />
                </div>

            </section>



        </>
    )
}

export default Dashboard
