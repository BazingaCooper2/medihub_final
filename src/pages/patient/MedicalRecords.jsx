"use client"

import { useContext, useState } from "react"
import { DataContext } from "../../context/DataContext"
import Header from "../../components/Header"
import "./MedicalRecords.css"

const MedicalRecords = () => {
    const { getPatientMedicalRecords } = useContext(DataContext)
    const [filter, setFilter] = useState("")

    // Get all medical records
    const medicalRecords = getPatientMedicalRecords()

    // Filter records based on search query
    const filteredRecords = medicalRecords.filter((record) => {
        const searchText = filter.toLowerCase()
        return (
            record.name.toLowerCase().includes(searchText) ||
            record.doctorName.toLowerCase().includes(searchText) ||
            record.department.toLowerCase().includes(searchText)
        )
    })

    // Group records by date
    const groupedRecords = filteredRecords.reduce((groups, record) => {
        const date = record.date
        if (!groups[date]) {
            groups[date] = []
        }
        groups[date].push(record)
        return groups
    }, {})

    // Sort dates in descending order
    const sortedDates = Object.keys(groupedRecords).sort((a, b) => {
        return new Date(b) - new Date(a)
    })

    // Function to render file icon based on type
    const getFileIcon = (type) => {
        if (type.includes("pdf")) {
            return "pdf-icon"
        } else if (type.includes("image")) {
            return "image-icon"
        } else {
            return "file-icon"
        }
    }

    return (
        <div className="medical-records">
            <Header />

            <div className="container records-container">
                <div className="records-header">
                    <h2>Your Medical Records</h2>
                    <p>View and download your medical records and prescriptions</p>
                </div>

                <div className="records-content">
                    <div className="records-search">
                        <input
                            type="text"
                            placeholder="Search records by name, doctor, or department"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    {filteredRecords.length === 0 ? (
                        <div className="empty-state">
                            <p>No medical records found.</p>
                            {filter && (
                                <button className="btn btn-outline" onClick={() => setFilter("")}>
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="records-list">
                            {sortedDates.map((date) => (
                                <div key={date} className="records-group">
                                    <h3 className="records-date">{date}</h3>

                                    <div className="record-cards">
                                        {groupedRecords[date].map((record) => (
                                            <div key={record.id} className="record-card">
                                                <div className={`record-icon ${getFileIcon(record.type)}`}></div>

                                                <div className="record-info">
                                                    <h4 className="record-name">{record.name}</h4>
                                                    <p className="record-doctor">
                                                        Dr. {record.doctorName} - {record.department}
                                                    </p>
                                                    <p className="record-date">Uploaded: {new Date(record.uploadDate).toLocaleDateString()}</p>
                                                </div>

                                                <div className="record-actions">
                                                    <button className="btn btn-outline btn-sm">View</button>
                                                    <button className="btn btn-primary btn-sm">Download</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MedicalRecords
