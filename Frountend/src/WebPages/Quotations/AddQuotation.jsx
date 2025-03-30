import axios from 'axios';
import React, { useEffect, useState } from 'react'
import states from '../../data/stateData.json'
import { useNavigate, useParams } from 'react-router-dom';
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;

const AddQuotation = () => {

  const navigate = useNavigate();
  const [input, setInput] = useState({
    Firstname: "", lastname: "", MobileNum: "", VehicleID: "", Price: "", Status: ""
  });
  const [inputError, setInputError] = useState([]);
  const  [Vehicles,setVehicles]=useState([]);
  const { id } = useParams();

  if (id) {
    const displayQuotation = () => {
      axios.get(`${API_URL}viewquotation/` + id, { headers: AuthHeader() }).then((response) => {
        setInput(response.data)
      }).catch((error) => {
        console.log(error)
      });
    }
    useEffect(() => {
      displayQuotation();
    }, [])
  }

  const updatefeilds = (e) => {
    e.persist();
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const displayvehicles=()=>{
    axios.get(`${API_URL}viewvehicles/`, { headers: AuthHeader() }).then((response) => {
      setVehicles(response.data)
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(()=>{
    displayvehicles();
  },[])

  const formData = {
    Firstname: input.Firstname,
    lastname: input.lastname,
    MobileNum: input.MobileNum,
    VehicleID: input.VehicleID,
    Price: input.Price,
    Status: input.Status,
  }

  const UpdateQuotation = () => {
    axios.post(`${API_URL}updatequotation/` + id, formData, { headers: AuthHeader() }).then((response) => {
      navigate("/quotation");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setInputError(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const SaveQuotation = () => {
    axios.post(`${API_URL}addquotation`, formData, { headers: AuthHeader() }).then((response) => {
      console.log(response)
      navigate("/quotation");
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
      UpdateQuotation();
    } else {
      SaveQuotation();
    }
  }
  return (
    <div className="card ">
      <h5 className="card-header">Add Quotation
        <form onSubmit={handlesubmit}>
          <div className='row mt-5'>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='Firstname'
                  value={input.Firstname}
                  onChange={updatefeilds}
                  placeholder="Enter Customer First Name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">First Name</label>
                <p className='text-danger'>{inputError?.Firstname?.message ? inputError.Firstname.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='lastname'
                  value={input.lastname}
                  onChange={updatefeilds}
                  placeholder="Enter Customer Last Name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Last Name</label>
                <p className='text-danger'>{inputError?.lastname?.message ? inputError.lastname.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='MobileNum'
                  value={input.MobileNum}
                  onChange={updatefeilds}
                  placeholder="Enter Mobile Number"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Mobile Number </label>
                <p className='text-danger'>{inputError?.MobileNum?.message ? inputError.MobileNum.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <select class="form-select" id="floatingSelect" name='VehicleID' value={input.VehicleID} onChange={updatefeilds} aria-label="Floating label select example">
                  <option selected>Select the Source</option>
                  {
                    Vehicles.map((vehicle,i)=>(
                      <option value={vehicle._id}>
                         {vehicle.model_name+"      "+vehicle.variant+"         " +vehicle.color}
                    
                       </option>
                    ))
                  }
                </select>
                <label for="floatingSelect">Vehicle</label>
                <p className='text-danger'>{inputError?.VehicleID?.message ? inputError.VehicleID.message : ""}</p>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name='Price'
                  value={input.Price}
                  onChange={updatefeilds}
                  placeholder="Enter Vehicle Price"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Price </label>
                <p className='text-danger'>{inputError?.Price?.message ? inputError.Price.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <select class="form-select" id="floatingSelect" name='Status' value={input.Status} onChange={updatefeilds} aria-label="Floating label select example">
                  <option selected>Select the Source</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <label for="floatingSelect">Status</label>
                <p className='text-danger'>{inputError?.Status?.message ? inputError.Status.message : ""}</p>
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

export default AddQuotation