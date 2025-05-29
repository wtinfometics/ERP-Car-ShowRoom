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
      navigate("/auth/verifyotp", { state: { key: response.data.EmailId } })
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

export default ForgetPassword