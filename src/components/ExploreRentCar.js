import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

import { UserContext } from '../App';

const ExploreRentCar = () => {
    const { state, dispatch } = useContext(UserContext);

    const LoginButton = () => {
        if (state) {
            return (
                <div>
                    <button className="btn">
                        <NavLink className="nav-link" to="/signout">
                            logout
                        </NavLink>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="btn">
                        <NavLink className="nav-link" to="/signin">
                            login
                        </NavLink>
                    </button>
                </div>
            );
        }
    };

    const [rentCarsData, setRentCarsData] = useState([]);

    const exploreRentCar = async () => {
        try {
            const res = await fetch('/exploreRentCarData', {
                method: 'GET',
            });

            const data = await res.json();

            setRentCarsData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        exploreRentCar();
    }, []);

    const handleClick = () => {
        Swal.fire({
            title: 'Do You Like This Car?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Rent Now',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/rentcar'; // Redirect to rent car page
            }
        });
    };

    return (
        <>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/">
                    <span>Krily</span>Car
                </NavLink>

                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/rentcar">Rent A Car</NavLink>
                    <NavLink to="/about">About</NavLink>

                </nav>
                <div id="login-btn">
                    <LoginButton />
                </div>
            </header>

            <div className="exploreCarsDiv">
                {rentCarsData.map((car, index) => (
                    <div className="exploreCarsImg" key={car._id}>
                        <img
                            src={car.filePath}
                            alt=""
                            style={{ width: '80%', height: '70%' }}
                            onClick={handleClick}
                        />
                        <h4>
                            <b>{car.brand}</b>
                        </h4>
                        <p>{car.model}</p>
                        <p>Year: {car.year}</p>
                        <p>Rent Per Day: {car.rent} DA</p>
                        <p>Seats: {car.seats}</p>
                    </div>
                ))}
            </div>

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
        </>
    );
};

export default ExploreRentCar;
