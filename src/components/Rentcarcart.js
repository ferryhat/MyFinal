import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Stripe from 'react-stripe-checkout';

import { UserContext } from '../App';

const Rentcarcart = () => {
    const { state, dispatch } = useContext(UserContext);

    const [cartUser, setCartUser] = useState([]);
    const [items, setItems] = useState([]);
    let itemsPrice, idOfRentedCar, reqDays;


    const getCartData = async () => {
        try {
            const res = await fetch('/getRentCartData', {
                method: 'GET',
            });

            const data = await res.json();
            setCartUser(data.userById);
            setItems(data.cartItems);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCartData();
    }, []);

    items.forEach((items) => {
        itemsPrice = items.totalbill;
        idOfRentedCar = items.rentcarid;
        reqDays = items.requireddays;
    });

    const handlePayMethod = (itemsPrice, token) => {
        return fetch('/stripeRentPay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token.id,
                amount: itemsPrice,
                idRentedCar: idOfRentedCar,
                daysRequired: reqDays,
            }),
        });
    };

    const tokenHandler = (token) => {
        handlePayMethod(itemsPrice, token);

        updateDataBase();
    };

    const updateDataBase = () => {
        return fetch('/updateRentDataBase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items,
            }),
        });
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

    const deleteCartItem = async (itemId) => {
        try {
            const res = await fetch(`/deleteCartItem/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                // Success: Handle any UI updates or notifications
                window.location.reload();
            } else {
                // Handle error responses
            }
        } catch (error) {
            // Handle network errors or other exceptions
        }
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
                </nav>

                <div id="login-btn">
                    <Loginbutton />
                </div>
            </header>

            <div className="salecartMaindiv">
                <div style={{ marginTop: '150px' }}>
                    {items.map((items) => (
                        <div className="salecartLidiv" key={items._id}>
                            <ul>
                                <li style={{ wordSpacing: '10px' }}>
                                    Brand: {items.brand} ---
                                    Model: {items.model} ---
                                    Days: {items.requireddays} ---
                                    RentPerDay: {items.rentperday}DA
                                    ---
                                    TotalBill: {items.totalbill}DA
                                    ---
                                    <button
                                        className="btn"
                                        id="delete"
                                        onClick={() => deleteCartItem(items._id)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ))}
                    <div style={{ padding: '30px', textAlign: 'center' }}>
                        <h2>Pay through Credit / Debit Card</h2>
                        <br />
                        <Stripe
                            stripeKey="pk_test_51Jyb5UBvc4Qazj8jy6qimLop4epxe5jziUD3ixj5ISycjjD6yYVGZhk688Pz9Lna32VTHbSHxRwkrvNNnnnr96P000M68u5jcd"
                            token={tokenHandler}
                        />
                    </div>
                    <div class="car-message">
                        <h1>
                            Your car is waiting for you, After making the payment, Please come
                            to our agency to collect it.
                        </h1>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Rentcarcart;
