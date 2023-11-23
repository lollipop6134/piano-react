import React, { useState, useEffect } from "react";
import "./test.css"
import { Link } from "react-router-dom";
import { supabase } from '../../supabaseClient';

type Props = {
  id: number;
};

interface Test {
  question: string;
  answers: string[];
  correctAnswer: string;
  image: string;
}

const Test: React.FC<Props> = ({ id }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [correctlyAnswered, setCorrectlyAnswered] = useState<boolean | null>(null);
  const [test, setTest] = useState<Test[] | null>(null);

  const completeImages = ['Capy1', 'Capy2', 'Capy3', 'Capy4', 'Capy5', 'Capy6', 'Capy7'];
  const completeImage = completeImages[Math.floor(Math.random() * completeImages.length)];

  async function getTest() {
    const { data } = await supabase.from("Test_1").select();
    setTest(data);
}

useEffect(() => {
      getTest();
}, [])

  const handleAnswer = (answer: string) => {
    const correctAnswer = test?.[questionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;
  
    if (isCorrect) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, answer]);
    setCorrectlyAnswered(isCorrect);
  
    if (questionIndex < test!.length - 1) {
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
          <div id="question">{questionIndex+1}. {test?.[questionIndex].question}</div>
          <img src={supabase.storage.from("images").getPublicUrl(`${test?.[questionIndex].image}.webp`).data.publicUrl} alt="question" id="testImage" />
          <div id="answers">
          {test?.[questionIndex].answers.map((answer, index) => (
            <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={correctlyAnswered === null ? '' : (answer === test?.[questionIndex].correctAnswer ? 'correct' : 'incorrect')}
            >
              {answer}
            </button>
          ))}
          </div>
        </div>
      ) : (
        <div className="container column">
            <div id="question">{(test!.length / score) < 2 ? "Test complete!" : "You can do better!"}</div>
            {(test!.length / score) < 2 ? (
            <img src={supabase.storage.from("images").getPublicUrl(`${completeImage}.webp`).data.publicUrl} id="completeImage" alt="Cute Capy"/>
            ) : (
            <img src={supabase.storage.from("images").getPublicUrl(`notFound.png`).data.publicUrl} alt="sad capy" id="sadCapy"/>
            )}
            <div>Your score: {score}/{test!.length}</div>
            <Link to="/lessons" className="main-button" onClick={() => {localStorage.setItem('practiceMode', "false")}}>Lessons</Link>
        </div>
      )}
    </div>
  );
};

export default Test;
