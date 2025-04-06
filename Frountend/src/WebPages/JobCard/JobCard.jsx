import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;
const role = localStorage.getItem("role");
const JobCard = () => {
    const [JobCards, setJobCards] = useState([]);

    const [currentpage, setcurrentpage] = useState(1);
    const recordsperpage = 10;
    const lastindex = currentpage * recordsperpage;
    const fristindex = lastindex - recordsperpage;
    const PaginatedJobCards = JobCards.slice(fristindex, lastindex);
    const npages = Math.ceil(JobCards.length / recordsperpage);
    const numberofpages = [...Array(npages + 1).keys()].slice(1);

    const DisplayJobCards = (e) => {
        axios.get(`${API_URL}viewjobcards`, { headers: AuthHeader() }).then((response) => {
            setJobCards(response.data.reverse());
        }).catch((error) => {
            console.log(error)
        });
    }
    const deketeJobCards = (e, id) => {
        axios.delete(`${API_URL}deletejobcard/` + id, { headers: AuthHeader() }).then((response) => {
            DisplayJobCards();
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        DisplayJobCards();
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
                <h5 className="card-header">Job card
                   <Link to={"/addjobcard"}> <button className='btn btn-primary btn-sm mx-3'>Add New</button> </Link>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Vehicle Name </th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            <tr>
                                <td>
                                    <span className="fw-medium">Vikas Kamat</span>
                                </td>
                                <td>987654321</td>
                                <td>
                                    10 Lack - 15 Lack
                                </td>
                                <td><span className="badge bg-label-primary me-1">Walk In</span></td>
                                <td>
                                    <div className="dropdown">
                                        <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                            ><i className="bx bx-edit-alt me-1"></i> Edit</a
                                            >
                                            <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                            ><i className="bx bx-trash me-1"></i> Delete</a
                                            >
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="fw-medium">Vikas Kamat</span>
                                </td>
                                <td>987654321</td>
                                <td>
                                    10 Lack - 15 Lack
                                </td>
                                <td><span className="badge bg-label-primary me-1">Walk In</span></td>
                                <td>
                                    <div className="dropdown">
                                        <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                            ><i className="bx bx-edit-alt me-1"></i> Edit</a
                                            >
                                            <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                            ><i className="bx bx-trash me-1"></i> Delete</a
                                            >
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="fw-medium">Vikas Kamat</span>
                                </td>
                                <td>987654321</td>
                                <td>
                                    10 Lack - 15 Lack
                                </td>
                                <td><span className="badge bg-label-success me-1">Walk In</span></td>
                                <td>
                                    <div className="dropdown">
                                        <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                            ><i className="bx bx-edit-alt me-1"></i> Edit</a
                                            >
                                            <a aria-label="dropdown action option" className="dropdown-item" href="#"
                                            ><i className="bx bx-trash me-1"></i> Delete</a
                                            >
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='d-flex flex-wrap justify-content-center mt-5'>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item first">
                                    <a aria-label="pagination link" className="page-link" href="#"
                                    ><i className="tf-icon bx bx-chevrons-left"></i
                                    ></a>
                                </li>
                                <li className="page-item prev">
                                    <a aria-label="pagination link" className="page-link" href="#"
                                    ><i className="tf-icon bx bx-chevron-left"></i
                                    ></a>
                                </li>
                                <li className="page-item">
                                    <a aria-label="pagination link" className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item">
                                    <a aria-label="pagination link" className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item active">
                                    <a aria-label="pagination link" className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <a aria-label="pagination link" className="page-link" href="#">4</a>
                                </li>
                                <li className="page-item">
                                    <a aria-label="pagination link" className="page-link" href="#">5</a>
                                </li>
                                <li className="page-item next">
                                    <a aria-label="pagination link" className="page-link" href="#"
                                    ><i className="tf-icon bx bx-chevron-right"></i
                                    ></a>
                                </li>
                                <li className="page-item last">
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

export default JobCard