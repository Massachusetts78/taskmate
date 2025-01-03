// App.js or index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './app/frontend/sidebar/sidebar';
import LandingPage from './app/frontend/welcome/welcome';
import ForgotPassword from './app/frontend/forgot-password/forgot_password';
import ReadmeComponent from './app/frontend/readme/readme';
import Login from './app/frontend/login/login';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path='/sidebar'
                    element={<Sidebar />}
                ></Route>
                <Route
                    path='/login'
                    element={<Login />}
                ></Route>
                <Route
                    path='/'
                    element={<LandingPage />}
                ></Route>
                <Route
                    path='/readme'
                    element={<ReadmeComponent />}
                ></Route>
                <Route
                    path='/forgot-password'
                    element={<ForgotPassword />}
                ></Route>
            </Routes>
        </Router>
    );
}
export default App;
