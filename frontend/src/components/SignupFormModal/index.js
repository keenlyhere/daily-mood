import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { monthToNum } from "../../utils/dateFormating";
import DayPicker from "./DatePicker/DayPicker";
import MonthPicker from "./DatePicker/MonthPicker";
import YearPicker from "./DatePicker/YearPicker";
// import "./SignupForm.css";
import "./SignUpForm2.css";

export default function SignupFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [ email, setEmail ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    // const [ birthday, setBirthday ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ displayPic, setDisplayPic ] = useState(null);
    const [ imageUrl, setImageUrl] = useState(null);
    const [ errors, setErrors ] = useState({});
    const { closeModal } = useModal();

    const [ year, setYear ] = useState("");
    const [ month, setMonth ] = useState("");
    const [ day, setDay ] = useState("");

    const handleYearChange = (selectedYear) => {
        setYear(selectedYear);
        // setChosenYear(selectedYear);
    };

    const handleMonthChange = (selectedMonth) => {
        setMonth(selectedMonth);
        // setChosenMonth(selectedMonth);
    };

    const handleDayChange = (selectedDay) => {
        setDay(selectedDay);
        // setChosenDay(selectedDay);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const submitErrors = {};

        // if (password !== confirmPassword) {
        //     submitErrors.passwordMismatch = "Password mismatch.";

        //     if (Object.keys(submitErrors).length > 0) {
        //         return setErrors(submitErrors);
        //     }
        // }

            // setErrors({});
            const birthday = new Date(year, monthToNum[month] - 1, day);
            console.log("birthday ===>", birthday);

            if (!email) {
                submitErrors.emailRequired = "Email is required.";
            }

            if (!email.includes("@")) {
                submitErrors.validEmail = "Please enter a valid email";
            }

            if (password.length < 6 || password.length > 50) {
                submitErrors.passwordLength = "Please enter a password between 6 and 50 characters";
            }

            if (password !== confirmPassword) {
                submitErrors.passwordMismatch = "Password mismatch";
            }

            if (!firstName) {
                submitErrors.firstName = "First name is required.";
            }

            if (!lastName) {
                submitErrors.lastName = "First name is required.";
            }

            if (!year) {
                submitErrors.year = "Birth year is required."
            }

            if (!month) {
                submitErrors.month = "Birth month is required."
            }

            if (!day) {
                submitErrors.day = "Birth day is required."
            }

            if (Object.keys(submitErrors).length > 0) {
                console.log("submitErrors", submitErrors)
                return setErrors(submitErrors);
            }

            console.log("BIRTHDAY ===>", birthday);
            return dispatch(sessionActions.signup({ email, firstName, lastName, password, birthday, displayPic }))
                // .then(console.log("req went through"))
                .then(() => history.push("/daily"))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    console.log("data, errors:", data, data.errors)
                    const signUpErrors = {};
                    if (data && data.errors) {
                        for (let i = 0; i < data.errors.length; i++) {
                            const currError = data.errors[i];
                            console.log("currError", currError)

                            switch (currError) {
                                case "User with that email already exists":
                                    signUpErrors.emailExists = "User with that email already exists.";
                                    break;
                                case "Email is required.":
                                    signUpErrors.emailRequired = "Email is required.";
                                    break;
                                case "Please provide a valid email.":
                                    signUpErrors.validEmail = "Please provide a valid email.";
                                    break;
                                case "Password is required.":
                                    signUpErrors.passwordRequired = "Password is required.";
                                    break;
                                case "Password must be 6 characters or more.":
                                    signUpErrors.passwordLength = "Password must be 6 characters or more.";
                                    break;
                                case "First Name is required":
                                    signUpErrors.firstName = "First name is required.";
                                    break;
                                case "Last Name is required":
                                    signUpErrors.lastName = "Last name is required.";
                                    break;
                                case "Please enter your birthday":
                                    signUpErrors.birthday = "Birthday is required.";
                                    break;
                                default:
                                    break;
                            }
                        }

                        // console.log(signUpErrors);
                        setErrors(signUpErrors);
                    };
                });

    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDisplayPic(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    }

    return (
        <div className="SignUpForm-container">
            <div className="SignUpForm-top">
                <button
                    className="SignUpForm-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="SignUpForm-create">Sign up</h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="SignUpForm-form"
            >
                <div className="SignUpForm-group-profile-pic">
                    <img
                        src={ imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt="default-profile-image"
                        className="SignUpForm-default-profile-image"
                    />
                    <label htmlFor="profile-pic-upload" className="SignUpForm-profile-pic-upload clickable">
                        Add a photo of yourself!
                    </label>
                    <input id="profile-pic-upload" type="file" accept="image/*" onChange={updateFile} />
                </div>
            <div className="SignUpForm-main-container">
                <div className="SignUpForm-group email">
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email">
                        Email
                    </label>
                    <div className="Form-error-container">
                        {errors && errors.emailExists && <p className="Form-error">{errors.emailExists}</p>}
                        {errors && errors.emailRequired && <p className="Form-error">{errors.emailRequired}</p>}
                        {errors && errors.validEmail && <p className="Form-error">{errors.validEmail}</p>}
                    </div>
                </div>
                <div className="SignUpForm-group-split">
                    <div className="SignUpForm-group-half firstName">
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <label htmlFor="firstName">
                            First Name
                        </label>
                        <div className="Form-error-container">
                            {errors && errors.firstName && <p className="Form-error">{errors.firstName}</p>}
                        </div>
                    </div>
                    <div className="SignUpForm-group-half lastName">
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <label htmlFor="lastName">
                            Last Name
                        </label>
                        <div className="Form-error-container">
                            {errors && errors.lastName && <p className="Form-error">{errors.lastName}</p>}
                        </div>
                    </div>
                </div>
                <label htmlFor="birthday" className="SignUpForm-group-birthday">
                    Birthday
                </label>
                <div className="SignUpForm-group birthday">
                    {/* <input
                        id="birthday"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    /> */}
                    <YearPicker chosenYear={year} onChange={handleYearChange} />
                    <MonthPicker chosenMonth={month} chosenYear={year} onChange={handleMonthChange} />
                    <DayPicker chosenDay={day} chosenYear={year} chosenMonth={month} onChange={handleDayChange} />
                </div>
                    <div className="Form-error-container-birthday">
                        {errors && errors.year && <p className="Form-error">{errors.year}</p>}
                        {errors && errors.month && <p className="Form-error">{errors.month}</p>}
                        {errors && errors.day && <p className="Form-error">{errors.day}</p>}
                    </div>
                <div className="SignUpForm-group-split">
                    <div className="SignUpForm-group-half password">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div className="SignUpForm-group-half confirmPassword">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                    </div>
                </div>
                    <div className="Form-error-container">
                        {errors && errors.passwordLength && <p className="Form-error">{errors.passwordLength}</p>}
                        {errors && errors.passwordMismatch && <p className="Form-error">{errors.passwordMismatch}</p>}
                    </div>
            </div>
            <div className="SignUpForm-button-container">
                <button
                    type="submit"
                    className="SignUpForm-submit"
                >Sign Up</button>
            </div>
            </form>
        </div>
    );
};
