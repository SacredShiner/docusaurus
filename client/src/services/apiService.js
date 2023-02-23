import axios from 'axios';

class ApiService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5001/api",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    setTokenInHeader = (token) => {
        this.service.defaults.headers.common['x-auth-token'] = token;
    }

    removeTokenInHeader = () => {
        delete this.service.defaults.headers.common['x-auth-token'];
    }

    signin = (formData) => {
        return new Promise((resolve, reject) => {
            this.service.post('/users/signin', formData).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    }

    signup = (formData) => {
        return new Promise((resolve, reject) => {
            this.service.post('/users/signup', formData).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    }

    signinWithGoogle = (formData) => {
        return new Promise((resolve, reject) => {
            this.service.post('/users/signin_google', formData).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    }

    signupWithGoogle = (formData) => {
        return new Promise((resolve, reject) => {
            this.service.post('/users/signup_google', formData).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data);
            })
        });
    }
}

const apiService = new ApiService();

export default apiService;