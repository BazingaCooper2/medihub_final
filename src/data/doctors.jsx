// Hardcoded doctor data as per requirements
export const doctorData = [
    // Pediatrics Department
    {
        id: "ped1",
        loginId: "ped1",
        password: "password123",
        name: "Dr. Sarah Johnson",
        department: "Pediatrics",
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: { start: "09:00", end: "17:00" },
        },
        image: "/images/doctors/doctor1.jpg",
    },
    {
        id: "ped2",
        loginId: "ped2",
        password: "password123",
        name: "Dr. Michael Chen",
        department: "Pediatrics",
        availability: {
            days: ["Monday", "Wednesday", "Friday"],
            hours: { start: "10:00", end: "18:00" },
        },
        image: "/images/doctors/doctor2.jpg",
    },
    {
        id: "ped3",
        loginId: "ped3",
        password: "password123",
        name: "Dr. Emily Rodriguez",
        department: "Pediatrics",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor3.jpg",
    },

    // Dentistry Department
    {
        id: "den1",
        loginId: "den1",
        password: "password123",
        name: "Dr. James Wilson",
        department: "Dentistry",
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: { start: "09:00", end: "17:00" },
        },
        image: "/images/doctors/doctor4.jpg",
    },
    {
        id: "den2",
        loginId: "den2",
        password: "password123",
        name: "Dr. Sophia Lee",
        department: "Dentistry",
        availability: {
            days: ["Monday", "Wednesday", "Friday", "Saturday"],
            hours: { start: "10:00", end: "18:00" },
        },
        image: "/images/doctors/doctor5.jpg",
    },
    {
        id: "den3",
        loginId: "den3",
        password: "password123",
        name: "Dr. Robert Garcia",
        department: "Dentistry",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor6.jpg",
    },

    // Dermatology Department
    {
        id: "der1",
        loginId: "der1",
        password: "password123",
        name: "Dr. Amanda Taylor",
        department: "Dermatology",
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: { start: "09:00", end: "17:00" },
        },
        image: "/images/doctors/doctor7.jpg",
    },
    {
        id: "der2",
        loginId: "der2",
        password: "password123",
        name: "Dr. David Kim",
        department: "Dermatology",
        availability: {
            days: ["Monday", "Wednesday", "Friday"],
            hours: { start: "10:00", end: "18:00" },
        },
        image: "/images/doctors/doctor8.jpg",
    },
    {
        id: "der3",
        loginId: "der3",
        password: "password123",
        name: "Dr. Jessica Martinez",
        department: "Dermatology",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor9.jpg",
    },

    // Orthopedics Department
    {
        id: "ort1",
        loginId: "ort1",
        password: "password123",
        name: "Dr. Thomas Brown",
        department: "Orthopedics",
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: { start: "09:00", end: "17:00" },
        },
        image: "/images/doctors/doctor10.jpg",
    },
    {
        id: "ort2",
        loginId: "ort2",
        password: "password123",
        name: "Dr. Lisa Wang",
        department: "Orthopedics",
        availability: {
            days: ["Monday", "Wednesday", "Friday"],
            hours: { start: "10:00", end: "18:00" },
        },
        image: "/images/doctors/doctor11.jpg",
    },
    {
        id: "ort3",
        loginId: "ort3",
        password: "password123",
        name: "Dr. Kevin Patel",
        department: "Orthopedics",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor12.jpg",
    },

    // Cardiology Department
    {
        id: "car1",
        loginId: "car1",
        password: "password123",
        name: "Dr. Jennifer Adams",
        department: "Cardiology",
        availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: { start: "09:00", end: "17:00" },
        },
        image: "/images/doctors/doctor13.jpg",
    },
    {
        id: "car2",
        loginId: "car2",
        password: "password123",
        name: "Dr. William Smith",
        department: "Cardiology",
        availability: {
            days: ["Monday", "Wednesday", "Friday"],
            hours: { start: "10:00", end: "18:00" },
        },
        image: "/images/doctors/doctor14.jpg",
    },
    {
        id: "car3",
        loginId: "car3",
        password: "password123",
        name: "Dr. Maria Gonzalez",
        department: "Cardiology",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor15.jpg",
    },
]

// Get all departments
export const departments = [...new Set(doctorData.map((doctor) => doctor.department))]

// Get doctors by department
export const getDoctorsByDepartment = (department) => {
    return doctorData.filter((doctor) => doctor.department === department)
}

// Get doctor by ID
export const getDoctorById = (id) => {
    return doctorData.find((doctor) => doctor.id === id)
}

// Search doctors by name or department
export const searchDoctors = (query) => {
    const lowercaseQuery = query.toLowerCase()
    return doctorData.filter(
        (doctor) =>
            doctor.name.toLowerCase().includes(lowercaseQuery) || doctor.department.toLowerCase().includes(lowercaseQuery),
    )
}
