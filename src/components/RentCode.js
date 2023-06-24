import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';


import { UserContext } from '../App';

const MyRentCode = () => {

    const { state, dispatch } = useContext(UserContext);
    const [setIncomeUser] = useState([]);
    const [items, setItems] = useState([]);
    let mycode;
    const getRentCode = async () => {
        try {
            const res = await fetch('/getMyIncomes', {
                method: 'GET',
            });
            const data = await res.json();
            setIncomeUser(data.userById);
            setItems(data.soldItems);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getRentCode();
    }, []);
    useEffect(() => {
        // Extract the rentCode value from the items array
        const foundItem = items.find(item => item.rentCode);
        mycode = foundItem ? foundItem.rentCode : '';
    }, [items]);
    items.map(items => {
        mycode = items.rentCode
    });


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
            <div className='rentcode'>
                <h1>Rent Code : {mycode}</h1>
            </div>
        </>
    )
};

export default MyRentCode; 