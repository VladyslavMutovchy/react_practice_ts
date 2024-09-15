import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './../Home/Home';
import About from './../About/About';
import Dashboard from './../Dashboard/Dashboard';
import PageNotFound from '../PageNotFound/PageNotFound';


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
