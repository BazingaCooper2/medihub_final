"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "./AuthContext"
import { doctorData } from "../data/doctors"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const { currentUser, userType, updateUserData } = useContext(AuthContext)

    const [appointments, setAppointments] = useState(() => {
        return JSON.parse(localStorage.getItem("appointments") || "[]")
    })

    const [doctors] = useState(doctorData)

    useEffect(() => {
        localStorage.setItem("appointments", JSON.stringify(appointments))
    }, [appointments])

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
            status: "pending",
            message: "",
            medicalRecords: [],
        }

        const updatedAppointments = [...appointments, newAppointment]
        setAppointments(updatedAppointments)

        if (userType === "patient") {
            const updatedUser = {
                ...currentUser,
                appointments: [...currentUser.appointments, newAppointment.id],
            }
            updateUserData(updatedUser)
        }

        return newAppointment
    }

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
                            data: fileData.data,
                            uploadDate: new Date().toISOString(),
                        },
                    ],
                }
            }
            return appointment
        })

        setAppointments(updatedAppointments)
    }

    const getUserAppointments = () => {
        if (!currentUser) return []

        if (userType === "patient") {
            return appointments.filter((appointment) => appointment.patientId === currentUser.id)
        } else if (userType === "doctor") {
            return appointments.filter((appointment) => appointment.doctorId === currentUser.id)
        }

        return []
    }

    const getCurrentAppointments = () => {
        const now = new Date()
        const userAppointments = getUserAppointments()

        return userAppointments.filter((appointment) => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
            return appointmentDate >= now && appointment.status !== "completed"
        })
    }

    const getPastAppointments = () => {
        const now = new Date()
        const userAppointments = getUserAppointments()

        return userAppointments.filter((appointment) => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
            return appointmentDate < now || appointment.status === "completed"
        })
    }

    const getPatientMedicalRecords = () => {
        if (userType !== "patient" || !currentUser) return []

        const patientAppointments = appointments.filter((appointment) => appointment.patientId === currentUser.id)

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
