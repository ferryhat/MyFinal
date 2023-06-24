import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import "../AboutStyle.css";
import aboutImage from '../images/about.png';
import aboutCarImage from '../images/about-car.png';
import Safe from '../images/safe.png';

const About = () => {
    const { state } = useContext(UserContext);

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
    return (
        <>
            <div className="aboutheader">
                <header className="header">
                    <div id="menu-btn" className="fas fa-bars"></div>
                    <NavLink className="logo" to="/">
                        Krily<span>Car</span>
                    </NavLink>
                    <nav className="navbar">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/exploreRentCars"> Cars Showcase</NavLink>
                        <NavLink to="/rentcar">Rent A Car</NavLink>
                        <NavLink to="/about">About</NavLink>

                        <a href="/contact">Contact</a>
                    </nav>
                    <div id="login-btn">
                        <Loginbutton />
                    </div>
                </header>
            </div>

            <section className="common-section" style={{ backgroundImage: `url(${aboutImage})` }}>
                <div className="common-section__overlay">
                    <h2 className="common-section__title">About Us</h2>
                </div>
            </section>
            <section className="about__section">

                <div className="about__content-wrapper">
                    <div className="about__section-content">
                        <h4 className="section__subtitle">About Us</h4>
                        <h2 className="section__title">Welcome to car rent service</h2>
                        <p className="section__description">
                            Welcome to KrilyCar, your premier car rental service located in Blida.
                            We are dedicated to providing exceptional car rental solutions tailored to meet your
                            needs. With a wide range of well-maintained vehicles and a team of professional staff,
                            we ensure a seamless and enjoyable rental experience. Whether you're traveling for
                            business or pleasure, trust KrilyCar to provide reliable, safe, and affordable
                            transportation options. Discover the freedom of the open road with
                            KrilyCar and embark on your next adventure with confidence.
                        </p>
                    </div>
                    <div className="about__img">
                        <img className="polo" src={aboutCarImage} alt="abtcar" />
                    </div>
                </div>

            </section>

            <section className="about__page-section">

                <div className="about__page-img">
                    <img src={Safe} alt="saferide" className="w-100 rounded-3" />
                </div>



                <div className="about__page-content">
                    <h2 className="section__title">
                        We Are Committed To Provide Safe Ride Solutions
                    </h2>

                    <p className="section__description">
                        Our priority is ensuring the safety and well-being of our customers. With well-maintained vehicles and trained drivers, we strive to deliver secure and comfortable journeys.
                    </p>

                    <p className="section__description">
                        Our rigorous safety measures and continuous monitoring guarantee a reliable and trustworthy service. Trust us for a safe and worry-free transportation experience.
                    </p>

                    <div className=" d-flex align-items-center gap-3 mt-4">
                        <span className="fs-4">
                            <i className="ri-phone-line"></i>
                        </span>

                        <div>
                            <a className="help-link">Need help? Call Us</a>
                            <h4 className="phone">+213-555-621-937</h4>
                        </div>
                    </div>
                </div>

            </section>

            <section class="become__driver">
                <div class="container">

                    <div class="become__driver-img">
                        <img src="" alt="" class="w-100" />
                    </div>
                    <div class="">
                        <h2 class="section__title become__driver-title">Do You Want to Earn With Us? So Don't Be Late</h2>
                        <button class="btn become__driver-btn">Become a Driver</button>
                        <h3 className="para">
                            We offer exciting opportunities for individuals who are motivated,
                            dedicated, and eager to grow. Whether you're looking for part-time
                            work or a full-time career, we have flexible options to suit your needs.
                            Our supportive and collaborative environment ensures that you'll have the
                            resources and guidance to succeed. Take the first step towards us <span>All you need is to come to our agency with your driver license </span> Don't miss out on this incredible
                            opportunity – seize it today!
                        </h3>
                    </div>

                </div>
            </section>
            <section class="baner">
                <div>

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
        </>
    );
};

export default About;
