import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { AdminContext } from "../../App"

const AllReviews = () => {
    const { adminState, dispatchadmin } = useContext(AdminContext)
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('/getallreviews');
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    };
    const Loginbutton = () => {

        if (adminState) {
            return <div>
                <button className="logoutbtnDash"><NavLink className="nav-link" to="/adminsignout">logout</NavLink></button>
            </div>
        }
        else {
            return <div>
                <button className="logoutbtnDash"><NavLink className="nav-link" to="/signin">login</NavLink></button>

            </div>
        }
    }
    return (
        <div>
            <h1>All Reviews</h1>
            {reviews.map((review) => (
                <div key={review._id}>
                    <h3>{review.carById.brand} - {review.carById.model}</h3>
                    <ul>
                        {review.allReviews.map((reviewItem) => (
                            <li key={reviewItem._id}>
                                <p>Name: {reviewItem.name}</p>
                                <p>Email: {reviewItem.email}</p>
                                <p>Comments: {reviewItem.comments}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AllReviews;
