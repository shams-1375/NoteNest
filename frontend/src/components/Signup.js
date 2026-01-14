import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert(" Account Created Successfully", "success")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-4 signup-container">
      <h2>Create your NoteNest account to get started</h2>
      <form className="contanier mt-3" onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credentials.name} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
        </div><div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} />
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={
          credentials.password.length < 5 ||
          credentials.password !== credentials.cpassword
        }>Submit</button>
      </form>
    </div>
  )
}

export default Signup
