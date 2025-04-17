import { Link } from "react-router-dom"
import Header from "../components/Header"
import "./UserTypeSelection.css"

const UserTypeSelection = () => {
    return (
        <div className="user-type-selection">
            <Header />

            <div className="container selection-container">
                <h2 className="selection-title">Are you a patient or a doctor?</h2>

                <div className="selection-cards">
                    <Link to="/patient/login" className="selection-card">
                        <div className="selection-icon patient-icon"></div>
                        <h3>Patient</h3>
                        <p>Book appointments, view medical records, and check symptoms</p>
                    </Link>

                    <Link to="/doctor/login" className="selection-card">
                        <div className="selection-icon doctor-icon"></div>
                        <h3>Doctor</h3>
                        <p>Manage appointments and upload medical records</p>
                    </Link>
                </div>

                <div className="back-link">
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default UserTypeSelection
