import { Link } from "react-router-dom"
import Header from "../components/Header"
import "./LandingPage.css"

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header />

            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Welcome to MediCare Hub</h1>
                        <p className="hero-subtitle">Your one-stop solution for managing healthcare online</p>
                        <div className="hero-buttons">
                            <Link to="/select-user-type" className="btn btn-primary">
                                Get Started
                            </Link>
                            <a href="#services" className="btn btn-outline">
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="image-container">
                            {/* Placeholder for hero image */}
                            <div className="placeholder-image">
                                <div className="animated-circle"></div>
                                <div className="animated-plus"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="services">
                <div className="container">
                    <h2 className="section-title">Our Services</h2>
                    <div className="service-cards">
                        <div className="service-card">
                            <div className="service-icon appointment-icon"></div>
                            <h3>Online Appointments</h3>
                            <p>Book appointments with doctors from various specialties at your convenience.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon records-icon"></div>
                            <h3>Medical Records</h3>
                            <p>Access your medical records, prescriptions, and test results anytime, anywhere.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon symptom-icon"></div>
                            <h3>Symptom Checker</h3>
                            <p>Check your symptoms and get preliminary guidance on potential health issues.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="departments">
                <div className="container">
                    <h2 className="section-title">Our Departments</h2>
                    <div className="department-carousel">
                        <div className="department-card">
                            <h3>Pediatrics</h3>
                            <p>Specialized healthcare for infants, children, and adolescents.</p>
                        </div>
                        <div className="department-card">
                            <h3>Dentistry</h3>
                            <p>Comprehensive dental care for all ages.</p>
                        </div>
                        <div className="department-card">
                            <h3>Dermatology</h3>
                            <p>Diagnosis and treatment of skin, hair, and nail conditions.</p>
                        </div>
                        <div className="department-card">
                            <h3>Orthopedics</h3>
                            <p>Care for bones, joints, ligaments, tendons, and muscles.</p>
                        </div>
                        <div className="department-card">
                            <h3>Cardiology</h3>
                            <p>Specialized care for heart and cardiovascular system.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <div className="container">
                    <h2 className="section-title">What Our Patients Say</h2>
                    <div className="testimonial-cards">
                        <div className="testimonial-card">
                            <p>
                                "MediCare Hub has made managing my family's healthcare so much easier. The online appointment booking is
                                seamless!"
                            </p>
                            <div className="testimonial-author">- Sarah M.</div>
                        </div>
                        <div className="testimonial-card">
                            <p>
                                "I love having all my medical records in one place. The doctors are professional and the platform is
                                user-friendly."
                            </p>
                            <div className="testimonial-author">- John D.</div>
                        </div>
                        <div className="testimonial-card">
                            <p>
                                "The symptom checker helped me understand my condition before my appointment. Highly recommend this
                                service!"
                            </p>
                            <div className="testimonial-author">- Lisa T.</div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h2>MediCare Hub</h2>
                            <p>Your health, our priority</p>
                        </div>
                        <div className="footer-links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/select-user-type">Login</Link>
                                </li>
                                <li>
                                    <a href="#services">Services</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-contact">
                            <h3>Contact Us</h3>
                            <p>Email: info@medicarehub.com</p>
                            <p>Phone: (123) 456-7890</p>
                            <p>Address: 123 Health Street, Medical City</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} MediCare Hub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
