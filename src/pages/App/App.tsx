import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './../Home/Home';
import About from './../About/About';
import Dashboard from './../Dashboard/Dashboard';
import TaskList from '../TaskList/TaskList';
import AdminList from '../AdminList/AdminList';
import PageNotFound from '../PageNotFound/PageNotFound';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/task_list" element={<TaskList />} />
        <Route path="/admin-list" element={<AdminList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
