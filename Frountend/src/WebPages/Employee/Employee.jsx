import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;
const role = localStorage.getItem("role");

const Employee = () => {
    const [Employees, setEmployees] = useState([]);

    const [currentpage, setcurrentpage] = useState(1);
    const recordsperpage = 10;
    const lastindex = currentpage * recordsperpage;
    const fristindex = lastindex - recordsperpage;
    const PaginatedEmployee = Employees.slice(fristindex, lastindex);
    const npages = Math.ceil(Employees.length / recordsperpage);
    const numberofpages = [...Array(npages + 1).keys()].slice(1);

    const DisplayEmployees = (e) => {
        axios.get(`${API_URL}ViewEmployees`, { headers: AuthHeader() }).then((response) => {
            setEmployees(response.data.reverse());
        }).catch((error) => {
            console.log(error)
        });
    }
    const deketeEmployee = (e, id) => {
        axios.delete(`${API_URL}DeleteEmployee/` + id, { headers: AuthHeader() }).then((response) => {
            DisplayEmployees();
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        DisplayEmployees();
    }, [])

    function previouspaginate() {
        if (currentpage !== 1) {
            setcurrentpage(currentpage - 1)
        }
    }

    function changeCurrentPagepaginate(pagenum) {
        setcurrentpage(pagenum)
    }

    function nextpagiginate() {
        if (currentpage !== npages) {
            setcurrentpage(currentpage + 1)
        }
    }
    return (
        <>
            <div className="card">
                <h5 className="card-header">Customer
                    {!role === "admin" ? null : (
                        <>
                            <Link to={"/addemployee"}> <button className='btn btn-primary btn-sm mx-3'>Add New</button> </Link>
                        </>
                    )}
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Mobile Number</th>
                                <th>E-mail ID</th>
                                <th>Designation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {
                                PaginatedEmployee.map((employee) => (
                                    <tr key={employee._id}>
                                        <td>
                                            <span className="fw-medium">{employee.Firstname + "  " + employee.lastname}</span>
                                        </td>
                                        <td>{employee.MobileNum}</td>
                                        <td>
                                            {employee.EmailId}
                                        </td>
                                        <td>
                                            {employee.role}
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    {!role === "admin" ? null : (
                                                        <>
                                                            <Link to={"/editemployee/" + employee._id} aria-label="dropdown action option" className="dropdown-item"
                                                            ><i className="bx bx-edit-alt me-1"></i> Edit </Link>

                                                            <a aria-label="dropdown action option" className="dropdown-item" onClick={(e) => deketeEmployee(e, employee._id)}>
                                                                <i className="bx bx-trash me-1"></i> Delete
                                                            </a>
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='d-flex flex-wrap justify-content-center mt-5'>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className={currentpage === 1 ? "page-item las disabled" : "page-item last"} onClick={previouspaginate} >
                                    <a aria-label="pagination link" className="page-link" href="#"
                                    ><i className="tf-icon bx bx-chevrons-left"></i
                                    ></a>
                                </li>
                                {
                                    numberofpages.map((num, i) => (
                                        <li className={currentpage === num ? "page-item active" : "page-item"} onClick={() => changeCurrentPagepaginate(num)} key={i}>
                                            <a aria-label="pagination link" className="page-link" >1</a>
                                        </li>
                                    ))
                                }
                                <li className={currentpage === npages ? "page-item las disabled" : "page-item last"} onClick={nextpagiginate} >
                                    <a aria-label="pagination link" className="page-link" href="#"
                                    ><i className="tf-icon bx bx-chevrons-right"></i
                                    ></a>
                                </li>

                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Employee