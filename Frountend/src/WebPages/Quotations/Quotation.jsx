import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;
const role = localStorage.getItem("role");
const Quotation = () => {
    const [Quotations, setQuotations] = useState([]);

    const [currentpage, setcurrentpage] = useState(1);
    const recordsperpage = 10;
    const lastindex = currentpage * recordsperpage;
    const fristindex = lastindex - recordsperpage;
    const PaginatedQuotations = Quotations.slice(fristindex, lastindex);
    const npages = Math.ceil(Quotations.length / recordsperpage);
    const numberofpages = [...Array(npages + 1).keys()].slice(1);

    const DisplayQuotation = (e) => {
        axios.get(`${API_URL}viewquotation`, { headers: AuthHeader() }).then((response) => {
            console.log(response.data)
            setQuotations(response.data.reverse());
        }).catch((error) => {
            console.log(error)
        });
    }
    const deketeQuotation = (e, id) => {
        axios.delete(`${API_URL}deletequotation/` + id, { headers: AuthHeader() }).then((response) => {
            DisplayQuotation();
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        DisplayQuotation();
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

    const getStockBadgeClass = (status) => {
        switch (true) {
            case status == "rejected":
                return "bg-label-danger";  
            case status == "pending":
                return "bg-label-warning";  
            case status == "approved":
                return "bg-label-success"; 
            default:
                return "bg-label-primary";  
        }
    };

    const formatIndianCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };
    return (
        <>
            <div className="card">
                <h5 className="card-header">Quotation
                    <Link to={"/addquotation"}> <button className='btn btn-primary btn-sm mx-3'>Add New</button> </Link>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Vehicle Name </th>
                                <th>Variant</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {
                                PaginatedQuotations.map((quotation) => (
                                    <tr key={quotation._id}>
                                        <td>
                                            <span className="fw-medium">{quotation.Firstname + "  " + quotation.lastname}</span>
                                        </td>
                                        <td>{quotation.MobileNum}</td>
                                        <td>
                                            {quotation.VehicleID.model_name}
                                        </td>
                                        <td>
                                            {formatIndianCurrency(quotation.Price)} 
                                        </td>
                                        <td>
                                            <span className={`badge ${getStockBadgeClass(quotation.Status)} me-1`}>
                                                {quotation.Status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link to={"/viewquotation/" + quotation._id} aria-label="dropdown action option" className="dropdown-item"
                                                    ><i className="bx bx-edit-alt me-1"></i> View </Link>
                                                    <Link to={"/editquotation/" + quotation._id} aria-label="dropdown action option" className="dropdown-item"
                                                    ><i className="bx bx-edit-alt me-1"></i> Edit </Link>
                                                    {role === "sales-ref" ? null :(
                                                        <>
                                                            <a aria-label="dropdown action option" className="dropdown-item" onClick={(e) => deketeQuotation(e, quotation._id)}>
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

export default Quotation