import React from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import PublicRoute from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import Register from './pages/Register/Register';


function App() {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated } = auth;

    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/login" component={Login} isAuthenticated={isAuthenticated} />
                <PublicRoute exact path="/register" component={Register} isAuthenticated={isAuthenticated} />
                <PrivateRoute exact path="/dashboard" component={Home}  isAuthenticated={isAuthenticated} />
                <Redirect to={isAuthenticated ? '/dashboard' : '/login'} />
            </Switch>
        </Router>
    );
}

export default App;
