import React from 'react';
import HomeNavBar from '../NavBars/HomeNavBar';

const NavigationBar = ({ loggedIn, role }) => {
    const getNavBar = () => {
        // Since other NavBars are not implemented, default to HomeNavBar
        // This approach will also render HomeNavBar when not logged in
        return <HomeNavBar />;
    };

    return (
        <>
            {getNavBar()}
        </>
    );
};

export default NavigationBar;
