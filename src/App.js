import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import UserTypeSelection from "./pages/UserTypeSelection"
import PatientLogin from "./pages/patient/PatientLogin"
import PatientRegister from "./pages/patient/PatientRegister"
import DoctorLogin from "./pages/doctor/DoctorLogin"
import PatientDashboard from "./pages/patient/PatientDashboard"
import DoctorDashboard from "./pages/doctor/DoctorDashboard"
import BookAppointment from "./pages/patient/BookAppointment"
import MedicalRecords from "./pages/patient/MedicalRecords"
import PastAppointments from "./pages/patient/PastAppointments"
import SymptomChecker from "./pages/patient/SymptomChecker"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import { DataProvider } from "./context/DataContext"
import "./App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="app-container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/select-user-type" element={<UserTypeSelection />} />
              <Route path="/patient/login" element={<PatientLogin />} />
              <Route path="/patient/register" element={<PatientRegister />} />
              <Route path="/doctor/login" element={<DoctorLogin />} />

              {/* Protected Patient Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute userType="patient">
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/book-appointment"
                element={
                  <ProtectedRoute userType="patient">
                    <BookAppointment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/medical-records"
                element={
                  <ProtectedRoute userType="patient">
                    <MedicalRecords />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/past-appointments"
                element={
                  <ProtectedRoute userType="patient">
                    <PastAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/symptom-checker"
                element={
                  <ProtectedRoute userType="patient">
                    <SymptomChecker />
                  </ProtectedRoute>
                }
              />

              {/* Protected Doctor Routes */}
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute userType="doctor">
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
