import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Totalusers from './totalusers';
import Swal from 'sweetalert2';
import { AdminContext } from '../../App';

const TotalCars = () => {
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
        },
    ]);
    const [carCount, setCarCount] = useState(0); // State variable for car count

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
            setCarCount(data.length); // Update the car count
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallrenttcars();
    }, []);

    // Rest of the code...

    return (
        <>






            <h1 className="heading">
                <span>Total Cars: {carCount}</span>

            </h1>





        </>
    );
};

export default TotalCars;
