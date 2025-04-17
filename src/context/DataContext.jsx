"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "./AuthContext"
import { doctorData } from "../data/doctors"

// Create the Data Context
export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const { currentUser, userType, updateUserData } = useContext(AuthContext)

    // State for appointments
    const [appointments, setAppointments] = useState(() => {
        return JSON.parse(localStorage.getItem("appointments") || "[]")
    })

    // State for doctors
    const [doctors] = useState(doctorData)

    // Update localStorage when appointments change
    useEffect(() => {
        localStorage.setItem("appointments", JSON.stringify(appointments))
    }, [appointments])

    // Book a new appointment
    const bookAppointment = (appointmentData) => {
        const newAppointment = {
            id: Date.now().toString(),
            patientId: currentUser.id,
            patientName: currentUser.name,
            patientEmail: currentUser.email,
            doctorId: appointmentData.doctorId,
            doctorName: appointmentData.doctorName,
            department: appointmentData.department,
            date: appointmentData.date,
            time: appointmentData.time,
            status: "pending", // pending, confirmed, rescheduled, completed
            message: "",
            medicalRecords: [],
        }

        // Add to appointments
        const updatedAppointments = [...appointments, newAppointment]
        setAppointments(updatedAppointments)

        // Update patient's appointments if current user is a patient
        if (userType === "patient") {
            const updatedUser = {
                ...currentUser,
                appointments: [...currentUser.appointments, newAppointment.id],
            }
            updateUserData(updatedUser)
        }

        return newAppointment
    }

    // Update appointment status
    const updateAppointmentStatus = (appointmentId, status, message = "") => {
        const updatedAppointments = appointments.map((appointment) => {
            if (appointment.id === appointmentId) {
                return {
                    ...appointment,
                    status,
                    message: message || appointment.message,
                }
            }
            return appointment
        })

        setAppointments(updatedAppointments)
    }

    // Upload medical record to an appointment
    const uploadMedicalRecord = (appointmentId, fileData) => {
        const updatedAppointments = appointments.map((appointment) => {
            if (appointment.id === appointmentId) {
                return {
                    ...appointment,
                    medicalRecords: [
                        ...appointment.medicalRecords,
                        {
                            id: Date.now().toString(),
                            name: fileData.name,
                            type: fileData.type,
                            data: fileData.data, // Base64 encoded data
                            uploadDate: new Date().toISOString(),
                        },
                    ],
                }
            }
            return appointment
        })

        setAppointments(updatedAppointments)
    }

    // Get appointments for current user
    const getUserAppointments = () => {
        if (!currentUser) return []

        if (userType === "patient") {
            return appointments.filter((appointment) => appointment.patientId === currentUser.id)
        } else if (userType === "doctor") {
            return appointments.filter((appointment) => appointment.doctorId === currentUser.id)
        }

        return []
    }

    // Get current appointments (not past)
    const getCurrentAppointments = () => {
        const now = new Date()
        const userAppointments = getUserAppointments()

        return userAppointments.filter((appointment) => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
            return appointmentDate >= now && appointment.status !== "completed"
        })
    }

    // Get past appointments
    const getPastAppointments = () => {
        const now = new Date()
        const userAppointments = getUserAppointments()

        return userAppointments.filter((appointment) => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
            return appointmentDate < now || appointment.status === "completed"
        })
    }

    // Get medical records for a patient
    const getPatientMedicalRecords = () => {
        if (userType !== "patient" || !currentUser) return []

        const patientAppointments = appointments.filter((appointment) => appointment.patientId === currentUser.id)

        // Flatten all medical records from all appointments
        return patientAppointments.reduce((records, appointment) => {
            return [
                ...records,
                ...appointment.medicalRecords.map((record) => ({
                    ...record,
                    appointmentId: appointment.id,
                    doctorName: appointment.doctorName,
                    department: appointment.department,
                    date: appointment.date,
                })),
            ]
        }, [])
    }

    // Context value
    const value = {
        doctors,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        uploadMedicalRecord,
        getUserAppointments,
        getCurrentAppointments,
        getPastAppointments,
        getPatientMedicalRecords,
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
