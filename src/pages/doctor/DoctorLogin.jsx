"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Header from "../../components/Header"
import "./DoctorAuth.css"

const DoctorLogin = () => {
    const [loginId, setLoginId] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { loginDoctor } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!loginId || !password) {
            setError("Please fill in all fields")
            return
        }

        try {
            setError("")
            setLoading(true)

            await loginDoctor(loginId, password)
            navigate("/doctor/dashboard")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="doctor-auth">
            <Header />

            <div className="container auth-container">
                <div className="auth-card">
                    <h2 className="auth-title">Doctor Login</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="loginId">Login ID</label>
                            <input
                                type="text"
                                id="loginId"
                                className="form-control"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="auth-links">
                        <p>
                            <Link to="/select-user-type">Back to user selection</Link>
                        </p>
                    </div>

                    <div className="doctor-login-help">
                        <h3>Demo Login IDs</h3>
                        <p>For demonstration purposes, you can use the following login credentials:</p>
                        <ul>
                            <li>
                                <strong>Pediatrics:</strong> ped1, ped2, ped3
                            </li>
                            <li>
                                <strong>Dentistry:</strong> den1, den2, den3
                            </li>
                            <li>
                                <strong>Dermatology:</strong> der1, der2, der3
                            </li>
                            <li>
                                <strong>Orthopedics:</strong> ort1, ort2, ort3
                            </li>
                            <li>
                                <strong>Cardiology:</strong> car1, car2, car3
                            </li>
                        </ul>
                        <p>Password for all doctors: password123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorLogin
