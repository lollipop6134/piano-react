import React, { useState, useEffect } from "react";
import "./testConstructor.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import LanguageSwitcher from "../../components/languageSwitcher/languageSwitcher";
import { QuizzeComponent } from "../../components/quizzeComponent/quizzeComponent";
import {source} from '../../source';

export interface Test {
  id: number;
  lesson_id: number;
  question_order: number;
  question: string;
  options: string[];
  correct_answer: string;
  image: string;
}

const TestConstructor: React.FC = () => {
  const [test, setTest] = useState<Test[]>([]);
  const { t } = useTranslation();
  const { id: lesson_id } = useParams<{ id: string }>();

  useEffect(() => {
    const lang = i18n.language;
    axios.get(`${source}/quizzes`, {
        params: { lesson_id, lang },
      })
      .then((response) => response.data)
      .then((data) => setTest(data as Test[]))
      .catch((error) => console.error("Error:", error));
  }, [lesson_id]);

  async function addQuizze() {
    const question_order = test.length + 1;
    try {
      const response = await axios.post(`${source}/addQuizzes`, { question_order, lesson_id });
      return response.data;
    } catch (error) {
      console.error('Error adding question: ', error);
      throw error;
    } finally {
      window.location.reload();
    }
  };

  return (
    <div id="testConst">
      <div id='langButton'>{t('edited-lang')} &nbsp;<LanguageSwitcher /></div>
      {test
      .sort((a, b) => a.question_order - b.question_order)
      .map((question, index) => (
        <QuizzeComponent questionUnit={question} key={index} lesson_id={parseInt(lesson_id!)}/>
      ))}
      <button id='addChord' onClick={addQuizze}>+</button>
      <Footer />
    </div>
  );
};

export default TestConstructor;
