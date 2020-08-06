import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import PublicRoute from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import AccountVerification from './pages/AccountVerification/AccountVerification';
import ForgotPassword from './pages/ForgotPassword/Forgot';
import ResetPasswordPublic from './pages/ResetPassword-Public/ResetPasswordPublic';
import { verifyToken } from './services/authServices';


function App() {

    // verify token on app load
    useEffect(() => {
        const tokenValidity = async () => {
            const checkToken = await verifyToken();
            if (checkToken.error) {
                localStorage.removeItem('token');
            }
        }

        tokenValidity();
    }, []);
    
    const auth = useSelector(state => state.auth);
    const { isAuthenticated } = auth;

    return (
        <Router>
            <Switch>
                <PublicRoute exact path='/login' component={Login} isAuthenticated={isAuthenticated} />
                <PublicRoute exact path='/register' component={Register} isAuthenticated={isAuthenticated} />
                <PublicRoute exact path='/verify' component={AccountVerification} isAuthenticated={isAuthenticated} />
                <PublicRoute exact path='/forgot' component={ForgotPassword} isAuthenticated={isAuthenticated} />
                <PublicRoute exact path='/reset' component={ResetPasswordPublic} isAuthenticated={isAuthenticated} />
                <PrivateRoute exact path='/dashboard' component={Home}  isAuthenticated={isAuthenticated} />
                <Redirect to={isAuthenticated ? '/dashboard' : '/login'} />
            </Switch>
        </Router>
    );
}

export default App;
