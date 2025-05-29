import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AuthHeader from '../Accounts/AuthHeader';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
const API_URL = import.meta.env.VITE_API_BASEURL;

const ViewVehicles = () => {
    const [Vehicle, setVehicle] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const displayVehicle = () => {
        axios.get(`${API_URL}viewvehicle/` + id, { headers: AuthHeader() }).then((response) => {
            setVehicle(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        const loadData = async () => {
            await displayVehicle(); // Call your data-fetching function

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

    const formatIndianCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };
    return (
        <>
            <div className="card">
                <h5 className="card-header">Vehicle Details</h5>
                <div className="table-responsive text-nowrap p-5">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td><p className='display-6'><strong> Model Name </strong> </p></td> <td> {Vehicle.model_name} </td>
                                <td><p className='display-6'><strong> VIN Number </strong> </p></td> <td> {Vehicle.vin_number}</td>
                            </tr>
                            <tr>
                                <td><p className='display-6'><strong> Variant </strong> </p></td> <td> {Vehicle.variant}</td>
                                <td><p className='display-6'><strong> Color </strong> </p></td> <td> {Vehicle.color}</td>
                            </tr>
                            <tr>
                                <td><p className='display-6'><strong> Stock </strong> </p></td> <td> {Vehicle.stock_quantity}</td>
                                <td><p className='display-6'><strong> Price </strong> </p></td> <td> {formatIndianCurrency(Vehicle.Price)}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewVehicles