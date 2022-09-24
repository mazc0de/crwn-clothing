import { useEffect } from "react";

import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase.utils";

const SignIn = () => {
    useEffect(() => {
        const getResultLoginRedirect = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        };

        getResultLoginRedirect();
    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    const logGoogleUserWithRedirect = async () => {
        const { user } = await signInWithGoogleRedirect();
        console.log({ user });
    };
    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>Sign in With Google Account</button>
            <button onClick={logGoogleUserWithRedirect}>Sign in With Google Account</button>
        </div>
    );
};

export default SignIn;
