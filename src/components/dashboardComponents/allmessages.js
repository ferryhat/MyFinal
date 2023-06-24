import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../../App';

const DisplayAllMessages = () => {
    const [messages, setMessages] = useState([]);
    const { adminState, dispatchadmin } = useContext(AdminContext);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const deleteMessage = (messageId) => {
        try {
            fetch(`/messages/${messageId}`, { method: 'DELETE' })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        // If the message is successfully deleted, update the state to remove the deleted message
                        setMessages((prevMessages) =>
                            prevMessages.filter((message) => message._id !== messageId)
                        );

                    }
                    fetchMessages();
                })
                .catch((error) => console.error(error));

        } catch (error) {
            console.error(error);
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
        <div>
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
                        <span>Users Messages</span>
                    </h1>

                    <table className="salecartable">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>MESSAGE</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {messages.map((message) => (
                                <tr key={message._id}>
                                    <td>{message.name}</td>
                                    <td>{message.email}</td>
                                    <td>{message.phone}</td>
                                    <td>{message.message}</td>
                                    <td>
                                        <button className="btn" id="delete" onClick={() => deleteMessage(message._id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default DisplayAllMessages;
