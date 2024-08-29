import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/categories">Categorías</Link>
                </li>
                <li>
                    <Link to="/products">Productos</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
