export const loginSuccess = token => {
    return {
        type: 'USER_LOGIN_SUCCESS',
        payload: {
            token
        }
    }
}

export const loginFailed = () => {
    return {
        type: 'USER_LOGIN_SUCCESS'
    }
}

export const tokenExpired = () => {
    return {
        type: 'USER_TOKEN_EXPIRED'
    }
}