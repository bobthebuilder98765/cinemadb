import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => (
    <header className="header">
        <div className="container">
            <nav>
                <ul>
                    <li><Link to="/">Upload</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;