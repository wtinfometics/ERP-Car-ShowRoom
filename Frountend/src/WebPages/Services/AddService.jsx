import axios from 'axios';
import React, { useEffect, useState } from 'react'
import states from '../../data/stateData.json'
import { useNavigate, useParams } from 'react-router-dom';
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;

const AddService = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    CustomerName: "", RegNumber: "", AppointMentDate: ""
  });
  const [inputError, setInputError] = useState([]);
  const [Vehicles, setVehicles] = useState([]);
  const { id } = useParams();

  if (id) {
    const displayService = () => {
      axios.get(`${API_URL}viewservice/` + id, { headers: AuthHeader() }).then((response) => {
        setInput(response.data)
      }).catch((error) => {
        console.log(error)
      });
    }
    useEffect(() => {
      displayService();
    }, [])
  }

  const updatefeilds = (e) => {
    e.persist();
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const formData = {
    CustomerName: input.CustomerName,
    RegNumber: input.RegNumber,
    AppointMentDate: input.AppointMentDate,
  }

  const UpdateService = () => {
    axios.post(`${API_URL}updateservice/` + id, formData, { headers: AuthHeader() }).then((response) => {
      navigate("/services");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setInputError(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const SaveService = () => {
    axios.post(`${API_URL}addservice`, formData, { headers: AuthHeader() }).then((response) => {
      console.log(response)
      navigate("/services");
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
      UpdateService();
    } else {
      SaveService();
    }
  }

  return (
    <div className="card ">
      <h5 className="card-header">Add Services
        <form onSubmit={handlesubmit}>
          <div className='row mt-5'>
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
                  name='RegNumber'
                  value={input.RegNumber}
                  onChange={updatefeilds}
                  placeholder="Enter Mobile Number"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Registration Number </label>
                <p className='text-danger'>{inputError?.RegNumber?.message ? inputError.RegNumber.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="Date"
                  className="form-control"
                  id="floatingInput"
                  name='AppointMentDate'
                  value={input.AppointMentDate}
                  onChange={updatefeilds}
                  placeholder="Enter Employee E mail ID"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">AppointMent Date </label>
                <p className='text-danger'>{inputError?.AppointMentDate?.message ? inputError.AppointMentDate.message : ""}</p>
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

export default AddService