import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

import { UserContext } from "../App"

const Rentacar = () => {

    const { state, dispatch } = useContext(UserContext)

    const history = useHistory();

    const [rentCarsData, setRentCarsData] = useState([]);

    const allRentCars = async () => {
        try {

            if (!state) {
                Swal.fire({
                    title: 'Please signin to rent a car!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push('/signin');
                    } else { history.push('/'); }
                });
            }

            const res = await fetch('/getRentCarData', {
                method: 'GET',
            });

            const data = await res.json();
            setRentCarsData(data)



            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allRentCars();
    }, [])


    const specsDiv = document.getElementsByClassName("specsDivRentcar");
    const carDiv = document.getElementsByClassName("cardivRentcar");
    const formDiv = document.getElementsByClassName("formDivRentcar");

    const showDetails = (e) => {
        let currentCar = e.target.id;
        if (specsDiv[currentCar].style.display === "none" && carDiv[currentCar].style.display === "block") {
            carDiv[currentCar].style.display = "none";
            specsDiv[currentCar].style.display = "block";
        }
        else {
            carDiv[currentCar].style.display = "block"
            specsDiv[currentCar].style.display = "none"

        }
    }

    const showCar = (e) => {
        let currentCar = e.target.id;
        if (specsDiv[currentCar].style.display === "block" && carDiv[currentCar].style.display === "none") {
            specsDiv[currentCar].style.display = "none";
            carDiv[currentCar].style.display = "block";
        }
        else {
            specsDiv[currentCar].style.display = "block"
            carDiv[currentCar].style.display = "none"
        }
    }

    const [rentDays, setRentDays] = useState('')
    const handleInputs = (e) => {
        let value = e.target.value;
        setRentDays(value);
    }

    const addToCart = (e) => {
        let currentCar = e.target.id;
        if (formDiv[currentCar].style.display === "none" && specsDiv[currentCar].style.display === "none" && carDiv[currentCar].style.display === "block") {
            carDiv[currentCar].style.display = "none";
            specsDiv[currentCar].style.display = "none";
            formDiv[currentCar].style.display = "block";
        }
        else {
            formDiv[currentCar].style.display = "none"
            specsDiv[currentCar].style.display = "none"
            carDiv[currentCar].style.display = "block"
        }
    }

    const showCarAgain = (e) => {
        let currentCar = e.target.id;
        if (formDiv[currentCar].style.display === "block" && specsDiv[currentCar].style.display === "none" && carDiv[currentCar].style.display === "none") {
            carDiv[currentCar].style.display = "block";
            specsDiv[currentCar].style.display = "none";
            formDiv[currentCar].style.display = "none";
        }
        else {
            formDiv[currentCar].style.display = "block"
            specsDiv[currentCar].style.display = "none"
            carDiv[currentCar].style.display = "none"
        }
    }

    const proceedToCart = async (e) => {
        e.preventDefault();
        let itemId = e.target.id;

        const res = await fetch("/addrentcartocart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId, rentDays
            })
        });

        const data = await res.json();

        if (res.status === 500 || !data) {
            Swal.fire({
                title: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else if (res.status === 400 && data.error === 'Item is already in the cart') {
            Swal.fire({
                title: 'Item is already in the cart',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then((result) => {
                history.push('/rentcarcart');
            });
        } else if (res.status === 400 && data.error === 'Item is not available for rent') {
            Swal.fire({
                title: 'Item is not available for rent',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        } else if (res.status === 201) {
            Swal.fire({
                title: 'Item added to cart',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                history.push('/rentcarcart');
            });
        }
    };




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



    const [searchText, setSearchText] = useState('');

    const searchTextBtn = async () => {
        const res = await fetch("/searchRentCar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchText
            })
        })

        getSearchData();
    }



    const getSearchData = async () => {
        try {
            const res = await fetch('/rentcarsearchCategory', {
                method: 'GET',
            });

            const data = await res.json();

            setRentCarsData(data)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>Krily</span>Car </NavLink>
                <nav className="navbar">
                    <NavLink className="nav-link" to="/">Home</NavLink>

                    <NavLink className="nav-link" to="/rentcarcart">Go To Cart</NavLink>

                    <input type="text" name="name" placeholder="Search Car" style={{ width: "30%", height: "8%" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} className="btn" />
                    <button type="submit" onClick={searchTextBtn} className="btn"><i className="fa fa-search"></i></button>
                    <a href="/bookingrequest">Make a Booking Request</a>

                </nav>
                <div id="login-btn">
                    <Loginbutton />
                </div>

            </header>

            <div className="rentcarcard">

                {rentCarsData.map((rentCarsData, index) =>

                    [<div className="cardivRentcar" key={rentCarsData._id}>
                        <img src={rentCarsData.filePath} alt="" style={{ width: "72%", height: "50%" }} />
                        <p><b>{rentCarsData.brand} {rentCarsData.model}</b></p>

                        <p>Year : {rentCarsData.year}</p>
                        <p>Color : {rentCarsData.color}</p>
                        <p>Seats : {rentCarsData.seats}</p>
                        <p>Rent Per Day : {rentCarsData.rent} DA</p>
                        <p style={{ color: "red" }}>Availibility : {rentCarsData.availability + " days"}</p>
                        <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
                            <button className='cardbtn' id={index} onClick={showDetails}><NavLink className="nav-link" to={{ pathname: '/detail', state: { id: rentCarsData._id } }} >More Details</NavLink></button><br />
                            <button className='cardbtn' id={index} onClick={addToCart}>Add To Cart</button><br />
                            <button className='cardbtn' ><NavLink className="nav-link" to={{ pathname: '/rentcarreviews', state: { id: rentCarsData._id } }} >Car Reviews</NavLink></button>
                        </div>
                    </div>,

                    <div className="specsDivRentcar" key={new Date}>




                        <div style={{ display: "flex", gap: "15px" }}>

                            <button className='cardbtn' id={index} onClick={showCar}>show car</button>
                        </div>
                    </div>,

                    <div className="formDivRentcar" key={index}>

                        <form method="POST" >
                            <h3>Before click on proceed please enter for how many days do you want to rent the car</h3><br />
                            <label htmlFor="lname">Rent Days: </label><br />
                            <input type="text" className='cardbtn' name="rentfordays" value={rentDays} onChange={handleInputs} placeholder="Enter rent days" /><br />

                            <input type="submit" className='cardbtn' value="Proceed" id={rentCarsData._id} onClick={proceedToCart} />
                        </form>
                        <button className='cardbtn' id={index} onClick={showCarAgain}>show car</button>

                    </div>]

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
    )
}

export default Rentacar