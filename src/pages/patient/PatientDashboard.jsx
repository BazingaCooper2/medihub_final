"use client"

import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { DataContext } from "../../context/DataContext"
import Header from "../../components/Header"
import "./PatientDashboard.css"

const PatientDashboard = () => {
    const { currentUser } = useContext(AuthContext)
    const { getCurrentAppointments, getPastAppointments } = useContext(DataContext)

    const [currentAppointments, setCurrentAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])

    useEffect(() => {
        setCurrentAppointments(getCurrentAppointments())
        setPastAppointments(getPastAppointments())

        const interval = setInterval(() => {
            setCurrentAppointments(getCurrentAppointments())
            setPastAppointments(getPastAppointments())
        }, 60000)

        return () => clearInterval(interval)
    }, [getCurrentAppointments, getPastAppointments])

    return (
        <div className="patient-dashboard">
            <Header />

            <div className="container dashboard-container">
                <div className="dashboard-header">
                    <h2>Welcome, {currentUser.name}</h2>
                    <Link to="/patient/book-appointment" className="btn btn-primary">
                        Book New Appointment
                    </Link>
                </div>

                <div className="dashboard-content">
                    <div className="dashboard-section">
                        <h3>Your Appointments</h3>

                        {currentAppointments.length === 0 ? (
                            <div className="empty-state">
                                <p>You don't have any upcoming appointments.</p>
                                <Link to="/patient/book-appointment" className="btn btn-outline">
                                    Book an Appointment
                                </Link>
                            </div>
                        ) : (
                            <div className="appointment-cards">
                                {currentAppointments.map((appointment) => (
                                    <div key={appointment.id} className={`appointment-card status-${appointment.status}`}>
                                        <div className="appointment-header">
                                            <h4>{appointment.doctorName}</h4>
                                            <span className="appointment-department">{appointment.department}</span>
                                        </div>

                                        <div className="appointment-details">
                                            <div className="appointment-info">
                                                <span className="info-label">Date:</span>
                                                <span className="info-value">{appointment.date}</span>
                                            </div>
                                            <div className="appointment-info">
                                                <span className="info-label">Time:</span>
                                                <span className="info-value">{appointment.time}</span>
                                            </div>
                                            <div className="appointment-info">
                                                <span className="info-label">Status:</span>
                                                <span className={`info-value status-badge ${appointment.status}`}>
                                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {appointment.status === "rescheduled" && (
                                            <div className="appointment-message">
                                                <p>
                                                    <strong>Message from doctor:</strong> {appointment.message}
                                                </p>
                                                <Link to="/patient/book-appointment" className="btn btn-outline btn-sm">
                                                    Book New Appointment
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="dashboard-section">
                        <h3>Past Appointments</h3>

                        {pastAppointments.length === 0 ? (
                            <div className="empty-state">
                                <p>You don't have any past appointments.</p>
                            </div>
                        ) : (
                            <div className="past-appointments">
                                <table className="appointments-table">
                                    <thead>
                                        <tr>
                                            <th>Doctor</th>
                                            <th>Department</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pastAppointments.map((appointment) => (
                                            <tr key={appointment.id}>
                                                <td>{appointment.doctorName}</td>
                                                <td>{appointment.department}</td>
                                                <td>{appointment.date}</td>
                                                <td>{appointment.time}</td>
                                                <td>
                                                    <span className={`status-badge ${appointment.status}`}>
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="dashboard-section">
                        <h3>Quick Links</h3>
                        <div className="quick-links">
                            <Link to="/patient/book-appointment" className="quick-link-card">
                                <div className="quick-link-icon book-icon"></div>
                                <h4>Book Appointment</h4>
                                <p>Schedule a new appointment with a doctor</p>
                            </Link>

                            <Link to="/patient/medical-records" className="quick-link-card">
                                <div className="quick-link-icon records-icon"></div>
                                <h4>Medical Records</h4>
                                <p>View your medical records and prescriptions</p>
                            </Link>

                            <Link to="/patient/symptom-checker" className="quick-link-card">
                                <div className="quick-link-icon symptom-icon"></div>
                                <h4>Symptom Checker</h4>
                                <p>Check your symptoms and get guidance</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientDashboard
