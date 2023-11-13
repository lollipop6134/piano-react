import React, { useState } from "react";
import data from "../../data/questions.json";
import "./test.css"
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lxbcgtsajrvcgbuyizck.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmNndHNhanJ2Y2didXlpemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTkwNTcsImV4cCI6MjAxNTA5NTA1N30.Ey3PDIXgcVqGtU1GAWCPMAKuDgLOC7BhtajQ_bHV5NI");

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

  const completeImages = ['Capy1', 'Capy2', 'Capy3', 'Capy4', 'Capy5', 'Capy6', 'Capy7'];
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
          <img src={supabase.storage.from("images").getPublicUrl(`${questions[questionIndex].image}.webp`).data.publicUrl} alt="question" id="testImage" />
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
            <img src={supabase.storage.from("images").getPublicUrl(`${completeImage}.webp`).data.publicUrl} id="completeImage" alt="Cute Capy"/>
            ) : (
            <img src={supabase.storage.from("images").getPublicUrl(`notFound.png`).data.publicUrl} alt="sad capy" id="sadCapy"/>
            )}
            <div>Your score: {score}/{questions.length}</div>
            <Link to="/lessons" className="main-button" onClick={() => {localStorage.setItem('practiceMode', "false")}}>Lessons</Link>
        </div>
      )}
    </div>
  );
};

export default Test;
