import axios from 'axios';
import React, { useEffect, useState } from 'react'
import states from '../../data/stateData.json'
import { useNavigate, useParams } from 'react-router-dom';
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;
const AddOrder = () => {
  const navigate = useNavigate();
  const [Vehicles, setVehicle] = useState([]);
  const [Employee, setEmployee] = useState([]);
  const [input, setInput] = useState({
    VehicleID: "", CustomerName: "", ModileNumber: "", Address: "", Street: "", City: "",EmployeeID:"",
    State: "", Pincode: "", Subtotal: "", RtoCharge: "", Insurance: "", Tax: "", Total: "",
  })
  const [prices, setprices] = useState();
  const [inputError, setInputError] = useState([]);
  const { id } = useParams();

  if (id) {
    const displayorder = () => {
      axios.get(`${API_URL}viewsale/` + id, { headers: AuthHeader() }).then((response) => {
        setInput(response.data)
      }).catch((error) => {
        console.log(error)
      });
    }
    useEffect(() => {
      displayorder();
    }, [])
  }

  const displaycar = () => {
    axios.get(`${API_URL}viewvehicles`, { headers: AuthHeader() }).then((response) => {
      setVehicle(response.data.reverse());
    }).catch((error) => {
      console.log(error)
    });
  }

  const displayEmployee = () => {
    axios.get(`${API_URL}getallsalesref`, { headers: AuthHeader() }).then((response) => {
      setEmployee(response.data.reverse());
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    displaycar();
    displayEmployee();
    displayVehicle();
  }, [input.VehicleID])

  const updatefeilds = (e) => {
    e.persist();
    // console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  }


  const displayVehicle = () => {
    if (input.VehicleID) {
      axios.get(`${API_URL}calculatevehicleprice/` + input.VehicleID, { headers: AuthHeader() }).then((response) => {
        setInput(response.data)

      }).catch((error) => {
        console.log(error)
      });
    }
  }



  const formData = {
    VehicleID: input.VehicleID,
    CustomerName: input.CustomerName,
    ModileNumber: input.ModileNumber,
    EmployeeID:input.EmployeeID,
    Address: input.Address,
    Street: input.Street,
    City: input.City,
    State: input.State,
    Pincode: input.Pincode,
    Subtotal: input.Subtotal,
    RtoCharge: input.RtoCharge,
    Insurance: input.Insurance,
    Tax: input.Tax,
    Total: input.Total,
  }

  console.log(formData)
  const UpdateOrder = () => {
    axios.post(`${API_URL}updatesale/` + id, formData, { headers: AuthHeader() }).then((response) => {
      navigate("/");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setInputError(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const SaveOrder = () => {
    axios.post(`${API_URL}addsales`, formData, { headers: AuthHeader() }).then((response) => {
      console.log(response)
      navigate("/");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setInputError(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (id) {
      UpdateOrder();
    } else {
      SaveOrder();
    }
  }

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };
  return (
    <div className="card ">
      <h5 className="card-header">Add New Order
        <form onSubmit={handlesubmit}>
          <div className='row mt-5'>
            <div className='col-lg-12'>
              <div className="form-floating ">
                <div class="form-floating">
                  <select class="form-select" id="floatingSelect" name='VehicleID' value={input.VehicleID} onChange={updatefeilds} aria-label="Floating label select example">
                    <option selected>Select the Vehicles</option>
                    {
                      Vehicles.map((vehicle, i) => (
                        <option value={vehicle._id}>
                          {vehicle.model_name + "      " + vehicle.variant + "         " + vehicle.color + "    " + "RS " + formatIndianCurrency(vehicle.Price)}

                        </option>
                      ))
                    }
                  </select>
                  <label for="floatingSelect">Vehicle</label>
                </div>
                <p className='text-danger'>{inputError?.VehicleID?.message ? inputError.VehicleID.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='CustomerName'
                  value={input.CustomerName}
                  onChange={updatefeilds}
                  placeholder="Enter Customer Name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Customer Name</label>
                <p className='text-danger'>{inputError?.CustomerName?.message ? inputError.CustomerName.message : ""}</p>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='ModileNumber'
                  value={input.ModileNumber}
                  onChange={updatefeilds}
                  placeholder="Enter Mobile Number"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Mobile Number </label>
                <p className='text-danger'>{inputError?.ModileNumber?.message ? inputError.ModileNumber.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
            <div className="form-floating ">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" name='EmployeeID' value={input.EmployeeID} onChange={updatefeilds} aria-label="Floating label select example">
                  <option selected>Select the Sales Representative</option>
                  {
                    Employee.map((salesref)=>(
                      <option value={salesref._id}>{salesref.Firstname+" "+salesref.lastname} </option>
                    ))
                  }

                </select>
                <label for="floatingSelect">Leads From</label>
              </div>
             <p className='text-danger'>{inputError?.EmployeeID?.message ? inputError.EmployeeID.message : ""}</p>
            </div>
          </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='Address'
                  value={input.Address}
                  onChange={updatefeilds}
                  placeholder="Enter Address "
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Address </label>
                <p className='text-danger'>{inputError?.Address?.message ? inputError.Address.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='Street'
                  value={input.Street}
                  onChange={updatefeilds}
                  placeholder="Enter Street Name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Street </label>
                <p className='text-danger'>{inputError?.Street?.message ? inputError.Street.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='City'
                  value={input.City}
                  onChange={updatefeilds}
                  placeholder="Enter City Name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">City </label>
                <p className='text-danger'>{inputError?.City?.message ? inputError.City.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <select class="form-select" id="floatingSelect" name='State' value={input.State} onChange={updatefeilds} aria-label="Floating label select example">
                  <option selected>Select the State</option>
                  {
                    states.map((state, i) => (
                      <option value={state.state}>{state.state}</option>
                    ))
                  }
                </select>
                <label for="floatingSelect">State</label>
                <p className='text-danger'>{inputError?.State?.message ? inputError.State.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  name='Pincode'
                  value={input.Pincode}
                  onChange={updatefeilds}
                  placeholder="Enter Pin Code"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">PinCode </label>
                <p className='text-danger'>{inputError?.Pincode?.message ? inputError.Pincode.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-9'>

              <div class="container ">
                <div class="-lg p-4">
                  <h3 class="text-start mb-4 ml-3">Price Information</h3>

                  <div class="row mb-3">
                    <div class="col-6">Ex-Showroom Price:</div>
                    <div class="col-6 text-end">₹ <span id="subtotal">{formatIndianCurrency(input.Subtotal)}</span></div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-6">Insurance:</div>
                    <div class="col-6 text-end">₹ <span id="insurance"> {formatIndianCurrency(input.Insurance)} </span></div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-6">Tax:</div>
                    <div class="col-6 text-end">₹ <span id="tax"> {formatIndianCurrency(input.Tax)} </span></div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-6">RTO Charge:</div>
                    <div class="col-6 text-end">₹ <span id="rto"> {formatIndianCurrency(input.RtoCharge)} </span></div>
                  </div>

                  <hr />

                  <div class="row fw-bold">
                    <div class="col-6">Total:</div>
                    <div class="col-6 text-end text-success">₹ <span id="total"> {formatIndianCurrency(input.Total)} </span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-12 mt-5'>
              <button type='submit' className='btn btn-primary btn-lg m-1 shadow'>Submit</button>
              <button type='reset' className='btn btn-secondary btn-lg m-1 shadow'>Reset</button>
            </div>

          </div>
        </form>

      </h5>
    </div>
  )
}

export default AddOrder