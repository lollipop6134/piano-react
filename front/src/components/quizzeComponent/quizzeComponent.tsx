import React, { useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { Test } from "../../pages/testConstructor/testConstructor";
import axios from "axios";
import i18n from "../../i18n";
import {source} from '../../source';

export const QuizzeComponent = ({questionUnit, lesson_id}: {questionUnit: Test, lesson_id: number}) => {

  const { t } = useTranslation();
  const [isSure, setIsSure] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [questionText, setQuestionText] = useState<string | null>(null);
  const [options, setOptions] = useState<string[] | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    setQuestionText(questionUnit.question);
    setImage(questionUnit.image);
    setOptions(questionUnit.options);
    setCorrectAnswer(questionUnit.correct_answer);
  }, [questionUnit]);

  async function deleteQuizze(question_order: number) {
    try {
      const response = await axios.post(`${source}/deleteQuizzes`, { question_order, lesson_id });
      return response.data;
    } catch (error) {
      console.error('Error deleting question: ', error);
      throw error;
    } finally {
      window.location.reload();
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setImageUrl(URL.createObjectURL(selectedFile));
      setImage(selectedFile.name);
      setImageFile(selectedFile);
    }
  };

  async function editQuizze() {
    const imageFormData = new FormData();
    const question_order = questionUnit.question_order;
    const lang = i18n.language;
    const question = questionText;
    const correct_answer = correctAnswer;
    imageFormData.append('image', imageFile!);
    try {
        await axios.post(`${source}/uploadTests`, imageFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
        return;
    }
    try {
        const response = await axios.post(`${source}/editQuizzes`,
        { lesson_id, lang, question, options, correct_answer, image, question_order});
        return response.data;
    } catch (error) {
        console.error('Error editing chord: ', error);
        throw error;
    } finally {
      window.location.reload();
    }
};

const handleOptionChange = (index: number, value: string) => {
    if (options) {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      setOptions(updatedOptions);
    }
  };
  
  return (
    <div id="questionConst">
      <div id="questionConstTitle">
        {questionUnit.question_order}. &nbsp;
        <input
          type="text"
          value={questionText || ''}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        {!isSure ? (
          <button onClick={() => setIsSure(true)} id="deleteQuizze">{t('delete')}</button>
        ) : (
          <button style={{ color: 'beige' }} id="deleteQuizze" onClick={() => deleteQuizze(questionUnit.question_order)}>{t('sure')}</button>
        )}
      </div>
      <div id="testConstImage">
      <img src={imageUrl || (image === questionUnit?.image ? `/images/quizzes/${questionUnit.image}` : image!)} alt="question" id="testImage"/>
      <input type='file' onChange={handleImageChange} accept='image/*'></input>
        <span>{t('choose-image')}</span>
      </div>
      <div id="optionsConst">
        {options && options.map((option, optionIndex) => (
          <div key={optionIndex}>
            {optionIndex + 1}.
            <input
              type="text"
              value={options![optionIndex] || ''}
              onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div id="correctAnswerConst">
        {t('correct-answer')} &nbsp;
        <input
          type="text"
          value={correctAnswer || ''}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>
      { (questionUnit.question !== questionText || questionUnit.image !== image
      || questionUnit.options !== options || questionUnit.correct_answer !== correctAnswer) &&
        <button id="editChord" onClick={editQuizze}>{t('save-changes')}</button>
      }
    </div>
  );
};