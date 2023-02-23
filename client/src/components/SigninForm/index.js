import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { useHistory } from '@docusaurus/router';

import apiService from '../../services/apiService';
import googleService from '../../services/googleService';
import styles from './styles.module.css';
import setAuthToken from '../../utils/setAuthToken';

const SigninForm = (props) => {
    const history = useHistory();

    // States
    const initialState = { email: '', password: '' };
    const [formData, setFormData] = React.useState(initialState);
    const [errors, setErrors] = React.useState(null);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    /**
     * @description
     *  Sign in (Custom)
     */
    const handleLogin = () => {
        apiService.signin(formData).then(res => {
            window.alert("User successfully logged in");
            setAuthToken(res.token);
            setErrors(null);
            history.push('/');
        }).catch(err => {
            setErrors(err);
        });
    }

    /**
     * @description
     *  Signin with Google.
     */
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log("tokenResponse", tokenResponse);

            googleService.getUserInfo(tokenResponse.access_token).then((res) => {
                console.log("handleGoogleLogin-getUserInfo", res.data);
                apiService.signinWithGoogle(res.data).then(res => {
                    window.alert("User successfully logged in with google.");
                    setAuthToken(res.token);
                    setErrors(null);
                    history.push('/');
                }).catch(err => {
                    if (err?.email)
                        alert(err?.email);
                    if (err?.logintype)
                        alert(err?.logintype);
                    else
                        alert("There are some errors with google signin");
                });
            }).catch((err) => {
                console.log(err);
            })
        },
    });

    /**
     * @description
     *  Signin with Linkedin.
     */
    const handleLinkedinLogin = () => {

    }

    return <>
        <div className={styles.signinform}>
            <h1>SIGN IN</h1>
            <div className={styles.inputfields}>
                <div>
                    <input
                        id='input_email'
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                    <p className={styles.error}>{errors?.email}</p>
                </div>
                <div>
                    <input
                        id='input_password'
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                    <p className={styles.error}>{errors?.password}</p>
                </div>
                <div>
                    <input type="submit" value="Login" onClick={handleLogin} />
                </div>
                <div className={styles.socialbtns}>
                    <input type='button' onClick={handleGoogleLogin} value="Google Login" />
                    <input type='button' onClick={handleLinkedinLogin} value="Linkedin Login" />
                </div>
            </div>
        </div>
    </>
}

export default SigninForm;