"use client"

import { useState, useEffect } from "react"
import { symptoms, getSymptomById, getRelatedSymptoms, getPossibleConditions } from "../../data/symptoms"
import Header from "../../components/Header"
import "./SymptomChecker.css"

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [relatedSymptoms, setRelatedSymptoms] = useState([])
    const [conditions, setConditions] = useState([])
    const [chatHistory, setChatHistory] = useState([
        {
            type: "bot",
            message: "Hello! I'm your symptom checker assistant. What symptoms are you experiencing today?",
        },
    ])
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        if (selectedSymptoms.length > 0) {
            const related = selectedSymptoms.flatMap((symptomId) => {
                return getRelatedSymptoms(symptomId)
            })

            const uniqueRelated = related.filter(
                (symptom) =>
                    symptom && !selectedSymptoms.includes(symptom.id) && !relatedSymptoms.some((s) => s.id === symptom.id),
            )

            setRelatedSymptoms(uniqueRelated)

            const possibleConditions = getPossibleConditions(selectedSymptoms)
            setConditions(possibleConditions)
        } else {
            setRelatedSymptoms([])
            setConditions([])
        }
    }, [selectedSymptoms])

    const handleSymptomSelect = (symptomId) => {
        const symptom = getSymptomById(symptomId)

        if (!symptom) return

        setSelectedSymptoms([...selectedSymptoms, symptomId])

        setChatHistory([
            ...chatHistory,
            { type: "user", message: `I have ${symptom.name.toLowerCase()}.` },
            {
                type: "bot",
                message: `I see you're experiencing ${symptom.name.toLowerCase()}. Are you experiencing any of these related symptoms?`,
            },
        ])
    }

    const handleRelatedSymptomSelect = (symptomId) => {
        const symptom = getSymptomById(symptomId)

        if (!symptom) return

        setSelectedSymptoms([...selectedSymptoms, symptomId])

        setRelatedSymptoms(relatedSymptoms.filter((s) => s.id !== symptomId))

        setChatHistory([...chatHistory, { type: "user", message: `Yes, I also have ${symptom.name.toLowerCase()}.` }])
    }

    const handleShowResults = () => {
        setChatHistory([
            ...chatHistory,
            {
                type: "bot",
                message:
                    "Based on the symptoms you've described, here are some possible conditions. Remember, this is not a diagnosis. Please consult with a healthcare professional for proper evaluation.",
            },
        ])

        setShowResults(true)
    }

    // Handle restart
    const handleRestart = () => {
        setSelectedSymptoms([])
        setRelatedSymptoms([])
        setConditions([])
        setShowResults(false)
        setChatHistory([
            {
                type: "bot",
                message: "Hello! I'm your symptom checker assistant. What symptoms are you experiencing today?",
            },
        ])
    }

    return (
        <div className="symptom-checker">
            <Header />

            <div className="container checker-container">
                <div className="checker-header">
                    <h2>Symptom Checker</h2>
                    <p>Select your symptoms to get possible conditions and recommendations</p>
                </div>

                <div className="checker-content">
                    <div className="checker-chat">
                        <div className="chat-messages">
                            {chatHistory.map((chat, index) => (
                                <div key={index} className={`chat-message ${chat.type === "bot" ? "bot" : "user"}`}>
                                    <div className="message-content">{chat.message}</div>
                                </div>
                            ))}
                        </div>

                        {!showResults && (
                            <div className="chat-options">
                                {selectedSymptoms.length === 0 ? (
                                    <div className="symptom-options">
                                        <h4>Select a symptom:</h4>
                                        <div className="options-grid">
                                            {symptoms.map((symptom) => (
                                                <button key={symptom.id} className="option-btn" onClick={() => handleSymptomSelect(symptom.id)}>
                                                    {symptom.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="related-options">
                                        <h4>Do you also have any of these symptoms?</h4>
                                        <div className="options-grid">
                                            {relatedSymptoms.map((symptom) => (
                                                <button
                                                    key={symptom.id}
                                                    className="option-btn"
                                                    onClick={() => handleRelatedSymptomSelect(symptom.id)}
                                                >
                                                    {symptom.name}
                                                </button>
                                            ))}
                                            <button className="option-btn results-btn" onClick={handleShowResults}>
                                                No, show me possible conditions
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {showResults && (
                            <div className="results-section">
                                <h3>Possible Conditions</h3>

                                {conditions.length === 0 ? (
                                    <p className="no-results">
                                        No specific conditions found based on your symptoms. Please consult with a healthcare professional
                                        for proper evaluation.
                                    </p>
                                ) : (
                                    <div className="conditions-list">
                                        {conditions.map((condition, index) => (
                                            <div key={index} className="condition-card">
                                                <h4>{condition.name}</h4>
                                                <p className="condition-description">{condition.description}</p>
                                                <div className="condition-recommendation">
                                                    <h5>Recommendation:</h5>
                                                    <p>{condition.recommendation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="results-actions">
                                    <button className="btn btn-primary" onClick={handleRestart}>
                                        Start Over
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="selected-symptoms">
                        <h3>Selected Symptoms</h3>

                        {selectedSymptoms.length === 0 ? (
                            <p className="no-symptoms">No symptoms selected yet.</p>
                        ) : (
                            <ul className="symptoms-list">
                                {selectedSymptoms.map((symptomId) => {
                                    const symptom = getSymptomById(symptomId)
                                    return (
                                        <li key={symptomId} className="symptom-item">
                                            {symptom.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                        <div className="disclaimer">
                            <h4>Disclaimer</h4>
                            <p>
                                This symptom checker is for informational purposes only and is not a qualified medical opinion. Always
                                consult with a healthcare professional for proper diagnosis and treatment. Visit our clinic for proper medical guidance!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SymptomChecker
