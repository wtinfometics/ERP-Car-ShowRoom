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

        const PaginatedOrders = Sales.slice(0,5);
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
        axios.get(`${API_URL}customerpermonth`, { headers: AuthHeader() }).then((response) => {
            setService(response.data);
            console.log(response,data)
        }).catch((error) => {
            console.log(error)
        });
    }

    const DisplaySales = (e) => {
        axios.get(`${API_URL}salespermonth`, { headers: AuthHeader() }).then((response) => {
            setSales(response.data);
            console.log(response,data)
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
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/chart-success.png"
                                                alt="chart success"
                                                className="rounded"
                                            />
                                        </div>

                                    </div>
                                    <span className="fw-medium d-block mb-1">Leads</span>
                                    <h3 className="card-title mb-2"> {Leads.length} </h3>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/chart-success.png"
                                                alt="chart success"
                                                className="rounded"
                                            />
                                        </div>

                                    </div>
                                    <span className="fw-medium d-block mb-1">Vehicles</span>
                                    <h3 className="card-title mb-2"> {Vehicles.length}  </h3>
                                    <small className="text-success fw-medium">
                                     
                                    </small>
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
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/chart-success.png"
                                                alt="chart success"
                                                className="rounded"
                                            />
                                        </div>

                                    </div>
                                    <span className="fw-medium d-block mb-1">Services</span>
                                    <h3 className="card-title mb-2"> {Service.length} </h3>
 
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/chart-success.png"
                                                alt="chart success"
                                                className="rounded"
                                            />
                                        </div>

                                    </div>
                                    <span className="fw-medium d-block mb-1">sale</span>
                                    <h3 className="card-title mb-2">{Sales.length}</h3>

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
                                                    <td>{order.VehicleID.model_name}</td>
                                                    <td>
                                                        {order.VehicleID.variant}
                                                    </td>
                                                    <td>
                                                        {order.Total}
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