import React, { createContext, useReducer, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AdminSignin from "./components/AdminSignin";
import AdminSignout from "./components/AdminSignout";
import Addcars from "./components/dashboardComponents/Addcars";
import Rentcarreports from "./components/dashboardComponents/Rentcarreports";
import Availableusers from "./components/dashboardComponents/Availableusers";
import Getrentcars from "./components/dashboardComponents/Getrentcars";
import Rentacar from "./components/Rentacar";
import Mycart from "./components/Mycart";
import Rentcarcart from "./components/Rentcarcart";
import Rentcarreviews from "./components/Rentcarreviews";
import Signout from "./components/Signout";
import ExploreRentCar from "./components/ExploreRentCar";
import About from './components/About';
import Contact from './components/Contact';
import DisplayAllMessages from "./components/dashboardComponents/allmessages";
import AllReviews from "./components/dashboardComponents/allreviews";
import BookingRequest from "./components/BookingRequest";
import AdminBookingRequests from "./components/dashboardComponents/Requests";
import { initialState, reducer } from "../src/reducer/UseReducer"
import { adminInitialState, adminreducer } from "../src/reducer/UseReducerAdmin"
import BookingList from "./components/Bookinglist";
import MyRentCode from "./components/RentCode";
import RentedCarsComponent from "./components/dashboardComponents/mostcars";
import Statistics from "./components/dashboardComponents/Statistics";
import MoreDetails from "./components/moredetails";
import TotalIncomeChart from "./components/dashboardComponents/Chartotalincome";
import Logstats from "./components/dashboardComponents/LogStat";
import TotalCars from "./components/dashboardComponents/Totalcars";
import Totalusers from "./components/dashboardComponents/totalusers";
export const UserContext = createContext();
export const AdminContext = createContext();

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [adminState, dispatchadmin] = useReducer(adminreducer, adminInitialState)


    return (
        <>

            <UserContext.Provider value={{ state, dispatch }}>
                <Route exact path="/"> <Home /> </Route>
                <Route path="/signin"> <Signin /> </Route>
                <Route path="/signup"> <Signup /> </Route>
                <Route path="/signout"> <Signout /> </Route>
                <Route path="/mycart"> <Mycart /> </Route>
                <Route path="/rentcar"> <Rentacar /> </Route>
                <Route path="/rentcarcart"> <Rentcarcart /> </Route>
                <Route path="/rentcarreviews"> <Rentcarreviews /> </Route>
                <Route path="/exploreRentCars"> <ExploreRentCar /> </Route>
                <Route path="/about" > <About /> </Route>
                <Route path="/contact"> <Contact /> </Route>
                <Route path="/bookingrequest"> <BookingRequest /> </Route>
                <Route path="/list"> <BookingList /> </Route>
                <Route path="/rentcode"> <MyRentCode /> </Route>
                <Route path="/detail"> <MoreDetails /> </Route>


            </UserContext.Provider>

            <AdminContext.Provider value={{ adminState, dispatchadmin }}>
                <Route path="/adminsignin"> <AdminSignin /> </Route>
                <Route path="/adminsignout"> <AdminSignout /> </Route>
                <Route path="/dashboard"> <Dashboard /> </Route>
                <Route path="/addcars"> <Addcars /> </Route>
                <Route path="/rentcarsreports"> <Rentcarreports /> </Route>
                <Route path="/availableusers"> <Availableusers /> </Route>
                <Route path="/getrentcarsforadmin"> <Getrentcars /> </Route>
                <Route path="/messages"> < DisplayAllMessages /> </Route>
                <Route path="/allreviews"> < AllReviews /> </Route>
                <Route path="/requests"> < AdminBookingRequests /> </Route>
                <Route path="/mostcars"> < RentedCarsComponent /> </Route>
                <Route path="/st"> < Statistics /> </Route>
                <Route path="/totalincome"> < TotalIncomeChart /> </Route>
                <Route path="/logs"> < Logstats /> </Route>
                <Route path="/totalcars"> < TotalCars /> </Route>
                <Route path="/totalusers"> < Totalusers /> </Route>





            </AdminContext.Provider>

        </>
    );


}

export default App;
