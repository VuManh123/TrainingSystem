// Home.js
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import Navbar from '../dashboard/navbar/Navbar';
import Body from '../dashboard/body/Body'
import { ThemeContext } from '../ThemeContext';

const Home = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`container ${theme}`}>
            <Navbar />
            <Body />
        </div>
    );
};

export default Home;
