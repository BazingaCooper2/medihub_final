
export const doctorData = [
    {
        id: "ped1",
        loginId: "ped1",
        password: "password123",
        name: "Dr. Anitha",
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
        name: "Dr. Jayanthi",
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
        name: "Dr. Sridhar",
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
        name: "Dr. James",
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
        name: "Dr. Praveen",
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
        name: "Dr. Gayathri",
        department: "Dentistry",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor6.jpg",
    },

 
    {
        id: "der1",
        loginId: "der1",
        password: "password123",
        name: "Dr. Sreenivas",
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
        name: "Dr. Anandh",
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
        name: "Dr. Jessica",
        department: "Dermatology",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor9.jpg",
    },

    {
        id: "ort1",
        loginId: "ort1",
        password: "password123",
        name: "Dr. Thomas",
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
        name: "Dr. Venkat",
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
        name: "Dr. Kevin",
        department: "Orthopedics",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor12.jpg",
    },

    {
        id: "car1",
        loginId: "car1",
        password: "password123",
        name: "Dr. Krishnan",
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
        name: "Dr. Aakansha",
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
        name: "Dr. Abhijith",
        department: "Cardiology",
        availability: {
            days: ["Tuesday", "Thursday", "Saturday"],
            hours: { start: "08:00", end: "16:00" },
        },
        image: "/images/doctors/doctor15.jpg",
    },
]


export const departments = [...new Set(doctorData.map((doctor) => doctor.department))]


export const getDoctorsByDepartment = (department) => {
    return doctorData.filter((doctor) => doctor.department === department)
}


export const getDoctorById = (id) => {
    return doctorData.find((doctor) => doctor.id === id)
}


export const searchDoctors = (query) => {
    const lowercaseQuery = query.toLowerCase()
    return doctorData.filter(
        (doctor) =>
            doctor.name.toLowerCase().includes(lowercaseQuery) || doctor.department.toLowerCase().includes(lowercaseQuery),
    )
}
