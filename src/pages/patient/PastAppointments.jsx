"use client"

import { useContext, useState } from "react"
import { DataContext } from "../../context/DataContext"
import Header from "../../components/Header"
import "./PastAppointments.css"

const PastAppointments = () => {
    const { getPastAppointments } = useContext(DataContext)
    const [filter, setFilter] = useState("")

    const pastAppointments = getPastAppointments()

    const filteredAppointments = pastAppointments.filter((appointment) => {
        const searchText = filter.toLowerCase()
        return (
            appointment.doctorName.toLowerCase().includes(searchText) ||
            appointment.department.toLowerCase().includes(searchText) ||
            appointment.date.includes(searchText)
        )
    })

    return (
        <div className="past-appointments-page">
            <Header />

            <div className="container past-container">
                <div className="past-header">
                    <h2>Past Appointments</h2>
                    <p>View your appointment history</p>
                </div>

                <div className="past-content">
                    <div className="past-search">
                        <input
                            type="text"
                            placeholder="Search by doctor, department, or date"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    {filteredAppointments.length === 0 ? (
                        <div className="empty-state">
                            <p>No past appointments found.</p>
                            {filter && (
                                <button className="btn btn-outline" onClick={() => setFilter("")}>
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="appointments-table-container">
                            <table className="appointments-table">
                                <thead>
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Department</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Medical Records</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((appointment) => (
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
                                            <td>
                                                {appointment.medicalRecords.length > 0 ? (
                                                    <div className="records-count">{appointment.medicalRecords.length} record(s)</div>
                                                ) : (
                                                    <span className="no-records">None</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PastAppointments
