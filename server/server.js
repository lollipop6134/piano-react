const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.BACKEND_PORT || 3001;

const backendStart = "/backend";

const corsOptions = {
  origin: process.env.FRONTEND_LINK,
  optionsSuccessStatus: 200, 
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get(`${backendStart}/lessons`, async (req, res) => { //ОК
  const { id, lang } = req.query;
  try {
    const connection = await pool.getConnection();
    let result;
    if (id) {
      [result] = await connection.execute(
        `SELECT *, title_${lang} as title, information_${lang} as information, subtitle_${lang} as subtitle,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT(
              'comment', lc.comment,
              'username', u.username,
              'created_at', lc.created_at,
              'image', u.image,
              'comment_id', lc.comment_id,
              'user_id', u.user_id
        )) 
        FROM lessoncomments lc
        JOIN users u ON lc.user_id = u.user_id
        WHERE lc.lesson_id = lessons.id) AS comments
        FROM lessons
        WHERE lessons.id = ?`, [id]);
    } else {
      [result] = await connection.execute(`SELECT id, subtitle_${lang} AS subtitle FROM lessons`);
    }
    res.json(result);
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get(`${backendStart}/notes`, async (req, res) => { //ОК
  const { lang } = req.query;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`SELECT *, keyboard_${lang} as keyboard FROM notes`);
    res.json(result);
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get(`${backendStart}/chords`, async (req, res) => { //ОК
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT * FROM chords');
    res.json(result);
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get(`${backendStart}/users`, async (req, res) => { //ОК
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT email, email_verified FROM users');
    res.json(result);
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get(`${backendStart}/quizzes`, async (req, res) => { //ОК
  const { lesson_id, lang } = req.query;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`SELECT *, question_${lang} AS question, options_${lang} AS options, correct_answer_${lang} AS correct_answer FROM quizzes WHERE lesson_id = ?`, [lesson_id]);
    res.json(result);
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post(`${backendStart}/addQuizzes`, async (req, res) => { //ОК
  const { question_order, lesson_id } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute(`INSERT INTO quizzes 
                             (lesson_id, question_order, question_en, options_en, correct_answer_en, image, question_ru, options_ru, correct_answer_ru)
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                             [lesson_id, question_order, 'Question', JSON.stringify(['1', '2', '3', '4']), '1',
                             'someCapy.webp', 'Вопрос', JSON.stringify(['1', '2', '3', '4']), '1']);
    res.status(200).send('Question added successfully!');
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Couldn't add a question" });
  }
});

app.get(`${backendStart}/user/:userId`, async (req, res) => { //ОК
  const { userId } = req.params;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT u.user_id, u.username, u.email, u.status, u.image,
    COALESCE((SELECT JSON_ARRAYAGG(cl.lesson_id) FROM completedlessons cl WHERE cl.user_id = u.user_id), '[]') AS completedlessons
    FROM users u
    WHERE u.user_id = ?`, [userId]);
    // Получаем пользователя и преобразуем completedlessons в массив
    const user = result[0];
    if (user && user.completedlessons) {
      user.completedlessons = JSON.parse(user.completedlessons);
    }
    res.json(user);
    connection.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get(`${backendStart}/user_sounds`, (req, res) => { //ОК
  const soundsDirectory = path.join(__dirname, `${process.env.STORAGE_PATH}/audio/users`);
  const { fileName } = req.query;
  if (!fileName) {
    return res.status(400).json({ error: 'File name is required' });
  }
  const filePath = path.join(soundsDirectory, fileName);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.json({ exists: false });
    }
    res.json({ exists: true });
  });
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendPasswordEmail } = require('./emailService');
const { v4: uuidv4 } = require('uuid');

app.post(`${backendStart}/register`, async (req, res) => { //ОК
  const { email, password, username } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO users (email, password, username, status, image, email_verification_token) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, username, 'user', 'BasicAvatar.jpg', verificationToken]
    );
    sendVerificationEmail(email, verificationToken);
    res.status(201).json({ message: 'Пожалуйста, подтвердите ваш email для завершения регистрации.' });
    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post(`${backendStart}/forgot-password`, async (req, res) => {
  const { email } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0) {
      return res.status(400).json({ message: 'Email не найден' });
    }
    const token = uuidv4();
    const password_reset_expires = Date.now() + 3600000; // 1 час
    await connection.execute(
      'UPDATE users SET password_reset_token = ?, password_reset_expires = ? WHERE email = ?',
      [token, password_reset_expires, email]
    );
    sendPasswordEmail(email, token);
    res.status(200).json({ message: 'Письмо для сброса пароля отправлено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post(`${backendStart}/reset-password`, async (req, res) => {
  const { token, password } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE password_reset_token = ? AND password_reset_expires > ?', [token, Date.now()]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password = ?, password_reset_token = NULL, password_reset_expires = NULL WHERE password_reset_token = ?',
      [hashedPassword, token]);
    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get(`${backendStart}/verify-email`, async (req, res) => { //ОК
  const { token } = req.query;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('UPDATE users SET email_verified = true WHERE email_verification_token = ?', [token]);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.redirect(`${process.env.FRONTEND_LINK}/account`);
    connection.release();
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post(`${backendStart}/login`, async (req, res) => { //ОК
  const { email, password } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0) {
      return res.status(401).json({ message: 'Пользователь с такой почтой не найден' });
    }
    const user = result[0];
    if (!user.email_verified) {
      return res.status(401).json({ message: 'Пожалуйста, подтвердите ваш email' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }
    const token = jwt.sign(
      {
        id: user.user_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
    res.status(200).json({ token });
    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post(`${backendStart}/completeLesson`, async (req, res) => { //ОК
  const { userId, lessonId } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute('INSERT INTO completedlessons (user_id, lesson_id) VALUES (?, ?)', [userId, lessonId]);
    res.status(200).send('Lesson completed successfully');
    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post(`${backendStart}/deleteLesson`, async (req, res) => { //ОК
  const { lessonId } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM completedlessons WHERE lesson_id = ?', [lessonId]);
    await connection.execute('DELETE FROM lessons WHERE id = ?', [lessonId]);
    await connection.execute('UPDATE lessons SET id = id - 1 WHERE id > ?', [lessonId]);
    await connection.execute('UPDATE completedlessons SET lesson_id = lesson_id - 1 WHERE lesson_id > ?', [lessonId]);
    res.status(200).send('Lesson deleted successfully');
    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post(`${backendStart}/deleteQuizzes`, async (req, res) => { //ОК
  const { lesson_id, question_order } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM quizzes WHERE lesson_id = ? AND question_order = ?', [lesson_id, question_order]);
    await connection.execute('UPDATE quizzes SET question_order = question_order - 1 WHERE lesson_id = ? AND question_order > ?', [lesson_id, question_order]);
    res.status(200).send('Question deleted successfully');
    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post(`${backendStart}/deleteChord`, async (req, res) => { //ОК
  const { id } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM chords WHERE id = ?', [id]);
    res.status(200).send('Chord deleted successfully');
    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post(`${backendStart}/addLesson`, async (req, res) => { //ОК
  const connection = await pool.getConnection();
  const {lessonId} = req.body;
  try {
    await connection.execute(`INSERT INTO lessons (id, subtitle_en, title_en, practice_image, notes, information_en, lesson_images, is_random_notes, is_test,
                        subtitle_ru, title_ru, information_ru)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [lessonId, `Lesson ${lessonId}`, `Lesson ${lessonId}`, [], [],
                        ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4", "Paragraph 5 (optional)"],
                        ['Lesson12.webp', 'Main2.webp', 'someCapy.webp'], false, false, `Урок ${lessonId}`, `Урок ${lessonId}`,
                        ["Абзац 1", "Абзац 2", "Абзац 3", "Абзац 4", "Абзац 5 (необязательный)"]]);
    res.status(200).send('Lesson add successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Couldn't add a lesson"});
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/addChord`, async (req, res) => { //ОК
  const connection = await pool.getConnection();
  try {
    await connection.query(`INSERT INTO chords (chord, image, audio) VALUES (?, ?, ?)`, ['chord', 'someCapy.webp', 'someAudio.mp3']);
    res.status(200).send('Chord add successfully!');
  } catch (error) {
    res.status(500).json({message: "Couldn't add a chord"});
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/editLesson`, async (req, res) => { //ОК
  const connection = await pool.getConnection();
  const {subtitle, title, information, lessonId, lessonImages, lessonNotes, isRandomNotes, times_repeat, isHint, hintImage, practiceImage, lang, isTest} = req.body;
  const params = [
    subtitle, title, information, lessonImages, lessonNotes, isRandomNotes,
    times_repeat, isHint, hintImage, practiceImage, isTest, lessonId
  ].map(param => param === undefined ? null : param);
  try {
    await connection.execute(`UPDATE lessons SET 
                          subtitle_${lang} = ?,
                          title_${lang} = ?,
                          information_${lang} = ?,
                          lesson_images = ?,
                          notes = ?,
                          is_random_notes = ?,
                          times_repeat = ?,
                          is_hint = ?,
                          hint_image = ?,
                          practice_image = ?,
                          is_test = ?
                          where id = ?`,
                          params);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Couldn't edit the lesson"})
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/editChord`, async (req, res) => { //ОК
  const connection = await pool.getConnection();
  const {chordName, image, audio, chord_id} = req.body;
  try {
    await connection.execute(`UPDATE chords SET chord = ?, image = ?, audio = ? where id = ?`, [chordName, image, audio, chord_id]);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Couldn't edit the chord"});
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/editQuizzes`, async (req, res) => { //ОК
  const connection = await pool.getConnection();
  const { lesson_id, question_order, lang, question, options, correct_answer, image } = req.body;
  try {
    await connection.execute(`UPDATE quizzes SET
                        question_${lang} = ?,
                        options_${lang} = ?,
                        correct_answer_${lang} = ?,
                        image = ?
                        WHERE lesson_id = ? AND question_order = ?`,
                        [question, options, correct_answer, image, lesson_id, question_order]);
    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Couldn't edit the question" });
  } finally {
    connection.release();
  }
});

const iconv = require('iconv-lite');

const storageChords = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.STORAGE_PATH}/images/chords/`);
  },
  filename: (req, file, callback) => {
    const encodedName = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8');
    callback(null, encodedName);
  },
});

const storageChordsAudio = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.STORAGE_PATH}/audio/chords/`);
  },
  filename: (req, file, callback) => {
    const encodedName = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8');
    callback(null, encodedName);
  },
});

const storageUsers = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.STORAGE_PATH}/images/users/`);
  },
  filename: (req, file, callback) => {
    const encodedName = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8');
    callback(null, encodedName);
  },
});

const storageLessons = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.STORAGE_PATH}/images/`);
  },
  filename: (req, file, callback) => {
    const encodedName = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8');
    callback(null, encodedName);
  },
});

const storageTests = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.STORAGE_PATH}/images/quizzes/`);
  },
  filename: (req, file, callback) => {
    const encodedName = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8');
    callback(null, encodedName);
  },
});

const storageUserNotes = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.STORAGE_PATH}/audio/users/`);
  },
  filename: (req, file, callback) => {
    // Временно назначаем имя файла
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadUsers = multer({ storage: storageUsers });
const uploadLessons = multer({ storage: storageLessons });
const uploadChords = multer({ storage: storageChords });
const uploadChordsAudio = multer({ storage: storageChordsAudio });
const uploadTests = multer({ storage: storageTests });
const uploadUserNotes = multer({ storage: storageUserNotes });

app.post(`${backendStart}/uploadChords`, uploadChords.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.post(`${backendStart}/uploadTests`, uploadTests.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.post(`${backendStart}/uploadChordsAudio`, uploadChordsAudio.single('audio'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.post(`${backendStart}/uploadUsers`, uploadUsers.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.post(`${backendStart}/uploadLessons`, uploadLessons.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.post(`${backendStart}/uploadUserNotes`, uploadUserNotes.single('audio'), (req, res) => { //ОК
  const oldPath = req.file.path;
  const newFileName = `${req.body.name}_${req.body.email}.mp3`;
  const newPath = path.join(req.file.destination, newFileName);
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при переименовании файла' });
    }
    res.json({ message: 'Файл успешно загружен и переименован' });
  });
});

app.post(`${backendStart}/changeUsername`, async (req, res) => { //ОК
  const {user_id, new_username} = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.execute('UPDATE users SET username = ? WHERE user_id = ?', [new_username, user_id]);
    res.status(200).send('Username changed!');
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/changeAvatar`, async (req, res) => { //ОК
  const {user_id, new_image} = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.execute('UPDATE users SET image = ? WHERE user_id = ?', [new_image, user_id]);
    res.status(200).send('Avatar changed!');
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/deleteUser`, async (req, res) => { //ОК
  const {user_id} = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.execute(`DELETE FROM completedlessons WHERE user_id = ?`, [user_id]);
    await connection.execute(`DELETE FROM lessoncomments WHERE user_id = ?`, [user_id]);
    await connection.execute(`DELETE FROM users WHERE user_id = ?`, [user_id]);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error' });
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/deleteComment`, async (req, res) => { //ОК
  const { commentId } = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.execute('DELETE FROM lessoncomments WHERE comment_id = ?', [commentId]);
    res.status(200).send('Comment deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error' });
  } finally {
    connection.release();
  }
});

app.post(`${backendStart}/addComment`, async (req, res) => {
  const connection = await pool.getConnection();
  const { userId, id, newComment } = req.body;

  try {
    // Вставляем новый комментарий в базу данных
    const [result] = await connection.execute(
      'INSERT INTO lessoncomments (user_id, lesson_id, comment) VALUES (?, ?, ?)',
      [userId, id, newComment]
    );
    const commentId = result.insertId;
    // Извлекаем данные нового комментария вместе с данными пользователя
    const [rows] = await connection.execute(
      `SELECT lc.comment_id, lc.comment, lc.created_at, u.username, u.image, lc.user_id
       FROM lessoncomments lc
       JOIN users u ON lc.user_id = u.user_id
       WHERE lc.comment_id = ?`,
      [commentId]
    );
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    connection.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
