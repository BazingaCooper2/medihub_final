// Symptom checker data
export const symptoms = [
    {
        id: "headache",
        name: "Headache",
        relatedSymptoms: ["fever", "nausea", "dizziness", "fatigue"],
        possibleConditions: [
            {
                name: "Migraine",
                description:
                    "A neurological condition that causes severe headaches, often with nausea and sensitivity to light and sound.",
                recommendation:
                    "Rest in a dark, quiet room. Over-the-counter pain relievers may help. If severe or recurring, consult a doctor.",
            },
            {
                name: "Tension Headache",
                description:
                    "Common headache with mild to moderate pain, often described as feeling like a tight band around the head.",
                recommendation: "Over-the-counter pain relievers, stress management, and adequate rest may help.",
            },
            {
                name: "Sinus Headache",
                description:
                    "Pain in the face, particularly around the eyes, cheeks, and forehead, often accompanied by nasal congestion.",
                recommendation: "Decongestants, nasal saline sprays, and staying hydrated may provide relief.",
            },
        ],
    },
    {
        id: "fever",
        name: "Fever",
        relatedSymptoms: ["headache", "chills", "sweating", "fatigue", "cough"],
        possibleConditions: [
            {
                name: "Common Cold",
                description: "A viral infection causing mild fever, runny nose, sore throat, and cough.",
                recommendation: "Rest, stay hydrated, and take over-the-counter fever reducers if needed.",
            },
            {
                name: "Influenza (Flu)",
                description:
                    "A viral infection with sudden onset of high fever, body aches, fatigue, and respiratory symptoms.",
                recommendation: "Rest, stay hydrated, and take fever reducers. Consult a doctor if symptoms are severe.",
            },
            {
                name: "COVID-19",
                description: "A viral infection that can cause fever, cough, shortness of breath, and loss of taste or smell.",
                recommendation: "Isolate, rest, stay hydrated, and consult a healthcare provider for testing and guidance.",
            },
        ],
    },
    {
        id: "cough",
        name: "Cough",
        relatedSymptoms: ["fever", "sore throat", "runny nose", "shortness of breath"],
        possibleConditions: [
            {
                name: "Common Cold",
                description: "A viral infection causing cough, runny nose, and mild fever.",
                recommendation: "Rest, stay hydrated, and use cough drops or honey for cough relief.",
            },
            {
                name: "Bronchitis",
                description: "Inflammation of the bronchial tubes, causing cough with mucus, chest discomfort, and fatigue.",
                recommendation: "Rest, stay hydrated, use a humidifier, and consider over-the-counter cough suppressants.",
            },
            {
                name: "Asthma",
                description: "A chronic condition causing cough, wheezing, and shortness of breath.",
                recommendation: "Use prescribed inhalers, avoid triggers, and seek medical help if symptoms worsen.",
            },
        ],
    },
    {
        id: "rash",
        name: "Skin Rash",
        relatedSymptoms: ["itching", "redness", "swelling", "fever"],
        possibleConditions: [
            {
                name: "Contact Dermatitis",
                description: "Skin inflammation caused by direct contact with an irritant or allergen.",
                recommendation:
                    "Avoid the irritant, use mild soaps, apply moisturizers, and consider over-the-counter hydrocortisone cream.",
            },
            {
                name: "Eczema",
                description: "A chronic skin condition causing dry, itchy, and inflamed skin.",
                recommendation:
                    "Keep skin moisturized, avoid triggers, use gentle soaps, and consider over-the-counter anti-itch creams.",
            },
            {
                name: "Hives",
                description: "Raised, itchy welts on the skin that can appear suddenly due to an allergic reaction.",
                recommendation:
                    "Avoid triggers, take antihistamines, apply cool compresses, and seek medical attention if breathing is affected.",
            },
        ],
    },
    {
        id: "stomachPain",
        name: "Stomach Pain",
        relatedSymptoms: ["nausea", "vomiting", "diarrhea", "constipation", "bloating"],
        possibleConditions: [
            {
                name: "Gastroenteritis",
                description: "Inflammation of the stomach and intestines, often due to viral or bacterial infection.",
                recommendation: "Stay hydrated, eat bland foods, rest, and avoid dairy and fatty foods until symptoms improve.",
            },
            {
                name: "Indigestion",
                description: "Discomfort or burning feeling in the upper abdomen, often after eating.",
                recommendation:
                    "Eat smaller meals, avoid trigger foods, limit alcohol and caffeine, and try over-the-counter antacids.",
            },
            {
                name: "Irritable Bowel Syndrome",
                description:
                    "A chronic condition affecting the large intestine, causing abdominal pain, bloating, and changes in bowel habits.",
                recommendation: "Manage stress, avoid trigger foods, eat high-fiber foods, and stay physically active.",
            },
        ],
    },
    {
        id: "jointPain",
        name: "Joint Pain",
        relatedSymptoms: ["swelling", "stiffness", "redness", "limited mobility"],
        possibleConditions: [
            {
                name: "Osteoarthritis",
                description: "Degenerative joint disease causing pain, stiffness, and reduced mobility.",
                recommendation:
                    "Stay active with low-impact exercises, maintain a healthy weight, and consider over-the-counter pain relievers.",
            },
            {
                name: "Rheumatoid Arthritis",
                description: "An autoimmune disorder causing joint inflammation, pain, and damage.",
                recommendation: "Rest during flares, apply heat or cold, and consult a doctor for proper treatment.",
            },
            {
                name: "Gout",
                description: "A type of arthritis causing sudden, severe joint pain, often in the big toe.",
                recommendation:
                    "Rest the affected joint, apply ice, drink plenty of water, and avoid alcohol and high-purine foods.",
            },
        ],
    },
]

// Get all symptom names
export const getSymptomNames = () => {
    return symptoms.map((symptom) => symptom.name)
}

// Get symptom by ID
export const getSymptomById = (id) => {
    return symptoms.find((symptom) => symptom.id === id)
}

// Get related symptoms
export const getRelatedSymptoms = (symptomId) => {
    const symptom = getSymptomById(symptomId)
    if (!symptom) return []

    return symptom.relatedSymptoms
        .map((relatedId) => {
            return symptoms.find((s) => s.id === relatedId)
        })
        .filter(Boolean)
}

// Get possible conditions for a set of symptoms
export const getPossibleConditions = (symptomIds) => {
    if (!symptomIds.length) return []

    // Get all conditions from the selected symptoms
    const allConditions = symptomIds.flatMap((id) => {
        const symptom = getSymptomById(id)
        return symptom ? symptom.possibleConditions : []
    })

    // Count occurrences of each condition
    const conditionCounts = allConditions.reduce((acc, condition) => {
        acc[condition.name] = (acc[condition.name] || 0) + 1
        return acc
    }, {})

    // Remove duplicates and sort by relevance (number of matching symptoms)
    const uniqueConditions = [...new Map(allConditions.map((item) => [item.name, item])).values()]

    return uniqueConditions.sort((a, b) => conditionCounts[b.name] - conditionCounts[a.name])
}
