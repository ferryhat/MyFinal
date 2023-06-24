import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const Home = () => {
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

    const { state, dispatch } = useContext(UserContext)

    const Loginbutton = () => {

        if (state) {
            return <div>
                <button ><NavLink className="btn" to="/signout">logout</NavLink></button>
            </div>
        }
        else {
            return <div>
                <button ><NavLink className="btn" to="/signin">login</NavLink></button>

            </div>
        }

    }


    return (


        <>

            <header className="header">

                <div id="menu-btn" className="fas fa-bars"></div>

                <NavLink className="logo" to="/"> Krily<span>Car</span></NavLink>



                <nav className="navbar">
                    <a href="#">Home</a>
                    <NavLink to="/exploreRentCars"> Cars Showcase</NavLink>
                    <NavLink to="/rentcar">Rent A Car</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <a href="/bookingrequest">Make a Booking Request</a>
                    <a href="/contact">Contact</a>
                </nav>
                <div id="login-btn">
                    <Loginbutton />
                </div>

            </header>

            <section class="separator">
                <div>

                </div>
            </section>


            <section className="home" id="home">
                <h3 data-speed="-2" className="home-parallax">
                    <span>krily</span> Cars - <br /> Your Convenient Car Rental Partner.
                </h3>
                <img data-speed="5" className="home-parallax" src="/image/home.png" alt="" />
            </section>

            <section className='case' id='showcasehome'>
                <NavLink className="btn" to="/exploreRentCars">Cars Showcase</NavLink>
            </section>

            <section className="plan-section">
                <div className="container">
                    <div className="plan-container">
                        <div className="plan-container__title">
                            <h3>Plan your trip now with</h3>
                            <h2>Quick & easy steps </h2>
                        </div>

                        <div className="plan-container__boxes">
                            <div className="plan-container__boxes__box">
                                <i class="fas fa-car" ></i>

                                <h3>Select Car</h3>
                                <p>
                                    We offers a big range of vehicles for all your driving needs.
                                    Choose one, insert the numbers of rent days then add it to your cart
                                </p>
                            </div>

                            <div className="plan-container__boxes__box">
                                <i class="fab fa-cc-visa"></i>
                                <h3>Quick Payment</h3>
                                <p>
                                    no more waiting on long queues! with krily cars you can easily book & pay for your car rental online,
                                    anytime and anywhere with secure transactions.
                                </p>
                            </div>

                            <div className="plan-container__boxes__box">
                                <i class="fas fa-house-user"></i>
                                <h3>Take your car</h3>
                                <p>
                                    Visit our location to pick up your reserved car.
                                    Please bring your valid driver's license
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='Or'>

                <div className="plan-container__title">

                    <h2>Or ? <br />you can just Request a booking for future dates..</h2>
                </div>


            </section>
            <section className="icons-container">

                <div className="icons">
                    <i className="fas fa-map-marker-alt"></i>
                    <div className="content">
                        <h3>170+</h3>
                        <p>Locations Served</p>
                    </div>
                </div>

                <div className="icons">
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <div className="content">
                        <h3>850+</h3>
                        <p>Cars Rented</p>
                    </div>
                </div>

                <div className="icons">
                    <i className="fas fa-users"></i>
                    <div className="content">
                        <h3>320+</h3>
                        <p>happy clients</p>
                    </div>
                </div>

                <div className="icons">
                    <i class="fa-sharp fa-solid fa-car"></i>
                    <div className="content">
                        <h3>80+</h3>
                        <p>Available Cars</p>
                    </div>
                </div>

            </section>

            <section className="services" id="services">

                <h1 className="heading"> Our Clients <span>Feedbacks</span> </h1>

                <div className="box-container">

                    <div className="box">
                        <div className="rev-img">
                            <img src="/image/Persons/homme1.jpg" alt="" />
                        </div>
                        <h3>Karim Belkacem</h3>
                        <p>I was thoroughly impressed with KrilyCar. Their website was easy to navigate, the car selection was diverse, the staff was professional, and the whole process was seamless.</p>
                    </div>

                    <div className="box">
                        <div className="rev-img">
                            <img src="/image/Persons/femme.jpg" alt="img" />
                        </div>
                        <h3>Feriel Hattou</h3>
                        <p>I had a fantastic experience with KrilyCar. The staff was friendly and accommodating, and the car was comfortable and well-maintained. I highly recommend their services.</p>
                    </div>


                    <div className="box">
                        <div className="rev-img">
                            <img src="/image/Persons/homme2.jpg" alt="" />
                        </div>
                        <h3>Ahmed Benali</h3>
                        <p>Thanks to this Car Rent, my vacation was a breeze. The website made booking quick, the car was in great condition, and the staff was knowledgeable and helpful. I would choose them again without hesitation.</p>
                    </div>

                </div>

            </section>


            <section>
                <div className="plan-container__title">

                    <h2>Available Brands, and more.. </h2>
                </div>
                <img src='/image/marques.png' alt='brands'>
                </img>
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
    )

}



export default Home
