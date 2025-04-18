"use client"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { DataContext } from "../../context/DataContext"
import Header from "../../components/Header"
import "./DoctorDashboard.css"

const DoctorDashboard = () => {
    const { currentUser } = useContext(AuthContext)
    const { getUserAppointments, updateAppointmentStatus, uploadMedicalRecord, getPastAppointments } =
        useContext(DataContext)

    const [appointments, setAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])
    const [activeTab, setActiveTab] = useState("pending")
    const [rescheduleMessage, setRescheduleMessage] = useState("")
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [showRescheduleModal, setShowRescheduleModal] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [uploadFile, setUploadFile] = useState(null)
    const [uploadFileName, setUploadFileName] = useState("")

    useEffect(() => {
        const fetchAppointments = () => {
            const allAppointments = getUserAppointments()
            const current = allAppointments.filter((appointment) => {
                const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
                return appointmentDate >= new Date()
            })
            setAppointments(current)
            setPastAppointments(getPastAppointments())
        }

        fetchAppointments()
        const interval = setInterval(fetchAppointments, 60000)
        return () => clearInterval(interval)
    }, [getUserAppointments, getPastAppointments])

    const filteredAppointments = appointments.filter((appointment) => {
        if (activeTab === "pending") return appointment.status === "pending"
        if (activeTab === "confirmed") return appointment.status === "confirmed"
        if (activeTab === "rescheduled") return appointment.status === "rescheduled"
        return true
    })

    const handleConfirm = (appointmentId) => {
        updateAppointmentStatus(appointmentId, "confirmed")
        setAppointments(
            appointments.map((appointment) =>
                appointment.id === appointmentId ? { ...appointment, status: "confirmed" } : appointment
            )
        )
    }

    const handleReschedule = (appointment) => {
        setSelectedAppointment(appointment)
        setRescheduleMessage("")
        setShowRescheduleModal(true)
    }

    const submitReschedule = () => {
        if (!rescheduleMessage.trim()) return

        updateAppointmentStatus(selectedAppointment.id, "rescheduled", rescheduleMessage)
        setAppointments(
            appointments.map((appointment) =>
                appointment.id === selectedAppointment.id
                    ? { ...appointment, status: "rescheduled", message: rescheduleMessage }
                    : appointment
            )
        )
        setShowRescheduleModal(false)
        setSelectedAppointment(null)
        setRescheduleMessage("")
    }

    const handleUpload = (appointment) => {
        setSelectedAppointment(appointment)
        setUploadFile(null)
        setUploadFileName("")
        setShowUploadModal(true)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setUploadFile(file)
            setUploadFileName(file.name)
        }
    }

    const submitUpload = () => {
        if (!uploadFile) return

        const reader = new FileReader()
        reader.onload = (e) => {
            const fileData = {
                name: uploadFileName,
                type: uploadFile.type,
                data: e.target.result,
            }

            uploadMedicalRecord(selectedAppointment.id, fileData)

            setAppointments(
                appointments.map((appointment) =>
                    appointment.id === selectedAppointment.id
                        ? {
                              ...appointment,
                              medicalRecords: [
                                  ...appointment.medicalRecords,
                                  {
                                      id: Date.now().toString(),
                                      name: fileData.name,
                                      type: fileData.type,
                                      data: fileData.data,
                                      uploadDate: new Date().toISOString(),
                                  },
                              ],
                          }
                        : appointment
                )
            )

            setShowUploadModal(false)
            setSelectedAppointment(null)
            setUploadFile(null)
            setUploadFileName("")
        }

        reader.readAsDataURL(uploadFile)
    }

    return (
        <div className="doctor-dashboard">
            <Header />
            <div className="container dashboard-container">
                <div className="dashboard-header">
                    <h2>Welcome, Dr. {currentUser.name}</h2>
                    <div className="doctor-info">
                        <span className="department-badge">{currentUser.department}</span>
                    </div>
                </div>
                <div className="dashboard-content">
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h3>Appointment Requests</h3>
                            <div className="tabs">
                                <button className={`tab ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>Pending</button>
                                <button className={`tab ${activeTab === "confirmed" ? "active" : ""}`} onClick={() => setActiveTab("confirmed")}>Confirmed</button>
                                <button className={`tab ${activeTab === "rescheduled" ? "active" : ""}`} onClick={() => setActiveTab("rescheduled")}>Rescheduled</button>
                            </div>
                        </div>
                        {filteredAppointments.length === 0 ? (
                            <div className="empty-state">
                                <p>No {activeTab} appointments found.</p>
                            </div>
                        ) : (
                            <div className="appointment-cards">
                                {filteredAppointments.map((appointment) => (
                                    <div key={appointment.id} className={`appointment-card status-${appointment.status}`}>
                                        <div className="appointment-header">
                                            <h4>{appointment.patientName}</h4>
                                            <span className="appointment-email">{appointment.patientEmail}</span>
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
                                                <p><strong>Message:</strong> {appointment.message}</p>
                                            </div>
                                        )}
                                        <div className="appointment-actions">
                                            {appointment.status === "pending" && (
                                                <>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleConfirm(appointment.id)}>Confirm</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleReschedule(appointment)}>Reschedule</button>
                                                </>
                                            )}
                                            {appointment.status === "confirmed" && (
                                                <button className="btn btn-secondary btn-sm" onClick={() => handleUpload(appointment)}>Upload Medical Record</button>
                                            )}
                                        </div>
                                        {appointment.medicalRecords.length > 0 && (
                                            <div className="medical-records">
                                                <h5>Medical Records</h5>
                                                <ul className="records-list">
                                                    {appointment.medicalRecords.map((record) => (
                                                        <li key={record.id} className="record-item">{record.name}</li>
                                                    ))}
                                                </ul>
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
                                <p>No past appointments found.</p>
                            </div>
                        ) : (
                            <div className="past-appointments">
                                <table className="appointments-table">
                                    <thead>
                                        <tr>
                                            <th>Patient</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            <th>Medical Records</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pastAppointments.map((appointment) => (
                                            <tr key={appointment.id}>
                                                <td>{appointment.patientName}</td>
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
                                                        <button className="btn btn-outline btn-sm" onClick={() => handleUpload(appointment)}>Upload</button>
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
            {showRescheduleModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Reschedule Appointment</h3>
                            <button className="modal-close" onClick={() => setShowRescheduleModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                            <p><strong>Date:</strong> {selectedAppointment.date}</p>
                            <p><strong>Time:</strong> {selectedAppointment.time}</p>
                            <div className="form-group">
                                <label htmlFor="rescheduleMessage">Message for Patient:</label>
                                <textarea
                                    id="rescheduleMessage"
                                    className="form-control"
                                    rows="4"
                                    value={rescheduleMessage}
                                    onChange={(e) => setRescheduleMessage(e.target.value)}
                                    placeholder="Please explain why the appointment needs to be rescheduled..."
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setShowRescheduleModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={submitReschedule} disabled={!rescheduleMessage.trim()}>Send Reschedule Request</button>
                        </div>
                    </div>
                </div>
            )}
            {showUploadModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Upload Medical Record</h3>
                            <button className="modal-close" onClick={() => setShowUploadModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                            <p><strong>Date:</strong> {selectedAppointment.date}</p>
                            <p><strong>Time:</strong> {selectedAppointment.time}</p>
                            <div className="form-group">
                                <label htmlFor="uploadFile">Select File:</label>
                                <div className="file-upload">
                                    <input type="file" id="uploadFile" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                                    <div className="file-upload-info">
                                        {uploadFileName ? (
                                            <span className="file-name">{uploadFileName}</span>
                                        ) : (
                                            <span className="file-placeholder">No file selected</span>
                                        )}
                                    </div>
                                </div>
                                <p className="file-note">Accepted file types: PDF, JPG, PNG, DOC, DOCX</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setShowUploadModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={submitUpload} disabled={!uploadFile}>Upload Record</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorDashboard
