import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../App';

const Rentcarreviews = () => {
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

    const getallreviews = async () => {
        try {
            const res = await fetch('/getallreviewsforselectedrentcar', {
                method: 'GET',
            });

            const data = await res.json();

            setAllrenttcarReviews(data.allReviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallreviews();
    }, []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    };

    const submitReviews = async (e) => {
        e.preventDefault();

        const { id, name, email, message } = userData;

        if (!name || !email || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Message',
                text: 'Please fill in all the fields',
                showConfirmButton: true,
            });
            return;
        }

        const res = await fetch('/postrentcarreviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                name,
                email,
                message,
                selectedCarId,
            }),
        });

        const data = await res.json();

        if (data.status === 500 || !data) {
            Swal.fire({
                icon: 'error',
                title: 'Review not submitted',
                showConfirmButton: false,
                timer: 1500,
            });
            console.log('reviews not submitted');
        } else if (data.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Review submitted',
                showConfirmButton: false,
                timer: 1500,
            });
            setUserData({ ...userData, message: '' });
            history.go(0); // Refresh the page
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Review submitted',
                showConfirmButton: false,
                timer: 1500,
            });
            setUserData({ ...userData, message: '' });
            history.go(0); // Refresh the page
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

            <div className="reviewsdiv">
                <img
                    src={renttcarsData.filePath}
                    alt=""
                    style={{ width: '50%', height: '50%' }}
                />
                <h4>
                    <b>{renttcarsData.brand}</b>
                </h4>
                <p>Model: {renttcarsData.model}</p>
                <p>Year: {renttcarsData.year}</p>
                <p>Color: {renttcarsData.color}</p>
                <p>Seats: {renttcarsData.seats}</p>
                <p>Rent Price Per Day: {renttcarsData.rent} DA </p>

            </div>

            <section className="contact" id="contact">
                <h1 className="heading">
                    <span>Reviews</span>
                </h1>

                {allrenttcarReviews.map((allrenttcarReviews) => (
                    <div className="reviewsli" key={allrenttcarReviews._id}>
                        <ul>
                            <li style={{ wordSpacing: '10px' }}>
                                {allrenttcarReviews.name} :- {allrenttcarReviews.comments}
                            </li>
                        </ul>
                    </div>
                ))}

                <div className="row">
                    <form method="POST">
                        <h3>write your reviews</h3>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputs}
                            placeholder="your name"
                            className="box"
                        />
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputs}
                            placeholder="your email"
                            className="box"
                        />
                        <textarea
                            placeholder="your reviews"
                            name="message"
                            value={userData.message}
                            onChange={handleInputs}
                            className="box"
                            cols="30"
                            rows="10"
                        ></textarea>
                        <input
                            type="submit"
                            value="submit reviews"
                            onClick={submitReviews}
                            className="btn"
                        />
                    </form>
                </div>

            </section>

        </>
    );
};

export default Rentcarreviews;
