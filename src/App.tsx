import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import TaskList from './pages/TaskList/TaskList';
import AdminList from './pages/AdminList/AdminList';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { connect } from 'react-redux';
import { RootState } from './store/store';
import { UserData } from './store/storeAuth';

interface AppProps {
  userData: UserData | null; 
}

const App: React.FC<AppProps> = (props) => {
  const { userData } = props;
console.log('======>',userData);
  return (
    <div>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        {userData ? (
          <>
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
