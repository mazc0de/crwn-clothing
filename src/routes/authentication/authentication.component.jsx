import { useEffect } from "react";

import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

const Authentication = () => {
    // useEffect for get result after login redirect
    useEffect(() => {
        const getResultLoginRedirect = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        };

        getResultLoginRedirect();
    }, []);

    // const logGoogleUserWithRedirect = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     console.log({ user });
    // };
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
