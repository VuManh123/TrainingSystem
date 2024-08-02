// Home.js
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import Navbar from '../navbar/Navbar';
import { ThemeContext } from '../ThemeContext';

const Home = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`container ${theme}`}>
            <Navbar />
        </div>
    );
};

export default Home;
