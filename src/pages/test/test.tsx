import React, { useState } from "react";
import data from "../../data/questions.json";
import "./test.css"
import { Link } from "react-router-dom";

type Props = {
  id: number;
};

const Test: React.FC<Props> = ({ id }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [correctlyAnswered, setCorrectlyAnswered] = useState<boolean | null>(null);
  const questions = data;

  const completeImages = ['Capy1', 'Capy4', 'Capy8', 'Capy9', 'Capy14', 'Capy15', 'Capy16'];
  const completeImage = completeImages[Math.floor(Math.random() * completeImages.length)];

  const handleAnswer = (answer: string) => {
    const correctAnswer = questions[questionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;
  
    if (isCorrect) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, answer]);
    setCorrectlyAnswered(isCorrect);
  
    if (questionIndex < questions.length - 1) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        setCorrectlyAnswered(null);
      }, 1500);
    } else {
      setTimeout(() => {
        setTestCompleted(true);
      }, 1500);
    }
  };

  return (
    <div id="test">
      {!testCompleted ? (
        <div>
          <div id="question">{questionIndex+1}. {questions[questionIndex].question}</div>
          <img src={`../images/${questions[questionIndex].image}.jpg`} alt="question" id="testImage" />
          <div id="answers">
          {questions[questionIndex].answers.map((answer, index) => (
            <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={correctlyAnswered === null ? '' : (answer === questions[questionIndex].correctAnswer ? 'correct' : 'incorrect')}
            >
              {answer}
            </button>
          ))}
          </div>
        </div>
      ) : (
        <div className="container column">
            <div id="question">{(questions.length / score) < 2 ? "Test complete!" : "You can do better!"}</div>
            {(questions.length / score) < 2 ? (
            <img src={`/images/${completeImage}.jpg`} id="completeImage" alt="Cute Capy"/>
            ) : (
            <img src="/images/notFound.png" alt="sad capy" id="sadCapy"/>
            )}
            <div>Your score: {score}/{questions.length}</div>
            <Link to="/lessons" className="main-button" onClick={() => {localStorage.setItem('practiceMode', "false")}}>Lessons</Link>
        </div>
      )}
    </div>
  );
};

export default Test;
