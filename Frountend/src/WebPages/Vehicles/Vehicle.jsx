import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;
const role = localStorage.getItem("role");
const Vehicle = () => {
    const [Vehicles, setVehicle] = useState([]);

    const [currentpage, setcurrentpage] = useState(1);
    const recordsperpage = 30;
    const lastindex = currentpage * recordsperpage;
    const fristindex = lastindex - recordsperpage;
    const PaginatedVehicles = Vehicles.slice(fristindex, lastindex);
    const npages = Math.ceil(Vehicles.length / recordsperpage);
    const numberofpages = [...Array(npages + 1).keys()].slice(1);

    const Displaveyhicles = (e) => {
        axios.get(`${API_URL}viewvehicles`, { headers: AuthHeader() }).then((response) => {
            setVehicle(response.data.reverse());
        }).catch((error) => {
            console.log(error)
        });
    }
    const deketeVehicle=(e,id)=>{
        axios.delete(`${API_URL}deletevehicle/`+id, { headers: AuthHeader() }).then((response) => {
            Displaveyhicles();
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        Displaveyhicles();
    }, [])

    const getStockBadgeClass = (quantity) => {
        switch (true) {
            case quantity < 10:
                return "bg-label-danger";   // Red for low stock
            case quantity < 25:
                return "bg-label-warning";  // Yellow for medium stock
            default:
                return "bg-label-success";  // Green for high stock
        }
    };

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
                <h5 className="card-header">Vehicles
                    <Link to={"/addvehicle"}> <button className='btn btn-primary btn-sm mx-3'>Add New</button> </Link>
                </h5>
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Model Name </th>
                                <th>Variant </th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {
                                PaginatedVehicles.map((vehicle) => (
                                    <tr key={vehicle._id}>
                                        <td>
                                            <span className="fw-medium">{vehicle.model_name}</span>
                                        </td>
                                        <td>{vehicle.variant}</td>
                                        <td>
                                            {vehicle.color}
                                        </td>
                                        <td>
                                            {formatIndianCurrency(vehicle.Price)}
                                        </td>
                                        <td>
                                            <span className={`badge ${getStockBadgeClass(vehicle.stock_quantity)} me-1`}>
                                                {vehicle.stock_quantity}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button aria-label='Click me' type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                <Link to={"/viewvehicles/"+vehicle._id} aria-label="dropdown action option" className="dropdown-item" 
                                                    ><i className="bx bx-edit-alt me-1"></i> View </Link>
                                                    <Link to={"/editvehicle/"+vehicle._id} aria-label="dropdown action option" className="dropdown-item" 
                                                    ><i className="bx bx-edit-alt me-1"></i> Edit </Link>
                                                    {role == "sales-ref" ? null : (
                                                        <a aria-label="dropdown action option" className="dropdown-item" onClick={(e)=>deketeVehicle(e,vehicle._id)}>
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
                                <li className={currentpage === 1 ?"page-item las disabled":"page-item last"}   onClick={previouspaginate} >
                                    <a aria-label="pagination link" className="page-link" href="#"
                                    ><i className="tf-icon bx bx-chevrons-left"></i
                                    ></a>
                                </li>
                                {
                                    numberofpages.map((num,i)=>(
                                        <li className={currentpage === num ?"page-item active":"page-item"} onClick={() => changeCurrentPagepaginate(num)} key={i}>
                                        <a aria-label="pagination link" className="page-link" >1</a>
                                    </li>
                                    ))
                                }
                                <li className={currentpage === npages ?"page-item las disabled":"page-item last"} onClick={nextpagiginate} >
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

export default Vehicle  