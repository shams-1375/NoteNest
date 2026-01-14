import React from 'react'
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

const Navbar = (props) => {
    const {showAlert}= props
     let navigate = useNavigate();
    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigate('/login')
        props.showAlert(" Account Logged out Successfully", "success")
    }
    let location = useLocation();
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NoteNest</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-light mx-2" to="/login" role="button">Log in</Link>
                            <Link className="btn btn-light mx-2" to="/signup" role="button">Sign up</Link>
                        </form>: <button className="btn btn-warning" onClick={handleLogout} >Log out</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
