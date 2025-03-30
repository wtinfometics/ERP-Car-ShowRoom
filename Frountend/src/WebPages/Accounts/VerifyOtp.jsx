import React, { useState } from 'react'
import { json, Link, Navigate, useLocation } from 'react-router-dom';
import { AuthWrapper } from '../../pages/authentication/AuthWrapper';
import "../../pages/authentication/page-auth.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASEURL;

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [inputerror, setinputerror] = useState([]);
    const [formData, setFormData] = useState({
        otp:""
    });
    const location = useLocation();
    const { key } = location.state || {};
    console.log(key)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);

        axios.post(`${API_URL}admin/Verifyotp`, {
            EmailId: key,
            otp:formData.otp
          }).then((response) => {
            console.log(response.data)
            navigate("/auth/resetpassword",{state:{key:response.data.EmailId}})
          }).catch((error) => {
            if (error.response && error.response.data) {
              setinputerror(error.response.data);
            } else {
              console.error('An error occurred:', error.message);
            }
          });
    };
    return (
        <AuthWrapper>

            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
             
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">otp </label>
                    <input
                        type="text"
                        className="form-control"
                        id="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        name="otp"
                        placeholder="Enter your otp or username"
                        autoFocus />
                </div>
                <p className='text-danger'>{inputerror?.otp?.message ? inputerror.otp.message : ""}</p>
                <div className="mb-3">
                    <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Verify</button>
                </div>
            </form>

            <p className="text-center">
                <span>New on our platform? </span>
                <Link aria-label="Go to Register Page" to='/auth/login' className="registration-link">
                    <span>Login</span>
                </Link>
            </p>

        </AuthWrapper>
    )
}

export default VerifyOtp