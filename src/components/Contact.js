import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { UserContext } from "../App";

const Contact = () => {
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
    const { state } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!state) {
            Swal.fire({
                title: 'Please signin to contact us!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/signin');
                } else { history.push('/'); }
            });
        }
    }, [state, history]);
    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();

            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        if (!name || !email || !phone || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Message',
                text: 'Please fill in all the fields',
                showConfirmButton: true,
            });
            return;
        }

        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("message not sent");
        } else {
            Swal.fire(
                {

                    icon: 'success',
                    title: 'Your message has been saved',
                    showConfirmButton: false,
                    timer: 1500
                }
            )
            setUserData({ ...userData, message: "" });
        }
    }

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

    useEffect(() => {
        if (!state) {
            history.push("/signin"); // Redirect to login page if user is not logged in
        }
    }, [state, history]);

    return (
        <>
            {state && (
                <div>
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

                                <a href="/bookingrequest">Make a Booking Request</a>
                                <a href="/contact">Contact</a>
                            </nav>
                            <div id="login-btn">
                                <LoginButton />
                            </div>
                        </header>
                    </div>
                    <section className="contact" id="contact">
                        <h1 className="heading">
                            <span>contact</span> us
                        </h1>
                        <div className="row">
                            <form method="POST">
                                <h3>Reach. Connect. Engage.</h3>
                                <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box" />
                                <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box" />
                                <input type="tel" name="phone" value={userData.phone} onChange={handleInputs} placeholder="your phone" className="box" />
                                <textarea placeholder="your message" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
                                <input type="submit" value="send message" onClick={sendMessage} className="btn" />
                            </form>
                        </div>
                    </section>
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
            )}
        </>
    );
}

export default Contact; 