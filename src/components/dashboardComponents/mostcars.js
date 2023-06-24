import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AdminContext } from "../../App"


const RentedCarsComponent = () => {
    const [productIds, setProductIds] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [rentalCounts, setRentalCounts] = useState([]);
    const [carData, setCarData] = useState(null);

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const response = await fetch('/all-product-ids');
                const data = await response.json();
                setProductIds(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductIds();
    }, []);

    useEffect(() => {
        const fetchRentalCounts = async () => {
            try {
                const response = await fetch(`/count-rental-by-car/${selectedProductId}`);
                const data = await response.json();
                console.log('Rental Counts Response:', data); // Add this line for debugging

                if (data.rentalCounts && data.rentalCounts.length > 0 && data.carData) {
                    setRentalCounts(data.rentalCounts);
                    setCarData(data.carData);
                } else {
                    setRentalCounts([]);
                    setCarData(null);
                }
            } catch (error) {
                console.error(error);
            }
        };



        if (selectedProductId) {
            fetchRentalCounts();
        } else {
            setRentalCounts([]);
            setCarData(null);
        }
    }, [selectedProductId]);

    const handleProductIdChange = (event) => {
        setSelectedProductId(event.target.value);
    };

    return (
        <div>
            <h1>Rental Counts by Car</h1>
            <div>
                <label htmlFor="productId">Product ID: </label>
                <select id="productId" value={selectedProductId} onChange={handleProductIdChange}>
                    <option value="">Select a product ID</option>
                    {productIds.map((productId) => (
                        <option key={productId} value={productId}>
                            {productId}
                        </option>
                    ))}
                </select>
            </div>
            {rentalCounts.length > 0 && carData ? (
                <div>
                    <h2>Car Details</h2>
                    <p>Brand: {carData.brand}</p>
                    <p>Model: {carData.model}</p>
                    <p>Year: {carData.year}</p>
                    <p>Color: {carData.color}</p>
                    <p>Seats: {carData.seats}</p>
                    <p>Price: {carData.price}</p>
                    <p>Rental Count: {rentalCounts[0].rentalCount}</p>
                </div>
            ) : (
                <p>No rental counts available.</p>
            )}
        </div>
    );
};

export default RentedCarsComponent;
