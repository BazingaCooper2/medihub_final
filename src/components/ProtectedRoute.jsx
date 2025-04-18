"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ children, userType }) => {
    const { currentUser, userType: currentUserType } = useContext(AuthContext)

   
    if (!currentUser) {
        return <Navigate to={`/${userType}/login`} />
    }


    if (currentUserType !== userType) {
        return <Navigate to={`/${currentUserType}/dashboard`} />
    }

   
    return children
}

export default ProtectedRoute
