import React from 'react'

const AddJobCard = () => {
  return (
    <div className="card ">
    <h5 className="card-header">Add Job Card 
      <div className='row mt-5'>
        <div className='col-lg-6'>
          <div className="form-floating ">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name='Firstname'
              placeholder="Enter Employee First Name"
              aria-describedby="floatingInputHelp" />
            <label htmlFor="floatingInput">First Name</label>
            <div id="floatingInputHelp" className="form-text text-danger m-2">
              We'll never share your details with anyone else.
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className="form-floating ">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name='lastname'
              placeholder="Enter Employee Last Name"
              aria-describedby="floatingInputHelp" />
            <label htmlFor="floatingInput">Last Name</label>
            <div id="floatingInputHelp" className="form-text text-danger m-2">
              We'll never share your details with anyone else.
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className="form-floating ">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name='MobileNum'
              placeholder="Enter Mobile Number"
              aria-describedby="floatingInputHelp" />
            <label htmlFor="floatingInput">Mobile Number </label>
            <div id="floatingInputHelp" className="form-text text-danger m-2">
              We'll never share your details with anyone else.
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className="form-floating ">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name='EmailId'
              placeholder="Enter Employee E mail ID"
              aria-describedby="floatingInputHelp" />
            <label htmlFor="floatingInput">Email ID </label>
            <div id="floatingInputHelp" className="form-text text-danger m-2">
              We'll never share your details with anyone else.
            </div>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className="form-floating ">
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" name='role'  aria-label="Floating label select example">
              <option selected>Select the Source</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label for="floatingSelect">Sources</label>
          </div>
            <div id="floatingInputHelp" className="form-text text-danger m-2">
              We'll never share your details with anyone else.
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className="form-floating ">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              name='MinRange'
              placeholder="Enter Employee Last Name"
              aria-describedby="floatingInputHelp" />
            <label htmlFor="floatingInput">Password </label>
            <div id="floatingInputHelp" className="form-text text-danger m-2">
              We'll never share your details with anyone else.
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className="form-floating ">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              name='MaxRange'
              placeholder="Enter Employee Last Name"
              aria-describedby="floatingInputHelp" />
            <label htmlFor="floatingInput">Conform Password </label>
            <div id="floatingInputHelp" className="form-text text-danger m-2">
              We'll never share your details with anyone else.
            </div>
          </div>
        </div>
       
        <div className='col-lg-12 mt-5'>
          <button type='submit' className='btn btn-primary btn-lg m-1 shadow'>Submit</button>
          <button type='reset' className='btn btn-secondary btn-lg m-1 shadow'>Reset</button>
        </div>

      </div>
    </h5>
  </div>
  )
}

export default AddJobCard