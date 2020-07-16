const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            const { token } = action.payload;
            return {
                isAuthenticated: true,
                token
            }
        case 'USER_LOGIN_FAILED':
            return {
                isAuthenticated: false,
                token: null
            }
        case 'USER_TOKEN_INVALID':
            return {
                isAuthenticated: false,
                token: null
            }
        default:
            return state
    }
}

export default auth;