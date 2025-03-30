import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AuthHeader from '../Accounts/AuthHeader';
import { useNavigate, useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASEURL;
const AddVehicle = () => {
  const navigate = useNavigate();
  const [inputerror, setinputerror] = useState([]);
  const [Vehicleinput, setVehicleinput] = useState({
    model_name: "",
    variant: "",
    color: "",
    stock_quantity: "",
    vin_number: "",
    Price:""
  });

  const updatefeilds = (e) => {
    e.persist();
    console.log(e.target.value);
    setVehicleinput({ ...Vehicleinput, [e.target.name]: e.target.value });

  }
  const formdata = {
    model_name:Vehicleinput.model_name,
    variant:Vehicleinput.variant,
    color:Vehicleinput.color,
    stock_quantity:Vehicleinput.stock_quantity,
    vin_number:Vehicleinput.vin_number,
    Price:Vehicleinput.Price
  }

  const {id}=useParams();
  if (id) {
    const displayVehicle=()=>{
      axios.get(`${API_URL}viewvehicle/`+id, { headers: AuthHeader() }).then((response) => {
     setVehicleinput(response.data)
    }).catch((error) => {
        console.log(error)
    });
    }

    useEffect(()=>{
      displayVehicle()
    },[])
  }


  const UpdateVehicle = () => {
    axios.post(`${API_URL}updatevehicle/`+id, formdata,{headers:AuthHeader()}).then((response) => {
      navigate("/vehicles");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setinputerror(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const SaveVehicle=()=>{
    axios.post(`${API_URL}addvehicle`, formdata,{headers:AuthHeader()}).then((response) => {
      navigate("/vehicles");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setinputerror(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (id) {
      UpdateVehicle();
    } else {
      SaveVehicle();
    }
  }



  return (
    <div className="card ">
      <h5 className="card-header">Add Vehicle
        <form onSubmit={handlesubmit}>
          <div className='row mt-5'>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='model_name'
                  value={Vehicleinput.model_name}
                  onChange={updatefeilds}
                  placeholder="Enter Vehicle Model Name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Model Name</label>
               <p className='text-danger'>{inputerror?.model_name?.message ? inputerror.model_name.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='variant'
                  value={Vehicleinput.variant}
                  onChange={updatefeilds}
                  placeholder="Enter Vehicle Variant name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Variant Name</label>
               <p className='text-danger'>{inputerror?.variant?.message ? inputerror.variant.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='color'
                  value={Vehicleinput.color}
                  onChange={updatefeilds}
                  placeholder="Enter Vehicle Color"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Color Name  </label>
               <p className='text-danger'>{inputerror?.color?.message ? inputerror.color.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  name='stock_quantity'
                  value={Vehicleinput.stock_quantity}
                  onChange={updatefeilds}
                  placeholder="Enter Vehicle Available Stocks"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Stocks </label>
               <p className='text-danger'>{inputerror?.stock_quantity?.message ? inputerror.stock_quantity.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='Price'
                  value={Vehicleinput.Price}
                  onChange={updatefeilds}
                  placeholder="Enter Vehicle Pricee"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Price  </label>
               <p className='text-danger'>{inputerror?.Price?.message ? inputerror.Price.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='vin_number'
                  value={Vehicleinput.vin_number}
                  onChange={updatefeilds}
                  placeholder="Enter Vehicle  Identification Number"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">VIN Number </label>
               <p className='text-danger'>{inputerror?.vin_number?.message ? inputerror.vin_number.message : ""}</p>
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

export default AddVehicle