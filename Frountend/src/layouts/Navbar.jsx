import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_BASEURL;
const role = localStorage.getItem("role");
import AuthHeader from '../WebPages/Accounts/AuthHeader';
const Navbar = () => {
  const [user,setUser]=useState([]);
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.reload();
}

const DisplayUser = (e) => {

  if (role =="admin") {
    axios.get(`${API_URL}getadminbytoken`, { headers: AuthHeader() }).then((response) => {
      setUser(response.data);
    }).catch((error) => {
        console.log(error)
    });
  } else {
    axios.get(`${API_URL}getEmployeebytoken`, { headers: AuthHeader() }).then((response) => {
      setUser(response.data);
    }).catch((error) => {
        console.log(error)
    });
  }

}
useEffect(() => {
  DisplayUser();
}, [])

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar">
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a aria-label='toggle for sidebar' className="nav-item nav-link px-0 me-xl-4" href="#">
          <i className="bx bx-menu bx-sm"></i>
        </a>
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a aria-label='dropdown profile avatar' className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
              <div className="avatar avatar-online">
                <img src="../assets/img/avatars/profil1.jpg" className="w-px-40 h-auto rounded-circle" alt="avatar-image" aria-label='Avatar Image'/>
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a aria-label='go to profile' className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img src="../assets/img/avatars/profil1.jpg" className="w-px-40 h-auto rounded-circle" alt='avatar-image' aria-label='Avatar Image' />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-medium d-block">{user.Firstname + " "+ user.lastname} </span>
                      <small className="text-muted">{role}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
          
              <li onClick={logout}>
                <a aria-label='click to log out' className="dropdown-item" href="#">
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;