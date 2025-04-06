import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AuthHeader from '../Accounts/AuthHeader';
import { useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASEURL;

const ViewOrderDetails = () => {
    const [Order, setOrder] = useState({});
    const { id } = useParams();

    const displayOrder = () => {
        axios.get(`${API_URL}viewsale/` + id, { headers: AuthHeader() }).then((response) => {
            setOrder(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        displayOrder()
    }, [])

    const formatIndianCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };
    return (
        <div className="card">
            <h5 className="card-header">Order Details</h5>
            <div className="table-responsive text-nowrap p-5">
                <table class="table table-borderless " >
                    <tbody>
                        <p className='text-primary h3 mx-5 my-3'> Customer Details</p>
                        <tr>
                            <td><p className='display-6'><strong> Customer Name </strong> </p></td> <td> {Order.CustomerName} </td>
                            <td><p className='display-6'><strong> Mobile Number </strong> </p></td> <td> {Order.ModileNumber}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Address,Street  </strong> </p></td> <td> {Order.Address + ", " + Order.Street} </td>
                            <td><p className='display-6'><strong> City  </strong> </p></td> <td> {Order.City}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> State  </strong> </p></td> <td> {Order.State} </td>
                            <td><p className='display-6'><strong> Pin Code  </strong> </p></td> <td> {Order.Pincode}</td>
                        </tr>

                        <p className='text-primary h3 mx-5 my-3'> Order Details</p>
                        <tr>
                            <td><p className='display-6'><strong> Model Name </strong> </p></td> <td> {Order?.VehicleID?.model_name}</td>
                            <td><p className='display-6'><strong> Variant  </strong> </p></td> <td> {Order?.VehicleID?.variant}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Color </strong> </p></td> <td> {Order?.VehicleID?.color}</td>
                            <td><p className='display-6'><strong> Sales Representative </strong> </p></td> <td> {Order?.EmployeeID?.Firstname + " " + Order?.EmployeeID?.lastname}</td>
                        </tr>
                        <p className='text-primary h3 mx-5 my-3'> Billing Details</p>
                        <tr>
                            <td><p className='display-6'><strong>Sub Total</strong></p></td>
                            <td>{formatIndianCurrency(Order.Subtotal)}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong>GST</strong></p></td>
                            <td>{formatIndianCurrency(Order.Tax)}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong>Road Tax</strong></p></td>
                            <td>{formatIndianCurrency(Order.RtoCharge)}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong>Insurance</strong></p></td>
                            <td>{formatIndianCurrency(Order.Insurance)}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong>Grand Total</strong></p></td>
                            <td>{formatIndianCurrency(Order.Total)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewOrderDetails