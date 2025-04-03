import React from 'react';
import HomeNavBar from '../NavBars/HomeNavBar';
import StaffNavBar from "./StaffNavBar"

const NavigationBar = ({ loggedIn, role }) => {
    const getNavBar = () => {

        if(!loggedIn)
        {
            return <HomeNavBar />;
        }
        else 
        {
            return <StaffNavBar/>;
        }
    };

    return (
        <>
            {getNavBar()}
        </>
    );
};

export default NavigationBar;
