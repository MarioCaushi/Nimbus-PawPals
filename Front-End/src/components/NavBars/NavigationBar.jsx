import React from 'react';
import HomeNavBar from '../NavBars/HomeNavBar';
import StaffNavBar from "./StaffNavBar"
import ClientNavBar from './ClientNavBar';


const NavigationBar = ({ loggedIn, role }) => {
    const getNavBar = () => {

        if(!loggedIn)
        {
            return <HomeNavBar />;
        }
        else if( role !== 'Client')
        {
            return <StaffNavBar role={role} />;
        }
        else
        {
            return <ClientNavBar/>;
        }
    };

    return (
        <>
            {getNavBar()}
        </>
    );
};

export default NavigationBar;
