import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../App';

const MoreDetails = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

    let location = useLocation();
    const selectedCarId = location.state;
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        email: '',
        message: '',
    });
    const [renttcarsData, setrenttcarsData] = useState({
        id: '',
        brand: '',
        model: '',
        year: '',
        color: '',
        seats: '',
        rent: '',
        fileName: '',
        filePath: '',
        fileType: '',
        fileSize: '',
        description: '',
    });
    const [allrenttcarReviews, setAllrenttcarReviews] = useState([]);
    const [showRentInput, setShowRentInput] = useState(false); // State variable to track if "Add to Cart" button is clicked
    const [rentDays, setRentDays] = useState('');

    const sendId = async () => {
        try {
            const res = await fetch('/sendReviewRentCarId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedCarId,
                }),
            });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        sendId();
    }, []);

    const reviewCarData = async () => {
        try {
            const res = await fetch('/getRentCarReviews', {
                method: 'GET',
            });

            const data = await res.json();
            setrenttcarsData({
                id: data.findCar._id,
                brand: data.findCar.brand,
                model: data.findCar.model,
                year: data.findCar.year,
                color: data.findCar.color,
                seats: data.findCar.seats,
                rent: data.findCar.rent,
                fileName: data.findCar.fileName,
                filePath: data.findCar.filePath,
                fileType: data.findCar.fileType,
                fileSize: data.findCar.fileSize,
                description: data.findCar.description,
                availability: data.findCar.availability, // Add th
            });

            setUserData({
                ...userData,
                id: data.findUser._id,
                name: data.findUser.name,
                email: data.findUser.email,
            });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        reviewCarData();
    }, []);

    const proceedToCart = async (e) => {
        e.preventDefault();
        let itemId = e.target.id;

        const res = await fetch('/addrentcartocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId,
                rentDays,
            }),
        });

        const data = await res.json();

        if (res.status === 500 || !data) {
            Swal.fire({
                title: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else if (res.status === 400 && data.error === 'Item is already in the cart') {
            Swal.fire({
                title: 'Item is already in the cart',
                icon: 'warning',
                confirmButtonText: 'OK',
            }).then((result) => {
                history.push('/rentcarcart');
            });
        } else if (res.status === 400 && data.error === 'Item is not available for rent') {
            Swal.fire({
                title: 'Item is not available for rent',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        } else if (res.status === 201) {
            Swal.fire({
                title: 'Item added to cart',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then((result) => {
                history.push('/rentcarcart');
            });
        }
    };

    const handleAddToCart = () => {
        setShowRentInput(true); // Set the state variable to true when "Add to Cart" button is clicked
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

    const handleInputs = (e) => {
        let value = e.target.value;
        setRentDays(value);
    }

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
                </nav>
                <div id="login-btn">
                    <Loginbutton />
                </div>
            </header>

            <div className="reviewsdiv" style={{ marginTop: '50px', backgroundColor: '#3f4b3b ' }}>
                <h2>Car Details</h2>
                <img src={renttcarsData.filePath} alt="" style={{ width: '50%', height: '50%' }} />
                <h4>
                    <b>Brand : {renttcarsData.brand}</b>
                </h4>
                <p>Model: {renttcarsData.model}</p>
                <p>Year: {renttcarsData.year}</p>
                <p>Color: {renttcarsData.color}</p>
                <p>Seats: {renttcarsData.seats}</p>
                <p>Rent: {renttcarsData.rent} DA</p>
                <p>Description: {renttcarsData.description}</p>
                <p style={{ color: "red" }}>Availability: {renttcarsData.availability + " days"} </p>

                {showRentInput ? (
                    <>
                        <h3>Before click on proceed please enter for how many days do you want to rent the car</h3><br />
                        <label htmlFor="lname">Rent Days: </label><br />
                        <input type="text" className='cardbtn' name="rentfordays" value={rentDays} onChange={handleInputs} placeholder="Enter rent days" style={{
                            width: "200px", height: "40px", backgroundColor: '#f6f7eb'
                        }} /><br />
                        <button onClick={proceedToCart} id={renttcarsData.id} className='btn'>
                            Proceed
                        </button>
                    </>
                ) : (
                    <button onClick={handleAddToCart} className='btn'>Add to Cart</button>
                )}
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

export default MoreDetails;
