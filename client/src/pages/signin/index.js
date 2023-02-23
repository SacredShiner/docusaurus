import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from '@theme/Layout';;
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SigninForm from '../../components/SigninForm';

const Signin = () => {
    const { siteConfig } = useDocusaurusContext();

    const handleGetToken = () => {
        const tokenObj = localStorage.getItem('token');
        const token = JSON.parse(tokenObj);
        const now = new Date();
        if (token.expiry < now.getTime())
            console.log("No token");
        else
            console.log(token);

        siteConfig.themeConfig.navbar.items.splice(2, 0);
        // console.log(siteConfig.themeConfig.navbar.items.spli);
    }

    return <>
        <Layout
            title={`${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <main>
                <GoogleOAuthProvider clientId={`679986983043-3c6ac9rv5c2quhqvhumqq351dc48un0u.apps.googleusercontent.com`}>
                    <SigninForm />
                </GoogleOAuthProvider>
                <button onClick={handleGetToken}>Hello</button>
            </main>
        </Layout>
    </>
}

export default Signin;