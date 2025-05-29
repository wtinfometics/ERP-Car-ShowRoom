import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AuthHeader from '../Accounts/AuthHeader';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
const API_URL = import.meta.env.VITE_API_BASEURL;
const ViewQuotation = () => {
    const [Quotation, setQuotation] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const displayQuotation = () => {
        axios.get(`${API_URL}viewquotation/` + id, { headers: AuthHeader() }).then((response) => {
            setQuotation(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        const loadData = async () => {
            await displayQuotation(); // Call your data-fetching function

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
        <div className="card">
            <h5 className="card-header">Quotation Details</h5>
            <div className="table-responsive text-nowrap p-5">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td><p className='display-6'><strong> Customer Name </strong> </p></td> <td> {Quotation.Firstname + " " + Quotation.lastname} </td>
                            <td><p className='display-6'><strong> Mobile Number </strong> </p></td> <td> {Quotation.MobileNum}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Car name </strong> </p></td> <td> {Quotation?.VehicleID?.model_name}</td>
                            <td><p className='display-6'><strong> Color </strong> </p></td> <td> {Quotation?.VehicleID?.color}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Variant </strong> </p></td> <td> {Quotation?.VehicleID?.variant}</td>
                        </tr>
                        <tr>
                            <td><p className='display-6'><strong> Price </strong> </p></td> <td> {Quotation.Price}</td>
                            <td><p className='display-6'><strong> Status </strong> </p></td> <td>
                                <span className={`badge ${getStockBadgeClass(Quotation.Status)} me-1`}>
                                    {Quotation.Status}
                                </span>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewQuotation