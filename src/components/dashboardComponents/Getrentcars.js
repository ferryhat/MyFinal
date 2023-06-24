import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AdminContext } from '../../App';

const Getrentcars = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);
    const [getCars, setGetCars] = useState([
        {
            _id: '',
            brand: '',
            model: '',
            rent: '',
            price: '',
            availability: '',
            editedPrice: '',
            newRent: '', // New state variable for new rent value
            days: '',
        },
    ]);

    const getallrenttcars = async () => {
        try {
            const res = await fetch('/getAvailableRentCars', {
                method: 'GET',
            });

            const data = await res.json();
            const carsWithEditedPrice = data.map((car) => ({
                ...car,
                editedPrice: '',
                newRent: '', // Initialize new rent for each car
            }));
            setGetCars(carsWithEditedPrice);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallrenttcars();
    }, []);

    const deleteUser = async (e) => {
        const carIdFromDashBoard = e.target.id;

        try {
            await fetch('/deleteRentCarFromDashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carIdFromDashBoard,
                }),
            });

            // Optional: Refresh the car list after deleting
            getallrenttcars();
        } catch (error) {
            console.log(error);
        }
    };

    const setAvailabilityHandler = async (e, index) => {
        const idRentedCar = e.target.id;
        const daysRequired = getCars[index].days;

        // Check if the daysRequired field is empty
        if (!daysRequired) {
            // Show an error SweetAlert notification
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter the number of days to update the availability',
            });
            return;
        }

        try {
            await fetch('/updateAvailability', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idRentedCar,
                    daysRequired,
                }),
            });

            // Show a success SweetAlert notification
            Swal.fire({
                icon: 'success',
                title: 'Availability Updated',
                text: 'The availability has been updated successfully!',
            });

            // Optional: Refresh the car list after updating the availability
            getallrenttcars();
        } catch (error) {
            console.log(error);
        }
    };

    const [availability, setAvailability] = useState('');

    const Loginbutton = () => {
        if (adminState) {
            return (
                <div>
                    <button className="logoutbtnDash">
                        <NavLink className="nav-link" to="/adminsignout">
                            logout
                        </NavLink>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="logoutbtnDash">
                        <NavLink className="nav-link" to="/signin">
                            login
                        </NavLink>
                    </button>
                </div>
            );
        }
    };
    const setNewRentHandler = async (e, index) => {
        const carIdFromDashBoard = e.target.id;
        const newRent = getCars[index].newRent;

        if (!newRent) {
            // Show an error SweetAlert notification
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid rent value',
            });
            return;
        }

        try {
            await fetch('/updateCarRent', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carIdFromDashBoard,
                    newRent,
                }),
            });

            // Show a success SweetAlert notification
            Swal.fire({
                icon: 'success',
                title: 'Rent Updated',
                text: 'The rent has been updated successfully!',
            });

            // Optional: Refresh the car list after updating the rent
            getallrenttcars();
        } catch (error) {
            console.log(error);
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
                    <Loginbutton />
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

                <div className="salecartableDiv">
                    <h1 className="heading">
                        <span>Available Rent Cars</span>
                    </h1>

                    <table className="salecartable">
                        <thead>
                            <tr>
                                <th>BRAND</th>
                                <th>MODEL</th>
                                <th>RENT</th>

                                <th>AVAILABILITY</th>
                                <th>EDIT PRICE</th>
                                <th>UPDATE AVAILABILITY</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>

                        {getCars.map((car, index) => (
                            <tbody key={car._id}>
                                <tr>
                                    <td>{car.brand}</td>
                                    <td>{car.model}</td>
                                    <td>{car.rent}</td>

                                    <td>{car.availability} days</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={car.newRent}
                                            onChange={(e) =>
                                                setGetCars((prevCars) =>
                                                    prevCars.map((prevCar, prevIndex) =>
                                                        prevIndex === index
                                                            ? { ...prevCar, newRent: e.target.value }
                                                            : prevCar
                                                    )
                                                )
                                            }
                                        />
                                        <button
                                            id={car._id}
                                            onClick={(e) => setNewRentHandler(e, index)}
                                            className="btn"
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={getCars[index].days}
                                            onChange={(e) =>
                                                setGetCars((prevCars) =>
                                                    prevCars.map((prevCar, prevIndex) =>
                                                        prevIndex === index ? { ...prevCar, days: e.target.value } : prevCar
                                                    )
                                                )
                                            }
                                        />
                                        <button id={car._id} onClick={(e) => setAvailabilityHandler(e, index)} className="btn">
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            id={car._id}
                                            onClick={deleteUser}
                                            className="btn"
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </section>
        </>
    );
};

export default Getrentcars;
