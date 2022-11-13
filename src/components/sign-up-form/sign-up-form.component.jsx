import { useState } from "react";

import { createUserWithEmailPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";

import { SignUpContainer } from "./sign-up.styles";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// constant form fields
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

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

        // checking password if not same
        if (password !== confirmPassword) {
            alert("Password does'nt match!");
            return;
        }

        try {
            // registering new user to firebase auth
            const { user } = await createUserWithEmailPassword(email, password);
            // creating database/document in firestore
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Can't create user, email already in use!");
            } else {
                console.log("Can't create user, ", error.message);
            }
        }
    };
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required type="text" onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} autoComplete="on" />
                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} autoComplete="on" />
                <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Sign Up
                </Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;
