"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import "./LandingPage.css"
import doctorImage from "./doc_smiling.png"

const LandingPage = () => {
  const [currentDepartment, setCurrentDepartment] = useState(0)

  const departments = [
    {
      title: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents.",
    },
    {
      title: "Dentistry",
      description: "Comprehensive dental care for all ages.",
    },
    {
      title: "Dermatology",
      description: "Diagnosis and treatment of skin, hair, and nail conditions.",
    },
    {
      title: "Orthopedics",
      description: "Care for bones, joints, ligaments, tendons, and muscles.",
    },
    {
      title: "Cardiology",
      description: "Specialized care for heart and cardiovascular system.",
    },
  ]

  const nextDepartment = () => {
    setCurrentDepartment((prev) => (prev + 1) % departments.length)
  }

  const prevDepartment = () => {
    setCurrentDepartment((prev) => (prev === 0 ? departments.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextDepartment, 1500)
    return () => clearInterval(interval)
  }, [])

  const patientTestimonials = [
    {
      row: 1,
      items: [
        {
          id: 1,
          name: "Kriti",
          image: "/testimonials/patient1.jpg",
          testimonial:
            "Dear Dr. Jayathi, I want to thank you for the exceptional care you provided during my child's treatment. Your expert knowledge in pediatrics and kind, patient-centered approach made all the difference in their recovery.",
          hasText: true,
        },
        {
          id: 2,
          name: "Rajesh",
          image: "/testimonials/patient3.jpg",
          testimonial: "",
          hasText: false,
        },
        {
          id: 3,
          name: "Meena",
          image: "/testimonials/patient2.jpg",
          testimonial: "",
          hasText: false,
        },
        {
          id: 4,
          name: "Priya",
          image: "/testimonials/patient5.jpg",
          testimonial:
            "The care I received at MediCare Hub was outstanding. From diagnosis to treatment, every step was handled with utmost professionalism.",
          hasText: true,
        },
      ],
    },
    {
      row: 2,
      items: [
        {
          id: 5,
          name: "Arjun",
          image: "/testimonials/patient7.jpg",
          testimonial: "",
          hasText: false,
        },
        {
          id: 6,
          name: "Shiva",
          image: "/testimonials/patient4.jpg",
          testimonial:
            "Dr. Thomas is a lifesaver. I was suffering from severe joint pain and feared I wouldn't be able to move freely again. After consulting Dr. Thomas and undergoing treatment, I am now pain-free and active.",
          hasText: true,
        },
        {
          id: 7,
          name: "Vikram",
          image: "/testimonials/patient8.jpg",
          testimonial: "",
          hasText: false,
        },
        {
          id: 8,
          name: "Deepa",
          image: "/testimonials/patient6.jpg",
          testimonial:
            "I had to undergo emergency surgery, and the team at MediCare Hub was incredible. Their quick response and expertise saved my life.",
          hasText: true,
        },
      ],
    },
  ]

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
              <a href="#services" className="btn btn-primary">
                Learn More
              </a>
            </div>
            <div className="hero-ournames">
            <p className="hero-name">Kriti Sahana V -23BCE1868</p>
            <p className="hero-name">G Sivakumar -23BCE1834</p>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src={doctorImage || "/placeholder.svg"} alt="doctor" className="hero-img" />
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
          <div className="carousel-container">
            <button className="carousel-btn carousel-btn-left" onClick={prevDepartment}>
              &#8592;
            </button>
            <div className="carousel-box">
              <div className="carousel-content">
                <h3>{departments[currentDepartment].title}</h3>
                <p>{departments[currentDepartment].description}</p>
              </div>
            </div>
            <button className="carousel-btn carousel-btn-right" onClick={nextDepartment}>
              &#8594;
            </button>
          </div>
        </div>
      </section>

      <section className="review">
        <div className="container">
          <h2 className="section-title">What Our Patients Say</h2>
          <div className="review-cards">
            <div className="review-card">
              <p>
                "MediCare Hub has made managing my family's healthcare so much easier. The online appointment booking is
                seamless!"
              </p>
              <div className="review-author">- Kriti</div>
            </div>
            <div className="review-card">
              <p>
                "I love having all my medical records in one place. The doctors are professional and the platform is
                user-friendly."
              </p>
              <div className="review-author">- Shiva</div>
            </div>
            <div className="review-card">
              <p>
                "The symptom checker helped me understand my condition before my appointment. Highly recommend this
                service!"
              </p>
              <div className="review-author">- Ananya</div>
            </div>
          </div>
        </div>
      </section>

      {/* New Patients Speak Section */}
      <section className="patients-speak">
        <div className="container">
          <h2 className="section-title">Patients Speak</h2>

          {/* Top row - scrolls right to left */}
          <div className="video-carousel video-carousel-rtl">
            <div className="video-carousel-inner">
              {patientTestimonials[0].items.map((patient) => (
                <div key={patient.id} className="video-item-wrapper">
                  {patient.hasText ? (
                    <div className="video-item-with-text">
                      <div className="video-thumbnail">
                        <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                        <div className="play-button">
                          <span>▶</span>
                        </div>
                      </div>
                      <div className="testimonial-text">
                        <h3>{patient.name}</h3>
                        <p>{patient.testimonial}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="video-thumbnail">
                      <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                      <div className="play-button">
                        <span>▶</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Duplicate first few items for seamless looping */}
              {patientTestimonials[0].items.slice(0, 2).map((patient) => (
                <div key={`dup-${patient.id}`} className="video-item-wrapper">
                  {patient.hasText ? (
                    <div className="video-item-with-text">
                      <div className="video-thumbnail">
                        <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                        <div className="play-button">
                          <span>▶</span>
                        </div>
                      </div>
                      <div className="testimonial-text">
                        <h3>{patient.name}</h3>
                        <p>{patient.testimonial}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="video-thumbnail">
                      <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                      <div className="play-button">
                        <span>▶</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row - scrolls left to right */}
          <div className="video-carousel video-carousel-ltr">
            <div className="video-carousel-inner">
              {patientTestimonials[1].items.map((patient) => (
                <div key={patient.id} className="video-item-wrapper">
                  {patient.hasText ? (
                    <div className="video-item-with-text">
                      <div className="video-thumbnail">
                        <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                        <div className="play-button">
                          <span>▶</span>
                        </div>
                      </div>
                      <div className="testimonial-text">
                        <h3>{patient.name}</h3>
                        <p>{patient.testimonial}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="video-thumbnail">
                      <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                      <div className="play-button">
                        <span>▶</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Duplicate first few items for seamless looping */}
              {patientTestimonials[1].items.slice(0, 2).map((patient) => (
                <div key={`dup-${patient.id}`} className="video-item-wrapper">
                  {patient.hasText ? (
                    <div className="video-item-with-text">
                      <div className="video-thumbnail">
                        <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                        <div className="play-button">
                          <span>▶</span>
                        </div>
                      </div>
                      <div className="testimonial-text">
                        <h3>{patient.name}</h3>
                        <p>{patient.testimonial}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="video-thumbnail">
                      <img src={patient.image || "/placeholder.svg"} alt={`${patient.name}'s testimonial`} />
                      <div className="play-button">
                        <span>▶</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>MediCare Hub</h2>
              <p>Your health is our our priority</p>
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
              <p>Email: medicare@gmail.com</p>
              <p>Phone: 1234567890</p>
              <p>Address: VIT Chennai, Kelambakkam</p>
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
