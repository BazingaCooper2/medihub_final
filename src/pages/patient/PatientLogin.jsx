"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Header from "../../components/Header"
import "./PatientAuth.css"

const PatientLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { loginPatient } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        try {
            setError("")
            setLoading(true)

            await loginPatient(email, password)
            navigate("/patient/dashboard")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="patient-auth">
            <Header />

            <div className="container auth-container">
                <div className="auth-card">
                    <h2 className="auth-title">Patient Login</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            Don't have an account? <Link to="/patient/register">Register</Link>
                        </p>
                        <p>
                            <Link to="/select-user-type">Back to user selection</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientLogin
