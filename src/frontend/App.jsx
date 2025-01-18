// App.js or index.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './sidebar/sidebar';
import LandingPage from './welcome/welcome';
import ForgotPassword from './forgot-password/forgot_password';
import Login from './login/login';
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
                    path='/forgot-password'
                    element={<ForgotPassword />}
                ></Route>
            </Routes>
            </Router>
    );
}
export default App;
