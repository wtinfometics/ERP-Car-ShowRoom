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
        otp: ""
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
            otp: formData.otp
        }).then((response) => {
            console.log(response.data)
            navigate("/auth/resetpassword", { state: { key: response.data.EmailId } })
        }).catch((error) => {
            if (error.response && error.response.data) {
                setinputerror(error.response.data);
            } else {
                console.error('An error occurred:', error.message);
            }
        });
    };
    return (
        <>
            <div className="tinted-background" >
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
            </div>
            <style jsx="true">{`
        .tinted-background {
          position: relative;
          height: 100vh;
           background-image: url('https://images.unsplash.com/photo-1692406069831-0bb7ea297645?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          background-size: cover;
          background-position: center;
        }

        .tinted-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: rgba(0, 0, 0, 0.5); /* Light black tint */
          z-index: 1;
        }
      `}</style>
        </>

    )
}

export default VerifyOtp