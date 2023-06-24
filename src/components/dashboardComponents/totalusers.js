import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AdminContext } from '../../App';

const Totalusers = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext);
    const [getUsers, setGetUsers] = useState([]);

    const getallusers = async () => {
        try {
            const res = await fetch('/getavailableusers', {
                method: 'GET',
            });

            const data = await res.json();
            setGetUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallusers();
    }, []);

    const deleteUser = async (e) => {
        const userIdFromDashBoard = e.target.id;

        try {
            await fetch('/deleteUserfromdashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userIdFromDashBoard,
                }),
            });

            // Refresh the user list after deleting
            getallusers();
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>





            <h1 className="heading">
                <span>Total Users : {getUsers.length}</span>
            </h1>





        </>
    );
};

export default Totalusers;
