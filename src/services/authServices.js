import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

if(localStorage.getItem('token')){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}else{
    delete axios.defaults.headers.common['Authorization'];
}

// user login API to validate the credential
export const loginService = async (email, password) => {
    try {
        return await axios.post(`${API_URL}/login`, {
            email,
            password
        });
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

export const registerServices = async (payload) => {
    try {
        return await axios.post(`${API_URL}/register`, payload);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

export const logoutService = async () => {
    try {
        return await axios.post(`${API_URL}/logout`);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

export const verifyToken = async () => {
    try{
        return await axios.post(`${API_URL}/verify-token`);
    }catch(err){
        return {
            error: true,
            response: err.response
        };
    }
}