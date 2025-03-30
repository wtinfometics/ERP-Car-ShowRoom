import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthWrapper } from '../../pages/authentication/AuthWrapper';
import "../../pages/authentication/page-auth.css"
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASEURL;
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [inputerror, setinputerror] = useState([]);
  const [formData, setFormData] = useState({
    EmailId: '',
  });

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

    axios.post(`${API_URL}admin/ForgetPassword`, {
      EmailId: formData.EmailId,
    }).then((response) => {
      navigate("/auth/verifyotp",{state:{key:response.data.EmailId}})
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
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="EmailId"
            value={formData.EmailId}
            onChange={handleChange}
            placeholder="Enter your email"
            autoFocus />
          <p className='text-danger'>{inputerror?.EmailId?.message ? inputerror.EmailId.message : ""}</p>
        </div>
        <button aria-label='Click me' className="btn btn-primary d-grid w-100">Submit</button>
      </form>
      <div className="text-center">
        <Link aria-label="Go to Login Page" to="/auth/login" className="d-flex align-items-center justify-content-center">
          <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
          Back to login
        </Link>
      </div>

    </AuthWrapper>
  )
}

export default ForgetPassword