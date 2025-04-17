"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// Component to protect routes that require authentication
const ProtectedRoute = ({ children, userType }) => {
    const { currentUser, userType: currentUserType } = useContext(AuthContext)

    // If not logged in, redirect to login
    if (!currentUser) {
        return <Navigate to={`/${userType}/login`} />
    }

    // If wrong user type, redirect to appropriate dashboard
    if (currentUserType !== userType) {
        return <Navigate to={`/${currentUserType}/dashboard`} />
    }

    // If authenticated and correct user type, render the protected component
    return children
}

export default ProtectedRoute
