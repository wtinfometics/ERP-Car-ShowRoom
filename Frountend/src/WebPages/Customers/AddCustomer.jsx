import axios from 'axios';
import React, { useEffect, useState } from 'react'
import states from '../../data/stateData.json'
import { useNavigate, useParams } from 'react-router-dom';
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;
const AddCustomer = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    Firstname: "", lastname: "", MobileNum: "", source: "", MinRange: "",Job:"",EmployeeID:"",
    MaxRange: "", Address: "", Street: "", City: "", State: "", Pincode: "",
  })
  const [inputError, setInputError] = useState([]);
  const [salesrefs, setsalesrefs] = useState([]);
  const {id}=useParams();

  if (id) {
    const displayCustomer=()=>{
      axios.get(`${API_URL}viewcustomer/`+id, { headers: AuthHeader() }).then((response) => {
        setInput(response.data)
       }).catch((error) => {
           console.log(error)
       });
    }
    useEffect(()=>{
      displayCustomer();
    },[])
  }

  const GetSalesRef=()=>{
    axios.get(`${API_URL}getallsalesref`, { headers: AuthHeader() }).then((response) => {
      console.log(response)
      setsalesrefs(response.data)
     }).catch((error) => {
         console.log(error)
     });
  }
  useEffect(()=>{
GetSalesRef();
  },[])

  const updatefeilds = (e) => {
    e.persist();
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  
  const formData={
    Firstname:input.Firstname,
    lastname:input.lastname,
    MobileNum:input.MobileNum,
    source:input.source,
    Job:input.Job,
    EmployeeID:input.EmployeeID,
    MinRange:input.MinRange,
    MaxRange:input.MaxRange,
    Address:input.Address,
    Street:input.Street,
    City:input.City,
    State:input.State,
    Pincode:input.Pincode,
  }

  const UpdateCustomer = () => {
    axios.post(`${API_URL}updatecustomer/`+id, formData,{headers:AuthHeader()}).then((response) => {
      navigate("/");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setInputError(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const SaveCustomer =()=>{
    axios.post(`${API_URL}addcustomer`, formData,{headers:AuthHeader()}).then((response) => {
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

const handlesubmit=(e)=>{
  e.preventDefault(); 
  if (id) {
    UpdateCustomer();
  } else {
    SaveCustomer();
  }
}

  return (
    <div className="card ">
      <h5 className="card-header">Add Customer Leads
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
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" name='source' value={input.source} onChange={updatefeilds} aria-label="Floating label select example">
                  <option selected>Select the Source</option>
                  <option value="walk-in">Walk In</option>
                  <option value="social-media">Social Media</option>
                </select>
                <label for="floatingSelect">Sources</label>
              </div>
             <p className='text-danger'>{inputError?.source?.message ? inputError.source.message : ""}</p>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className="form-floating ">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" name='EmployeeID' value={input.EmployeeID} onChange={updatefeilds} aria-label="Floating label select example">
                  <option selected>Select the Sales Representative</option>
                  {
                    salesrefs.map((salesref)=>(
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
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" name='Job' value={input.Job} onChange={updatefeilds} aria-label="Floating label select example">
                  <option selected>Select the Job Or Occupation </option>
                  <option value="Civil Servant">Civil Servant</option>
                  <option value="Defense Personnel">Defense Personnel</option>
                  <option value="Politician ">Politician </option>
                  <option value="Business Man">Business Man </option>
                  <option value="Self Employed">Self Employed </option>
                  <option value="Farmer">Farmer</option>
                </select>
                <label for="floatingSelect">Job Profile</label>
              </div>
             <p className='text-danger'>{inputError?.Job?.message ? inputError.Job.message : ""}</p>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className="form-floating ">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                name='MinRange'
                value={input.MinRange}
                onChange={updatefeilds}
                placeholder="Enter Minimum Range of Amount "
                aria-describedby="floatingInputHelp" />
              <label htmlFor="floatingInput">Minimum Price Range </label>
             <p className='text-danger'>{inputError?.MinRange?.message ? inputError.MinRange.message : ""}</p>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className="form-floating ">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                name='MaxRange'
                value={input.MaxRange}
                onChange={updatefeilds}
                placeholder="Enter Maximum Range of Amount"
                aria-describedby="floatingInputHelp" />
              <label htmlFor="floatingInput">Maximum Price Range </label>
             <p className='text-danger'>{inputError?.MaxRange?.message ? inputError.MaxRange.message : ""}</p>
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
                    <option value="1">{state.state}</option>
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

export default AddCustomer