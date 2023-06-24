import React, { useState } from 'react';
import "../registerStyle.css";
import Swal from 'sweetalert2';
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cPassword: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();

        const { name, phone, email, password, cPassword } = user;

        // Form validation checks
        if (!name || !phone || !email || !password || !cPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Registration',
                text: 'Please fill in all the fields',
                showConfirmButton: true,
            });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Registration',
                text: 'Please enter a valid email address',
                showConfirmButton: true,
            });
            return;
        }
        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, phone, email, password, cPassword
            })
        });

        const data = await res.json();

        if (data.status === 422 || !data) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Registration',
                showConfirmButton: true,
            });
            console.log("Invalid Registration");
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                showConfirmButton: false,
                timer: 1500
            });
            console.log("Registration Successful");

            history.push("/signin");
        }
    };

    return (
        <>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"><span>Krily</span>Car</NavLink>
                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/exploreRentCars"> Cars Showcase</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <a href="#services">Testimonial</a>
                </nav>
                <div id="login-btn">
                    <button className="btn">
                        <NavLink className="nav-link" to="/signin">login</NavLink>
                    </button>
                </div>
            </header>

            <div className="maincontainer">
                <div className="firstcontainer">
                    <div className="titled">Registration</div>
                    <div className="content">
                        <form method="POST">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Full Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={user.name}
                                        onChange={handleInputs}
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={user.email}
                                        onChange={handleInputs}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={user.phone}
                                        onChange={handleInputs}
                                        placeholder="Enter your number"
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={user.password}
                                        onChange={handleInputs}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input
                                        type="password"
                                        name="cPassword"
                                        id="cPassword"
                                        value={user.cPassword}
                                        onChange={handleInputs}
                                        placeholder="Confirm your password"
                                    />
                                </div>
                            </div>
                            <div className="button">
                                <input
                                    type="submit"
                                    name="signup"
                                    id="signup"
                                    value="register"
                                    onClick={postData}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
