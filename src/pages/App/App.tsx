import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './../Home/Home';
import About from './../About/About';
import Dashboard from './../Dashboard/Dashboard';
import TaskList from '../TaskList/TaskList';
import AdminList from '../AdminList/AdminList';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import { UserData } from '../../store/storeAuth';

interface AppProps {
  userData: UserData | null; // Используем тип UserData из вашего слайса
}

const App: React.FC<AppProps> = (props) => {
  const { userData } = props;

  return (
    <div>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        {userData ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/task_list" element={<TaskList />} />
            <Route path="/admin-list" element={<AdminList />} />
          </>
        ) : (
          <>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  userData: state.storeAuth.user,
});

export default connect(mapStateToProps)(App);
