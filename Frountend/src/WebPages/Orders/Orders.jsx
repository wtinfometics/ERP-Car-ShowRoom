import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthHeader from '../Accounts/AuthHeader';
import Spinner from '../../components/Spinner/Spinner';
const API_URL = import.meta.env.VITE_API_BASEURL;
const role = localStorage.getItem("role");
const Orders = () => {
    const [Orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentpage, setcurrentpage] = useState(1);
    const recordsperpage = 10;
    const lastindex = currentpage * recordsperpage;
    const fristindex = lastindex - recordsperpage;
    const PaginatedOrders = Orders.slice(fristindex, lastindex);
    const npages = Math.ceil(Orders.length / recordsperpage);
    const numberofpages = [...Array(npages + 1).keys()].slice(1);

    const route=role=="sales-ref"?"GetOrdersOfEmployee":"viewsales";
    const DisplayOrders = (e) => {
        axios.get(`${API_URL}${route}`, { headers: AuthHeader() }).then((response) => {
            setOrders(response.data.reverse());
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }
    const deketeOrder = (e, id) => {
        axios.delete(`${API_URL}deletesale/` + id, { headers: AuthHeader() }).then((response) => {
            DisplayOrders();
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
              const loadData = async () => {
            await DisplayOrders(); // Call your data-fetching function

            // Wait at least 2 seconds before setting loading to false
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        loadData();
    }, [])

        if (loading) {
        return <Spinner />;
    }

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

    const formatIndianCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };
    return (
        <>
            <div className="card">
                <h5 className="card-header">Orders
                    <Link to={"/placeorder"}> <button className='btn btn-primary btn-sm mx-3'>Add New</button> </Link>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Vehicle </th>
                                <th>Variant</th>
                                <th>Price</th>
                                <th>Lead From</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">

                            {
                                PaginatedOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <span className="fw-medium">{order.CustomerName}</span>
                                        </td>
                                        <td>{order?.VehicleID?.model_name}</td>
                                        <td>
                                            {order?.VehicleID?.variant}
                                        </td>
                                        <td>
                                            {formatIndianCurrency(order.Total)}
                                        </td>
                                        <td>
                                            {order?.EmployeeID?.Firstname+" "+order?.EmployeeID?.lastname}
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                <Link to={"/viewordersdetails/" + order._id} aria-label="dropdown action option" className="dropdown-item"
                                                    ><i className="bx bx-edit-alt me-1"></i> View </Link>
                                                    {/* <Link to={"/updateorder/" + order._id} aria-label="dropdown action option" className="dropdown-item"
                                                    ><i className="bx bx-edit-alt me-1"></i> Edit </Link> */}
                                                    {  
                                                    role == "sales-ref" ? "" : (
                                                        <a aria-label="dropdown action option" className="dropdown-item" onClick={(e) => deketeOrder(e, order._id)}>
                                                            <i className="bx bx-trash me-1"></i> Delete
                                                        </a>
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

export default Orders