"use client"

import { createContext, useState, useEffect } from "react"
import { doctorData } from "../data/doctors"

// Create the Auth Context
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser")
        return savedUser ? JSON.parse(savedUser) : null
    })

    const [userType, setUserType] = useState(() => {
        return localStorage.getItem("userType") || null
    })

    // Update localStorage when auth state changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
        } else {
            localStorage.removeItem("currentUser")
        }

        if (userType) {
            localStorage.setItem("userType", userType)
        } else {
            localStorage.removeItem("userType")
        }
    }, [currentUser, userType])

    // Patient registration function
    const registerPatient = (email, password, name) => {
        // Check if patient already exists
        const patients = JSON.parse(localStorage.getItem("patients") || "[]")
        const existingPatient = patients.find((patient) => patient.email === email)

        if (existingPatient) {
            throw new Error("Email already in use")
        }

        // Create new patient
        const newPatient = {
            id: Date.now().toString(),
            email,
            password, // In a real app, this would be hashed
            name,
            appointments: [],
            medicalRecords: [],
        }

        // Save to localStorage
        patients.push(newPatient)
        localStorage.setItem("patients", JSON.stringify(patients))

        // Set as current user
        setCurrentUser(newPatient)
        setUserType("patient")

        return newPatient
    }

    // Patient login function
    const loginPatient = (email, password) => {
        const patients = JSON.parse(localStorage.getItem("patients") || "[]")
        const patient = patients.find((p) => p.email === email && p.password === password)

        if (!patient) {
            throw new Error("Invalid email or password")
        }

        setCurrentUser(patient)
        setUserType("patient")

        return patient
    }

    // Doctor login function
    const loginDoctor = (loginId, password) => {
        // Find doctor in our hardcoded data
        const doctor = doctorData.find((d) => d.loginId === loginId && d.password === password)

        if (!doctor) {
            throw new Error("Invalid login ID or password")
        }

        setCurrentUser(doctor)
        setUserType("doctor")

        return doctor
    }

    // Logout function
    const logout = () => {
        setCurrentUser(null)
        setUserType(null)
    }

    // Update user data (for appointments, etc.)
    const updateUserData = (userData) => {
        if (userType === "patient") {
            // Update in localStorage
            const patients = JSON.parse(localStorage.getItem("patients") || "[]")
            const updatedPatients = patients.map((p) => (p.id === userData.id ? userData : p))
            localStorage.setItem("patients", JSON.stringify(updatedPatients))
        }

        // Update current user state
        setCurrentUser(userData)
    }

    // Context value
    const value = {
        currentUser,
        userType,
        registerPatient,
        loginPatient,
        loginDoctor,
        logout,
        updateUserData,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
