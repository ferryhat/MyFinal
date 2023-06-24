import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../App';



//make a booking request
const BookingRequest = () => {
    const [userData, setUserData] = useState({ name: "", email: "", phone: "" });

    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        pickupDate: '',
        returnDate: '',
        car: ''
    });
    const [carList, setCarList] = useState([]);
    const { state } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        if (!state) {
            Swal.fire({
                title: 'Please sign in to make a booking request!',
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
        } else {
            // Fetch user data from the server and update the state
            const fetchUserData = async () => {
                try {
                    const res = await fetch('/getdata', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    const data = await res.json();

                    setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

                    if (!res.ok) {
                        throw new Error(res.error);
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            fetchUserData();
        }
    }, [state, history]);
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    };
    useEffect(() => {
        const fetchCarList = async () => {
            try {
                const response = await fetch('/getAvailableRentCars');
                const data = await response.json();
                const carNames = data.map((car) => `${car.brand} ${car.model} ${car.year}`);
                setCarList(carNames);
            } catch (error) {
                console.error('Error fetching car list:', error);
            }
        };

        fetchCarList();
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setBookingData({ ...bookingData, [name]: value });
    };

    const sendRequest = async (e) => {
        e.preventDefault();

        const { name, email, phone } = userData;
        const { pickupDate, returnDate, car } = bookingData;
        if (!name || !email || !phone || !pickupDate || !returnDate || !car) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Request',
                text: 'Please fill in all the fields',
                showConfirmButton: true,
            });
            return;
        }

        try {
            const res = await fetch('/saveBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    pickupDate,
                    returnDate,
                    car
                })
            });

            const data = await res.json();

            if (!data) {
                console.log('Request not sent');
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Your request has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                setBookingData({
                    name: '',
                    email: '',
                    phone: '',
                    pickupDate: '',
                    returnDate: '',
                    car: ''
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const LoginButton = () => {
        if (state) {
            return (
                <div>
                    <button><NavLink className="btn" to="/signout">logout</NavLink></button>
                </div>
            );
        } else {
            return (
                <div>
                    <button><NavLink className="btn" to="/signin">login</NavLink></button>
                </div>
            );
        }
    };
    // Get the current date and format it as yyyy-MM-dd
    const currentDate = new Date().toISOString().split('T')[0];
    return (
        <>
            {state && (
                <div className='make-booking-request'>
                    <div className="contactheader">
                        <header className="header">
                            <div id="menu-btn" className="fas fa-bars"></div>
                            <NavLink className="logo" to="/">
                                Krily<span>Car</span>
                            </NavLink>
                            <nav className="navbar">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/rentcar">Rent A Car</NavLink>
                                <NavLink to="/about">About</NavLink>

                                <a href="/contact">Contact</a>
                                <a href="/list">Track my requests</a>

                            </nav>
                            <div id="login-btn">
                                <LoginButton />
                            </div>
                        </header>
                    </div>
                    <div className="booking-request">

                        <form className='form-booking' method="POST">
                            <h1>Booking Request</h1>
                            <label>
                                <h3>Name:</h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputs}
                                    placeholder="Your Name"
                                />
                            </label>
                            <br />
                            <label>
                                <h3>Email:</h3>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputs}
                                    placeholder="Your Email"
                                />
                            </label>
                            <br />
                            <label>
                                <h3>Phone:</h3>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputs}
                                    placeholder="Your Phone"
                                />
                            </label>
                            <br />

                            <label>
                                <h3>Pickup Date:</h3>
                                <input type="date" name="pickupDate" value={bookingData.pickupDate} onChange={handleChange} min={currentDate} // Set the minimum
                                />
                            </label><br />
                            <label>
                                <h3>Return Date:</h3>
                                <input type="date" name="returnDate" value={bookingData.returnDate} onChange={handleChange} min={bookingData.pickupDate || currentDate} // Set the
                                />
                            </label><br />
                            <label>
                                <h3>Car:</h3>
                                <select name="car" value={bookingData.car} onChange={handleChange}>
                                    <option value="">Select a car</option>
                                    {carList.map((car, index) => (
                                        <option key={index} value={car}>
                                            {car}
                                        </option>
                                    ))}
                                </select>
                            </label><br />

                            <input type="submit" value="Send booking request" onClick={sendRequest} className="btn" />
                        </form>

                        <section className="footer" id="footer">

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
                    </div>
                </div>
            )}
        </>
    );
}
export default BookingRequest;
