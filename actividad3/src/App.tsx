import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryComponent from './components/CategoryComponent';
import ProductComponent from './components/ProductComponent';




const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/categories" element={<CategoryComponent />} />
                <Route path="/products" element={<ProductComponent />} />
            </Routes>
        </Router>
    );
};

export default App;

