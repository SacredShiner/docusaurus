import apiService from "../services/apiService";

// Store our JWt in Local Storage and set axios header if we have a token
const setAuthToken = (token) => {
    if (token) {
        apiService.setTokenInHeader(token);

        const now = new Date();
        const item = {
            value: token,
            expiry: now.getTime() + 6000
            // expiry: now.getTime() + 7 * 24 * 3600 * 100
        }

        localStorage.setItem('token', JSON.stringify(item));
    } else {
        apiService.removeTokenInHeader();
        localStorage.removeItem('token');
    }
}

export default setAuthToken;