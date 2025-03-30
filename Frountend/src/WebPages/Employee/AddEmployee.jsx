import axios from 'axios';
import React, { useEffect, useState } from 'react'
import states from '../../data/stateData.json'
import { useNavigate, useParams } from 'react-router-dom';
import AuthHeader from '../Accounts/AuthHeader';
const API_URL = import.meta.env.VITE_API_BASEURL;

const AddEmployee = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    Firstname: "", lastname: "", MobileNum: "", EmailId: "", role: "", password: "",
    password_canform: "",
  })
  const [inputError, setInputError] = useState([]);
  const { id } = useParams();

  if (id) {
    const displayEmployee = () => {
      axios.get(`${API_URL}ViewEmployee/` + id, { headers: AuthHeader() }).then((response) => {
        setInput(response.data)
      }).catch((error) => {
        console.log(error)
      });
    }
    useEffect(() => {
      displayEmployee();
    }, [])
  }

  const updatefeilds = (e) => {
    e.persist();
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const formData = {
    Firstname: input.Firstname,
    lastname: input.lastname,
    MobileNum: input.MobileNum,
    EmailId: input.EmailId,
    role: input.role,
    password: input.password,
    password_canform: input.password_canform,
  }

  const UpdateEmployee = () => {
    axios.post(`${API_URL}UpdateEmployee/` + id, formData, { headers: AuthHeader() }).then((response) => {
      navigate("/employees");
    }).catch((error) => {
      if (error.response && error.response.data) {
        setInputError(error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    })
  }

  const SaveEmployee = () => {
    axios.post(`${API_URL}addEmployee`, formData, { headers: AuthHeader() }).then((response) => {
      console.log(response)
      navigate("/employees");
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
      UpdateEmployee();
    } else {
      SaveEmployee();
    }
  }
  return (
    <div className="card ">
      <h5 className="card-header">Add Employee
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
                  placeholder="Enter Employee First Name"
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
                  placeholder="Enter Employee Last Name"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Last Name</label>
                <p className='text-danger'>{inputError?.lastname?.message ? inputError.lastname.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="form-floating ">
                <input
                  type="number"
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
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  name='EmailId'
                  value={input.EmailId}
                  onChange={updatefeilds}
                  placeholder="Enter Employee E-mail ID"
                  aria-describedby="floatingInputHelp" />
                <label htmlFor="floatingInput">Email ID </label>
                <p className='text-danger'>{inputError?.EmailId?.message ? inputError.EmailId.message : ""}</p>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className="form-floating ">
                <div class="form-floating">
                  <select class="form-select" id="floatingSelect" name='role' value={input.role} onChange={updatefeilds} aria-label="Floating label select example">
                    <option selected>Select the Designation or Job Profile</option>
                    <option value="sales-ref">Sales Representative</option>
                    <option value="manager">Manager</option>
                  </select>
                  <label for="floatingSelect">Designation</label>
                </div>
                <p className='text-danger'>{inputError?.role?.message ? inputError.role.message : ""}</p>
              </div>
            </div>
            {
              id ? null : (
                <>
                  <div className='col-lg-6'>
                    <div className="form-floating ">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingInput"
                        name='password'
                        value={input.password}
                        onChange={updatefeilds}
                        placeholder="Enter Employee Password"
                        aria-describedby="floatingInputHelp" />
                      <label htmlFor="floatingInput">Password </label>
                      <p className='text-danger'>{inputError?.password?.message ? inputError.password.message : ""}</p>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className="form-floating ">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingInput"
                        name='password_canform'
                        value={input.password_canform}
                        onChange={updatefeilds}
                        placeholder="Enter Conform Password"
                        aria-describedby="floatingInputHelp" />
                      <label htmlFor="floatingInput">Conform Password </label>
                      <p className='text-danger'>{inputError?.password_canform?.message ? inputError.password_canform.message : ""}</p>
                    </div>
                  </div>
                </>
              )
            }


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

export default AddEmployee