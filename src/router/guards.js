
import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import HomePage from "../components/HomePage/HomePage";

export const guardHomePage = (props) => {
    // if user left without logging out and localStorage 'user' still exists:
    props.user = props.user || JSON.parse(localStorage.getItem('user'));
    // guard homepage url in case user has not logged in:
    return localStorage.getItem('user')
        ? <HomePage user={props.user}/>
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
};