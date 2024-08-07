// Home.js
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import Navbar from '../dashboard/navbar/Navbar';
import Body from '../dashboard/body/Body'
import { ThemeContext } from '../ThemeContext';
import Footer from '../dashboard/footer/Footer';

const Home = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`container ${theme}`}>
            <Navbar />
            <Body />
            <Footer />
        </div>
    );
};

export default Home;
