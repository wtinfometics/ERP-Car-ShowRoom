import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AuthHeader from '../Accounts/AuthHeader';
import { useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASEURL;
const ViewCustomer = () => {
        const [Customer, setCustomer] = useState({}); 
    const {id}=useParams();


      const displayCustomer=()=>{
        axios.get(`${API_URL}viewcustomer/`+id, { headers: AuthHeader() }).then((response) => {
            setCustomer(response.data)
            console.log(response.data)
         }).catch((error) => {
             console.log(error)
         });
      }
      useEffect(()=>{
        displayCustomer();
      },[])
    
    return (
        <div className="card">
            <h5 className="card-header">Vehicle Details</h5>
            <div className="table-responsive text-nowrap p-5">
            <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td><p className='display-6'><strong> Customer Name </strong> </p></td> <td> {Customer.Firstname + " " + Customer.lastname} </td>
                            <td><p className='display-6'><strong> Mobile Number </strong> </p></td> <td> {Customer.MobileNum}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Job Profile  </strong> </p></td> <td> {Customer.Job } </td>
                            <td><p className='display-6'><strong> Price Range  </strong> </p></td> <td> {Customer.MinRange+"-"+Customer.MaxRange}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Sales Representative  </strong> </p></td> <td> {Customer?.EmployeeID?.Firstname+"-"+Customer?.EmployeeID?.lastname}</td>
                            <td><p className='display-6'><strong> Source </strong> </p></td> <td> {Customer.source}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Address   </strong> </p></td> <td> {Customer.Address} </td>
                            <td><p className='display-6'><strong> Street   </strong> </p></td> <td> {Customer.Street}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> City </strong> </p></td> <td> {Customer.City}</td>
                            <td><p className='display-6'><strong> State </strong> </p></td> <td> {Customer.State}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Pin Code </strong> </p></td> <td> {Customer.Pincode}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewCustomer