"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { DataContext } from "../../context/DataContext"
import Header from "../../components/Header"
import "./BookAppointment.css"

const BookAppointment = () => {
    const { currentUser } = useContext(AuthContext)
    const { doctors, bookAppointment } = useContext(DataContext)
    const navigate = useNavigate()

    const [selectedDepartment, setSelectedDepartment] = useState("")
    const [selectedDoctor, setSelectedDoctor] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [availableTimes, setAvailableTimes] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Get all departments
    const departments = [...new Set(doctors.map((doctor) => doctor.department))]

    // Filter doctors based on department and search query
    useEffect(() => {
        let filtered = doctors

        if (selectedDepartment) {
            filtered = filtered.filter((doctor) => doctor.department === selectedDepartment)
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (doctor) => doctor.name.toLowerCase().includes(query) || doctor.department.toLowerCase().includes(query),
            )
        }

        setFilteredDoctors(filtered)
    }, [doctors, selectedDepartment, searchQuery])

    // Reset selected doctor when department changes
    useEffect(() => {
        setSelectedDoctor("")
        setSelectedDate("")
        setSelectedTime("")
    }, [selectedDepartment])

    // Reset date and time when doctor changes
    useEffect(() => {
        setSelectedDate("")
        setSelectedTime("")
    }, [selectedDoctor])

    // Generate available times based on doctor's availability and selected date
    useEffect(() => {
        if (!selectedDoctor || !selectedDate) {
            setAvailableTimes([])
            return
        }

        const doctor = doctors.find((doc) => doc.id === selectedDoctor)
        if (!doctor) {
            setAvailableTimes([])
            return
        }

        // Get day of week for selected date
        const dateObj = new Date(selectedDate)
        const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" })

        // Check if doctor works on this day
        if (!doctor.availability.days.includes(dayOfWeek)) {
            setAvailableTimes([])
            return
        }

        // Generate time slots
        const { start, end } = doctor.availability.hours
        const startHour = Number.parseInt(start.split(":")[0])
        const endHour = Number.parseInt(end.split(":")[0])

        const times = []
        for (let hour = startHour; hour < endHour; hour++) {
            times.push(`${hour.toString().padStart(2, "0")}:00`)
            times.push(`${hour.toString().padStart(2, "0")}:30`)
        }

        setAvailableTimes(times)
    }, [doctors, selectedDoctor, selectedDate])

    // Get minimum date (tomorrow)
    const getMinDate = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().split("T")[0]
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!selectedDoctor || !selectedDate || !selectedTime) {
            setError("Please fill in all fields")
            return
        }

        const doctor = doctors.find((doc) => doc.id === selectedDoctor)
        if (!doctor) {
            setError("Invalid doctor selection")
            return
        }

        try {
            const appointmentData = {
                doctorId: doctor.id,
                doctorName: doctor.name,
                department: doctor.department,
                date: selectedDate,
                time: selectedTime,
            }

            bookAppointment(appointmentData)

            setSuccess("Appointment booked successfully!")

            // Reset form
            setSelectedDepartment("")
            setSelectedDoctor("")
            setSelectedDate("")
            setSelectedTime("")
            setSearchQuery("")

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate("/patient/dashboard")
            }, 2000)
        } catch (err) {
            setError("Failed to book appointment. Please try again.")
        }
    }

    return (
        <div className="book-appointment">
            <Header />

            <div className="container booking-container">
                <div className="booking-header">
                    <h2>Book an Appointment</h2>
                    <p>Select a department, doctor, and preferred time for your appointment</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="booking-content">
                    <div className="search-filter">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search by doctor name or department"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="department-filter">
                            <label>Filter by Department:</label>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="form-control"
                            >
                                <option value="">All Departments</option>
                                {departments.map((department) => (
                                    <option key={department} value={department}>
                                        {department}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="booking-grid">
                        <div className="doctors-list">
                            <h3>Select a Doctor</h3>

                            {filteredDoctors.length === 0 ? (
                                <div className="empty-state">
                                    <p>No doctors found matching your criteria.</p>
                                </div>
                            ) : (
                                <div className="doctor-cards">
                                    {filteredDoctors.map((doctor) => (
                                        <div
                                            key={doctor.id}
                                            className={`doctor-card ${selectedDoctor === doctor.id ? "selected" : ""}`}
                                            onClick={() => setSelectedDoctor(doctor.id)}
                                        >
                                            <div className="doctor-avatar">
                                                <div className="avatar-placeholder">{doctor.name.charAt(0)}</div>
                                            </div>
                                            <div className="doctor-info">
                                                <h4>{doctor.name}</h4>
                                                <p className="doctor-department">{doctor.department}</p>
                                                <p className="doctor-availability">Available: {doctor.availability.days.join(", ")}</p>
                                                <p className="doctor-hours">
                                                    Hours: {doctor.availability.hours.start} - {doctor.availability.hours.end}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="booking-form">
                            <h3>Appointment Details</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="date">Select Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="form-control"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={getMinDate()}
                                        disabled={!selectedDoctor}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="time">Select Time:</label>
                                    <select
                                        id="time"
                                        className="form-control"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        disabled={!selectedDate || availableTimes.length === 0}
                                    >
                                        <option value="">Select a time slot</option>
                                        {availableTimes.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>

                                    {selectedDate && availableTimes.length === 0 && (
                                        <p className="time-note">
                                            No available time slots for the selected date. Please choose another date.
                                        </p>
                                    )}
                                </div>

                                <div className="booking-summary">
                                    <h4>Appointment Summary</h4>

                                    <div className="summary-details">
                                        <p>
                                            <strong>Patient:</strong> {currentUser.name}
                                        </p>

                                        {selectedDoctor && (
                                            <p>
                                                <strong>Doctor:</strong> {doctors.find((doc) => doc.id === selectedDoctor)?.name}
                                            </p>
                                        )}

                                        {selectedDepartment && (
                                            <p>
                                                <strong>Department:</strong> {selectedDepartment}
                                            </p>
                                        )}

                                        {selectedDate && (
                                            <p>
                                                <strong>Date:</strong> {selectedDate}
                                            </p>
                                        )}

                                        {selectedTime && (
                                            <p>
                                                <strong>Time:</strong> {selectedTime}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={!selectedDoctor || !selectedDate || !selectedTime}
                                >
                                    Book Appointment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookAppointment
