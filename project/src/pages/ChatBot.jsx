import React, { useState, useEffect } from 'react';

const QuizComponent = () => {
    // Define state for each question's answer
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [symptom1, setSymptom1] = useState('');
    const [symptom2, setSymptom2] = useState('');
    const [symptom3, setSymptom3] = useState('');

    // Track current question index
    const [questionIndex, setQuestionIndex] = useState(0);
    const [typedQuestion, setTypedQuestion] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);

    // State for predicted disease
    const [predictedDisease, setPredictedDisease] = useState('');

    // Define the questions and inputs
    const questions = [
        {
            question: "What's your age?",
            inputType: 'number',
            setter: setAge,
            value: age
        },
        {
            question: "Write your gender (Male/Female)",
            inputType: 'text',
            setter: setGender,
            value: gender
        },
        {
            question: "Write your country",
            inputType: 'text',
            setter: setCountry,
            value: country
        },
        {
            question: "Write the first symptom",
            inputType: 'text',
            setter: setSymptom1,
            value: symptom1
        },
        {
            question: "Write the second symptom",
            inputType: 'text',
            setter: setSymptom2,
            value: symptom2
        },
        {
            question: "Write the third symptom",
            inputType: 'text',
            setter: setSymptom3,
            value: symptom3
        }
    ];

    // Handle form submission
    const handleSubmit = async () => {
        const data = {
            Age: age,
            Gender: gender,
            Country: country,
            'Symptom 1': symptom1,
            'Symptom 2': symptom2,
            'Symptom 3': symptom3
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result); // Handle the result as needed

            // Set the predicted disease
            if (result && result.Disease) {
                setPredictedDisease(result.Disease); // Assuming the response contains a field 'disease'
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    // Move to the next question with typing effect
    const nextQuestion = () => {
        if (questionIndex < questions.length - 1) {
            setTypingIndex(0); // Reset typing effect
            setTypedQuestion(''); // Clear the typed question effect
            setQuestionIndex(questionIndex + 1);
        } else {
            handleSubmit(); // Submit data when the last question is answered
        }
    };

    // Typing effect for each question
    useEffect(() => {
        if (questionIndex < questions.length) {
            const questionText = questions[questionIndex].question;
            const typingTimer = setInterval(() => {
                setTypedQuestion((prev) => prev + questionText[typingIndex]);
                setTypingIndex(typingIndex + 1);
            }, 50); // Adjust typing speed here

            // Stop the typing effect once it's complete
            if (typingIndex === questionText.length) {
                clearInterval(typingTimer);
            }

            return () => clearInterval(typingTimer);
        }
    }, [questionIndex, typingIndex]);

    return (
        <div className="flex items-center justify-center min-h-screen h-[90vh] bg-gray-100 p-4">
            <div className="flex w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
                {/* Left Image Section */}
                <div className="w-1/2 hidden sm:block p-4">
                    <img
                        src="https://etimg.etb2bimg.com/photo/50062376.cms"
                        alt="Health Prediction"
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>

                {/* Right Form Section */}
                <div className="w-full sm:w-1/2 p-4">
                    <h2 className="text-3xl font-bold text-center mb-6">Health Prediction</h2>

                    <div className="mb-4">
                        <p className="text-lg mb-2">{typedQuestion}</p>
                        <input
                            type={questions[questionIndex].inputType}
                            value={questions[questionIndex].value}
                            onChange={(e) => questions[questionIndex].setter(e.target.value)}
                            placeholder="Enter your answer"
                            className="input input-bordered w-full p-3 text-lg"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={nextQuestion}
                            className="btn btn-primary w-full mt-4"
                        >
                            {questionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                        </button>
                    </div>

                    {/* Display predicted disease */}
                    {predictedDisease && (
                        <div className="mt-6 p-4 bg-green-100 text-center rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">Predicted Disease:</h3>
                            <p className="text-2xl font-bold text-red-600">{predictedDisease}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizComponent;
