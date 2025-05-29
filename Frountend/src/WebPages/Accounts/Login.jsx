import React, { useState } from 'react'
import { json, Link, Navigate } from 'react-router-dom';
import { AuthWrapper } from '../../pages/authentication/AuthWrapper';
import "../../pages/authentication/page-auth.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_BASEURL;
const Login = () => {
    const nabigate = useNavigate();
      const [adminloginerror, setadminloginerror] = useState("");
    const [inputerror, setinputerror] = useState([]);
    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });

    const [empinputerror, setempinputerror] = useState([]);
    const [EmpformData, setEmpFormData] = useState({
        password: '',
        email: '',
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        setEmpFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        axios.post(`${API_URL}admin/Login`, {
            EmailId: formData.email,
            Password: formData.password
        })
            .then((response) => {
                console.log('Login successful:', response);

                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.token));
                    localStorage.setItem('role', response.data.role);
                    nabigate("/");
                }
            })
            .catch((error) => {

                // Display error message
                if (error.response && error.response.data) {
                     setadminloginerror(error.response.data.message)
                    setinputerror(error.response.data);
                } else {
                    console.error('An error occurred:', error.message);
                }
            });
    };

    const handleEmpSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${API_URL}employee/Login`, {
            EmailId: EmpformData.email,
            Password: EmpformData.password
        })
            .then((response) => {
                console.log('Login successful:', response.data);

                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.token));
                    localStorage.setItem('role',response.data.role);
                    nabigate("/");
                }
            })
            .catch((error) => {
                // Display error message
                if (error.response && error.response.data) {
                    setempinputerror(error.response.data);
                } else {
                    console.error('An error occurred:', error.message);
                }
            });
    }

    return (
        <>
           <div className="tinted-background" >

                <AuthWrapper>
            <div className='d-flex flex-wrap justify-content-center'>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Admin</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Employee</button>
                    </li>

                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                        <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                              <p className='text-danger'>{inputerror?.message ? inputerror.message : ""}</p>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="Enter your email or username"
                                    autoFocus />
                                <p className='text-danger'>{inputerror?.EmailId?.message ? inputerror.EmailId.message : ""}</p>
                            </div>
                            <div className="mb-3 form-password-toggle">
                                <div className="d-flex justify-content-between">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <Link aria-label="Go to Forgot Password Page" to="/auth/forgetpassword">
                                        <small>Forgot Password?</small>
                                    </Link>
                                </div>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="password"
                                        autoComplete="true"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        name="password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password" />
                                    <span className="input-group-text cursor-pointer"></span>
                                </div>
                                <p className='text-danger'>{inputerror?.Password?.message ? inputerror.Password.message : ""}</p>
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="remember-me"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                            </div>
                        </form>
                        <p className="text-center">
                            <span>Register New Admin </span>
                            <Link aria-label="Go to Register Page" to='/auth/register' className="registration-link">
                                <span>Create an Admin</span>
                            </Link>
                        </p>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                
                    <form id="formAuthentication" className="mb-3" onSubmit={handleEmpSubmit}>
                           <p className='text-danger'>{empinputerror?.message ? empinputerror.message : ""}</p>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={EmpformData.email}
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="Enter your email or username"
                                    autoFocus />
                                <p className='text-danger'>{empinputerror?.EmailId?.message ? empinputerror.EmailId.message : ""}</p>
                            </div>
                            <div className="mb-3 form-password-toggle">
                                <div className="d-flex justify-content-between">
                                    <label className="form-label" htmlFor="password">Password</label>
   
                                </div>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="password"
                                        autoComplete="true"
                                        id="password"
                                        value={EmpformData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        name="password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password" />
                                    <span className="input-group-text cursor-pointer"></span>
                                </div>
                                <p className='text-danger'>{empinputerror?.Password?.message ? empinputerror.Password.message : ""}</p>
                            </div>
                        
                            <div className="mb-3">
                                <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                            </div>
                        </form>
                  

                    </div>
                </div>
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

export default Login