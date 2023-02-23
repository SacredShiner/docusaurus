import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SignupForm from '../../components/SignupForm';

const Signup = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <main>
                <GoogleOAuthProvider clientId={`679986983043-3c6ac9rv5c2quhqvhumqq351dc48un0u.apps.googleusercontent.com`}>
                    <SignupForm />
                </GoogleOAuthProvider>
            </main>
        </Layout>
    )
}

export default Signup;