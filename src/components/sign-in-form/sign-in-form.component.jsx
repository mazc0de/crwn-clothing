import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { createUserDocumentFromAuth, signInWithGooglePopup, signInUserWithEmailPassword } from "../../utils/firebase.utils";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

// constant form fields
const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // console.log(formFields);

    // use this for reset form
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log({ name });

        // menggunakan spread operator, lalu assign value berdasarkan name yang dikirim melalui event.target.name
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInUserWithEmailPassword(email, password);
            // console.log({ user });
            resetFormFields();
        } catch (error) {
            console.log("user sign in failed", error);
            alert("user sign in failed");
        }
    };

    const signInwithGoogle = async (event) => {
        // event.preventDefault() digunakan untuk menghilangkan perilaku default dari button yaitu submit, juga dapat ditambahkan attribute type="button" pada tag button
        event.preventDefault();
        await signInWithGooglePopup();
        // console.log({ user });
    };
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} autoComplete="on" />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInwithGoogle}>
                        Google sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
