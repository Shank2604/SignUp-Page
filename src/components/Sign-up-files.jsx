import React, { useState } from 'react';
import validator from 'validator';
// import axios from 'axios';
import './Sign-up-files.css';
import logo from '../assets/logo.png';


const SignUp = () =>{

    const [error, setError] = useState({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        companyName: '',
        companyWebsite: '',
        mobileNumber: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        const {firstName, email, password, mobileNumber} = formData;

        // Validate Firstname.
        const validateFirstName = (firstName) =>{
            return firstName.trim() !== '';
        };

        if(!validateFirstName(firstName)){
            newErrors.firstName = "First name is required";
        }

        // Validate email.
        const validateEmail = (email) => {
            return validator.isEmail(email);
        };

        if(!validateEmail(email)){
            newErrors.email = "Invalid email format";
        };

        // Validate password.
        const validatePassword = (password) =>{
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        }

        if(!validatePassword(password)){
            newErrors.password = "Password must be 8 characters"
        };

        // Validate Mobile Number.
        const validateMobileNumber = (mobileNumber) => {
            const mobileRegex = /^[0-9]{10}$/;
            return mobileRegex.test(mobileNumber);
        }
        if(!validateMobileNumber(mobileNumber)){
            newErrors.mobileNumber = "Ïnvalid mobile number format"
        };

        setError(newErrors);

        if(Object.keys(newErrors).length === 0){
            console.log("Form submitted successfully")
        };

        // Code to send data to backend.

        // try{
        //     const response = await axios.post('#',formData)
        //     console.log(response)
        // }catch(err){
        //     console.log("Error : ",err)
        // }

        console.log(formData);

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            companyName: '',
            companyWebsite: '',
            mobileNumber: ''
        });
    };

    return <div className='container-signup'>
        <img src={logo} alt='logo' />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange}/>
            {error.firstName && <span>{error.firstName}</span>}
            <input type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} />
            <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
            {error.email && <span>{error.email}</span>}
            <input type="password" name="password" placeholder= 'Password' value={formData.password} onChange={handleChange}/>
            {error.password && <span>{error.password}</span>}
            <input type="text" name="companyName" placeholder='Company Name' value={formData.companyName} onChange={handleChange} />
            <input type="url" name="companyWebsite" placeholder='Company Website' value={formData.companyWebsite} onChange={handleChange} />
            <input type="tel" name="mobileNumber" placeholder='Mobile Number' value={formData.mobileNumber} onChange={handleChange} pattern='[0-9]{10}'/>
            {error.mobileNumber && <span>{error.mobileNumber}</span>}
            <button type='submit'>Submit</button>
        </form>
    </div>
}

export default SignUp;