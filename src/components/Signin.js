import React, { useState, useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { UserContext } from "../App"


const Signin = () => {

    const { state, dispatch } = useContext(UserContext)


    //User signin
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signinUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = res.json();

        if (res.status === 400 || !data) {
            Swal.fire(
                {

                    icon: 'error',
                    title: 'invalid Credentials, please check your email & password',
                    showConfirmButton: true,

                }
            )
        }
        else {

            dispatch({ type: "USER", payload: true })

            Swal.fire(
                {

                    icon: 'success',
                    title: 'Signin Successfull',
                    showConfirmButton: false,
                    timer: 1500
                }
            )
            history.push("/rentcar");
        }
    }




    return (
        <>

            <header className="header">

                <div id="menu-btn" className="fas fa-bars"></div>

                <NavLink className="logo" to="/"> <span>Krily</span>Car </NavLink>

                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/exploreRentCars"> Cars Showcase</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <a href="#services">Testimonial</a></nav>

                <div id="login-btn">
                    <button className="btn"><NavLink className="nav-link" to="/signin">login</NavLink></button>
                </div>

            </header>

            <div className="maincontainer">
                <div className="firstcontainer">
                    <div className="titled"></div>
                    <div id="usersignin" style={{ display: "block" }} className="content">
                        <h2>Signin As User</h2>
                        <form method="POST">
                            <div className="user-details">

                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                                </div>

                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                                </div>

                            </div>

                            <div className="button">
                                <input type="submit" value="signin" onClick={signinUser} />
                            </div>
                        </form>
                        <div className="extra-links">
                            <h3> don't have an account ? <NavLink style={{ color: "#03440C" }} to="/signup">create one</NavLink></h3>
                            <button className="btn"><NavLink style={{ color: "#ffffff" }} to="/adminsignin">Signin As Admin</NavLink></button>
                        </div>
                    </div>


                </div>
            </div>


        </>
    )
}

export default Signin
