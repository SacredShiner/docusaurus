import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { useHistory } from '@docusaurus/router';
import apiService from '../../services/apiService';
import googleService from '../../services/googleService';
import setAuthToken from '../../utils/setAuthToken';
import styles from './styles.module.css';

const SignupForm = (props) => {
    const history = useHistory();

    // States
    const initialState = { email: '', password: '', confirmPassword: '' };
    const [formData, setFormData] = React.useState(initialState);
    const [errors, setErrors] = React.useState(null);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    /**
     * @description
     *  Sign up User (Custom)
     */
    const handleRegister = () => {
        apiService.signup(formData).then(res => {
            window.alert('User is successfully registered.');
            setAuthToken(res.token);
            setErrors(null);
            history.push('/');
        }).catch(err => {
            setErrors(err);
        });
    }

    /**
     * @description
     *  Google Register
     */
    const handleGoogleRegister = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log("Register-tokenResponse", tokenResponse);
            googleService.getUserInfo(tokenResponse.access_token).then((res) => {
                console.log("Register-UserInfo", res.data);
                apiService.signupWithGoogle(res.data).then(res => {
                    window.alert('User is successfully registered with Google');
                    setAuthToken(res.token);
                    setErrors(null);
                    history.push('/');
                }).catch(err => {
                    if (err?.email) {
                        alert(err?.email);
                    } else {
                        setErrors(err);
                    }
                });
            }).catch((err) => {
                console.log(err);
            })
        },
    });

    /**
     * @description
     * Linkedin Register
     */
    const handleLinkedinRegister = () => {

    }

    return <>
        <div className={styles.signupform}>
            <h1>SIGN UP</h1>
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
                    <input
                        id='input_confirm_password'
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                    />
                    <p className={styles.error}>{errors?.confirmPassword}</p>
                </div>
                <div>
                    <input type="submit" value="Register" onClick={handleRegister} />
                </div>
                <div className={styles.socialbtns}>
                    <input type='button' onClick={handleGoogleRegister} value="Google" />
                    <input type='button' onClick={handleLinkedinRegister} value="Linkedin" />
                </div>
            </div>
        </div>
    </>;
}

export default SignupForm;