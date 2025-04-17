"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "./Header.css"

const Header = () => {
    const { currentUser, userType, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    <h1>MediCare Hub</h1>
                </Link>

                <nav className="nav">
                    {currentUser ? (
                        <>
                            {userType === "patient" && (
                                <ul className="nav-links">
                                    <li>
                                        <Link to="/patient/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/patient/book-appointment">Book Appointment</Link>
                                    </li>
                                    <li>
                                        <Link to="/patient/medical-records">Medical Records</Link>
                                    </li>
                                    <li>
                                        <Link to="/patient/symptom-checker">Symptom Checker</Link>
                                    </li>
                                </ul>
                            )}

                            {userType === "doctor" && (
                                <ul className="nav-links">
                                    <li>
                                        <Link to="/doctor/dashboard">Dashboard</Link>
                                    </li>
                                </ul>
                            )}

                            <div className="user-menu">
                                <span className="user-name">{currentUser.name || currentUser.email}</span>
                                <button onClick={handleLogout} className="btn btn-outline">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/select-user-type" className="btn btn-primary">
                                Login
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
