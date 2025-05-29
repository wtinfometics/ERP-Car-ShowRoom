import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthWrapper } from '../../pages/authentication/AuthWrapper';
import "../../pages/authentication/page-auth.css"
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASEURL;
const ResetPassword = () => {
  const navigate = useNavigate();
  const [inputerror, setinputerror] = useState([]);
  const [formData, setFormData] = useState({
    password: "",
    password_canform: ""
  });
  const location = useLocation();
  const { key } = location.state || {};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${API_URL}admin/ResetPassword`, {
      EmailId: key,
      password: formData.password,
      password_canform: formData.password_canform,
    }).then((response) => {
      console.log(response.data)
      navigate("/auth/login")
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
        <div className="mb-3 form-password-toggle">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="input-group input-group-merge">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              name="password"
              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
              aria-describedby="password" />
            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
          </div>
          <p className='text-danger'>{inputerror?.password?.message ? inputerror.password.message : ""}</p>
        </div>
        <div className="mb-3 form-password-toggle">
          <label className="form-label" htmlFor="password_canform">Conform password_canform</label>
          <div className="input-group input-group-merge">
            <input
              type="password_canform"
              id="password_canform"
              value={formData.password_canform}
              onChange={handleChange}
              className="form-control"
              name="password_canform"
              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
              aria-describedby="password_canform" />
            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
          </div>
          <p className='text-danger'>{inputerror?.password_canform?.message ? inputerror.password_canform.message : ""}</p>
        </div>


        <div className="mb-3">
          <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Reset Password</button>
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

export default ResetPassword