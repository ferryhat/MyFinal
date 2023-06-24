import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../../App';

const Availableusers = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);
    const [getUsers, setGetUsers] = useState([]);

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
    };

    useEffect(() => {
        getallusers();
    }, []);

    const deleteUser = async (e) => {
        const userIdFromDashBoard = e.target.id;

        try {
            await fetch('/deleteUserfromdashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userIdFromDashBoard,
                }),
            });

            // Refresh the user list after deleting
            getallusers();
        } catch (error) {
            console.log(error);
        }
    };

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
                        <span>Available Users</span>
                    </h1>
                    <p>{getUsers.length} Users</p>

                    <table className="salecartable">

                        <thead>
                            <tr>
                                <th >NAME </th>
                                <th >EMAIL </th>
                                <th >PHONE </th>
                                <th >DELETE </th>
                            </tr>
                        </thead>
                        {getUsers.map((user) => (
                            <tbody key={user._id}>

                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button
                                            id={user._id}
                                            onClick={deleteUser}
                                            className="btn"
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </section>
        </>
    );
};

export default Availableusers;
