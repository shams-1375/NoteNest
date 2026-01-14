import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/Signup");
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert(" Account Logged in Successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4 login-container">
            <h2>Login to Continue at NoteNest</h2>
            <form className="contanier mt-3" onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg mt-3">Submit</button>
            </form>
            <div className="mt-4">
                    <h5>Didn't have an Account Create One!</h5>
                    <button className="btn btn-dark mt-2" onClick={handleSignUp}>Sign up</button>
                </div>
        </div>
    )
}

export default Login
