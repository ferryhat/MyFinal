import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../App';

const BookingList = () => {
    const { state } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const history = useHistory();
    useEffect(() => {
        if (!state) {
            Swal.fire({
                title: 'Please sign in to track your booking request!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/signin');
                } else {
                    history.push('/');
                }
            });
        }
    }, [state, history]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('/getStatus', {
                    headers: {
                        Authorization: `Bearer ${state.token}` // Add the user's authentication token
                    }
                });
                const data = await response.json();
                setBookings(data.bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [state]);
    const deleteBooking = async (bookingId) => {
        try {
            await fetch(`/deletemyBooking/${bookingId}`, {
                method: 'DELETE',
            });
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== bookingId)
            );
            Swal.fire('Success', 'Booking deleted successfully', 'success');
        } catch (error) {
            console.log(error);
        }
    };
    const Loginbutton = () => {
        if (state) {
            return (
                <div>
                    <button>
                        <NavLink className="btn" to="/signout">
                            logout
                        </NavLink>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button>
                        <NavLink className="btn" to="/signin">
                            login
                        </NavLink>
                    </button>
                </div>
            );
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toDateString();
    };
    return (
        <>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/">
                    <span>Krily</span>Car{' '}
                </NavLink>
                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/rentcar">Rent A Car</NavLink>
                    <NavLink to="/about">About</NavLink>

                    <a href="/bookingrequest">Make a Booking Request</a>
                    <a href="/contact">Contact</a>
                </nav>
                <div id="login-btn">
                    <Loginbutton />
                </div>
            </header>
            <section className='container-requests'>
                <div className='myrequests'>
                    <h1 className='heading'>My Booking Requests</h1> <br />
                    {bookings.length > 0 ? (
                        <ul>
                            {bookings.map((booking, index) => (
                                <li key={index}>
                                    <h3>User: {booking.user}</h3>
                                    <h3>Phone: {booking.phone}</h3>
                                    <h3>Pickup Date: {formatDate(booking.pickupDate)}</h3>
                                    <h3>Return Date: {formatDate(booking.returnDate)}</h3>
                                    <h3>Car: {booking.car}</h3>
                                    <h3>Status: {booking.status}</h3>
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteBooking(booking._id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h3>No bookings found.</h3>
                    )}
                </div>
            </section>
            <section className="footer" id="footer" >

                <div className="box-container">

                    <div className="box">
                        <h3>Our branch</h3>
                        <a href="#"> <i className="fas fa-map-marker-alt"></i> Algeria, Blida, Ouled Yaich </a>

                    </div>

                    <div className="box">
                        <h3>Quick links</h3>
                        <a href="#"> <i className="fas fa-arrow-right"></i> Home </a>
                        <a href="rentcar"> <i className="fas fa-arrow-right"></i> Vehicles </a>
                        <a href="#services"> <i className="fas fa-arrow-right"></i> Reviews </a>
                        <a href="/contact"> <i className="fas fa-arrow-right"></i> Contact </a>
                    </div>

                    <div className="box">
                        <h3>Contact Info</h3>
                        <a href="#"> <i className="fas fa-phone"></i> +213-558-140-065 </a>
                        <a href="#"> <i className="fas fa-phone"></i> +213-556-219-320 </a>
                        <a href="#"> <i className="fas fa-envelope"></i> krilycar@gmail.com </a>
                    </div>

                    <div className="box">
                        <h3>Social Media</h3>
                        <a href="#"> <i className="fab fa-facebook-f"></i> facebook : carrentdz </a>
                        <a href="#"> <i className="fab fa-whatsapp"></i> whatsapp : +213-556-219-320</a>
                        <a href="#"> <i className="fab fa-instagram"></i> instagram : krilycardz</a>
                    </div>

                </div>


                <div className="credit">  Copyright &copy; {new Date().getFullYear()} krily. All rights reserved </div>

            </section>
        </>
    );
};

export default BookingList;
