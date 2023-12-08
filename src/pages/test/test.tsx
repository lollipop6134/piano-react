import React, { useState, useEffect } from "react";
import "./test.css"
import { Link } from "react-router-dom";
import { supabase } from '../../supabaseClient';

type Props = {
  id: number;
  session: any;
};

interface Test {
  question: string;
  answers: string[];
  correctAnswer: string;
  image: string;
}

const Test: React.FC<Props> = ({ id, session }) => {
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

async function addToCompletedLessons() {
  const { data, error } = await supabase
  .from('Users')
  .select('completedLessons')
  .eq('email', session.user.email);

  if (error) {
      alert(error.message)
  } else {
      const currentCompletedLessons = data?.[0].completedLessons || [];

      if (!currentCompletedLessons.includes(id)) {
      const updatedCompletedLessons = [...currentCompletedLessons, id];
      const { error } = await supabase
      .from('Users')
      .update({ completedLessons: updatedCompletedLessons})
      .eq('email', session.user.email)
    
      if (error) {
          alert(error.message)
      }
      }
}}

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
      if (test!.length / score < 2 ) {
        addToCompletedLessons()
      }
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
          <img src={`/images/${test?.[questionIndex].image}.webp`} alt="question" id="testImage" />
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
            <img src={`images/${completeImage}.webp`} id="completeImage" alt="Cute Capy"/>
            ) : (
            <img src='images/notFound.png' alt="sad capy" id="sadCapy"/>
            )}
            <div>Your score: {score}/{test!.length}</div>
            <Link to="/lessons" className="main-button" onClick={() => {localStorage.setItem('practiceMode', "false")}}>Lessons</Link>
        </div>
      )}
    </div>
  );
};

export default Test;
