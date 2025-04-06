import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;
const role = localStorage.getItem("role");
const AdminDashboard = () => {
    const [Vehicles, setVehicle] = useState([]);
    const [Leads, setLeads] = useState([]);
    const [Service, setService] = useState([]);
    const [Sales, setSales] = useState([]);

    const PaginatedOrders = Sales.slice(0, 5);
    const DisplayVehicles = (e) => {
        axios.get(`${API_URL}viewvehicles`, { headers: AuthHeader() }).then((response) => {
            setVehicle(response.data.reverse());
        }).catch((error) => {
            console.log(error)
        });
    }

    const DisplayCustomerPerMonth = (e) => {
        axios.get(`${API_URL}customerpermonth`, { headers: AuthHeader() }).then((response) => {
            setLeads(response.data.reverse());
        }).catch((error) => {
            console.log(error)
        });
    }

    const DisplayService = (e) => {
        axios.get(`${API_URL}servicespermonth`, { headers: AuthHeader() }).then((response) => {
            setService(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    const DisplaySales = (e) => {
        axios.get(`${API_URL}salespermonth`, { headers: AuthHeader() }).then((response) => {
            setSales(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }


    useEffect(() => {
        DisplayCustomerPerMonth();
        DisplayVehicles();
        DisplayService();
        DisplaySales();
        dashboardAnalitics();
    }, [])

    const formatIndianCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };
    return (
        <>
            <div className="row">

                <div className="col-lg-6 col-md-6 order-1">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                      <i class='bx bxs-user text-info' style={{fontSize:"3rem"}}></i>
                                        </div>
                                        <div>
                                            <h3 className="card-title mb-2 text-center"> {Leads.length} </h3>
                                            <h3 className="fw-medium d-block mb-1 text-info text-center" ><strong>  Leads </strong>  </h3>
                                            <span className="fw-medium d-block mb-1 text-center">Total Leads In this Month</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                        <i class='bx bxs-car text-warning' style={{fontSize:"3rem"}}></i>
                                        </div>
                                        <div>
                                            <h3 className="card-title mb-2 text-center"> {Vehicles.length} </h3>
                                            <h3 className="fw-medium d-block mb-1 text-warning text-center" ><strong>  Vehicles </strong>  </h3>
                                            <span className="fw-medium d-block mb-1 text-center">Total Vehicles Available</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 order-1">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                        <i class='bx bxs-car-garage text-primary' style={{fontSize:"3rem"}}></i>
                                        </div>
                                        <div>
                                            <h3 className="card-title mb-2 text-center"> {Service.length} </h3>
                                            <h3 className="fw-medium d-block mb-1 text-primary text-center" ><strong>  Services </strong>  </h3>
                                            <span className="fw-medium d-block mb-1 text-center">Total Services In this Month</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                        <i class='bx bxs-category text-success' style={{fontSize:"3rem"}} ></i>
                                        </div>
                                        <div>
                                            <h3 className="card-title mb-2 text-center"> {Sales.length} </h3>
                                            <h3 className="fw-medium d-block mb-1 text-success text-center" ><strong>  Orders </strong>  </h3>
                                            <span className="fw-medium d-block mb-1 text-center">Number of Order In this Month</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className="card">
                <h5 className="card-header">This Month Orders
                    <Link to={"/orders"}> <button className='btn btn-primary btn-sm mx-3'>View All</button> </Link>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Vehicle </th>
                                <th>Variant</th>
                                <th>Price</th>
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
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>


                </div>
            </div>

        </>
    )
}

export default AdminDashboard