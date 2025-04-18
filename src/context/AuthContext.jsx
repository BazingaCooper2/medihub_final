"use client"

import { createContext, useState, useEffect } from "react"
import { doctorData } from "../data/doctors"


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser")
        return savedUser ? JSON.parse(savedUser) : null
    })

    const [userType, setUserType] = useState(() => {
        return localStorage.getItem("userType") || null
    })

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

  
    const registerPatient = (email, password, name) => {
       
        const patients = JSON.parse(localStorage.getItem("patients") || "[]")
        const existingPatient = patients.find((patient) => patient.email === email)

        if (existingPatient) {
            throw new Error("Email already in use")
        }

       
        const newPatient = {
            id: Date.now().toString(),
            email,
            password, 
            name,
            appointments: [],
            medicalRecords: [],
        }

       
        patients.push(newPatient)
        localStorage.setItem("patients", JSON.stringify(patients))


        setCurrentUser(newPatient)
        setUserType("patient")

        return newPatient
    }


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

 
    const loginDoctor = (loginId, password) => {
        const doctor = doctorData.find((d) => d.loginId === loginId && d.password === password)

        if (!doctor) {
            throw new Error("Invalid login ID or password")
        }

        setCurrentUser(doctor)
        setUserType("doctor")

        return doctor
    }

  
    const logout = () => {
        setCurrentUser(null)
        setUserType(null)
    }


    const updateUserData = (userData) => {
        if (userType === "patient") {
            
            const patients = JSON.parse(localStorage.getItem("patients") || "[]")
            const updatedPatients = patients.map((p) => (p.id === userData.id ? userData : p))
            localStorage.setItem("patients", JSON.stringify(updatedPatients))
        }

       
        setCurrentUser(userData)
    }

   
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
