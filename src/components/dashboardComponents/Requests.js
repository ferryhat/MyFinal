import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AdminContext } from '../../App';

const AdminBookingRequests = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);
    const [bookingRequests, setBookingRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const getBookingRequests = async () => {
        try {
            const res = await fetch('/getBookings');
            const data = await res.json();
            setBookingRequests(data.bookings);
            setFilteredRequests(data.bookings);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBookingRequests();
    }, []);

    const updateStatus = async (bookingId, newStatus) => {
        try {
            await fetch(`/updateBookingStatus/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            getBookingRequests(); // Refresh booking requests after update
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBooking = async (bookingId) => {
        try {
            await fetch(`/deleteBooking/${bookingId}`, {
                method: 'DELETE',
            });
            getBookingRequests(); // Refresh booking requests after deletion
            Swal.fire('Success', 'Booking deleted successfully', 'success');
        } catch (error) {
            console.log(error);
        }
    };

    const handleStatusChange = (event, bookingId) => {
        const newStatus = event.target.value;
        updateStatus(bookingId, newStatus);
    };

    const handleFilterChange = (event) => {
        if (event.target.name === 'filterDate') {
            setFilterDate(event.target.value);
        } else if (event.target.name === 'filterStatus') {
            setFilterStatus(event.target.value);
        }
    };

    useEffect(() => {
        let filteredData = bookingRequests;

        if (filterDate !== '') {
            const selectedDate = new Date(filterDate);
            filteredData = filteredData.filter((booking) => {
                const pickupDate = new Date(booking.pickupDate.split('T')[0]);
                // Compare only the date components
                return (
                    pickupDate.getFullYear() === selectedDate.getFullYear() &&
                    pickupDate.getMonth() === selectedDate.getMonth() &&
                    pickupDate.getDate() === selectedDate.getDate()
                );
            });
        }

        if (filterStatus !== '') {
            filteredData = filteredData.filter((booking) => booking.status === filterStatus);
        }

        setFilteredRequests(filteredData);
    }, [bookingRequests, filterDate, filterStatus]);

    const LoginButton = () => {
        if (adminState) {
            return (
                <div>
                    <button className="logoutbtnDash">
                        <NavLink className="nav-link" to="/adminsignout">
                            Logout
                        </NavLink>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="logoutbtnDash">
                        <NavLink className="nav-link" to="/signin">
                            Login
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

                <div className="salecartableDivrq">
                    <h1 className="heading">
                        <span>Booking Requests</span>
                    </h1>

                    <div className="filter-container">
                        <label htmlFor="filterDate">Filter by Pickup Date:</label>
                        <input
                            type="date"
                            id="filterDate"
                            name="filterDate"
                            value={filterDate}
                            onChange={handleFilterChange}
                        />

                        <label htmlFor="filterStatus">Filter by Status:</label>
                        <select
                            id="filterStatus"
                            name="filterStatus"
                            value={filterStatus}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <table className="salecartable">
                            <thead>
                                <tr>
                                    <th>User's Email</th>

                                    <th>Phone</th>
                                    <th>Car</th>
                                    <th>Status</th>
                                    <th>Request date</th>
                                    <th>Request Exact Time</th>

                                    <th>Pickup Date</th>
                                    <th>Return Date</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>{booking.user}</td>
                                        <td>{booking.phone}</td>
                                        <td>{booking.car}</td>

                                        <td>
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(e, booking._id)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td>{booking.createdAt.split('T')[0]}</td>
                                        <td>{booking.createdAt.split('T')[1]}</td>
                                        <td>{booking.pickupDate.split('T')[0]}</td>
                                        <td>{booking.returnDate.split('T')[0]}</td>
                                        <td>
                                            <button
                                                className="btn" id="delete"
                                                onClick={() => deleteBooking(booking._id)}
                                            ><i className="fa fa-trash"></i>

                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminBookingRequests;
