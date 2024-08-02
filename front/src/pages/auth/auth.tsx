import React, { useState } from 'react';
import { Footer } from '../../components/footer/footer';
import "./auth.css";
import { login, register, fetchUserData, parseJwt } from '../../AuthService';
import { useAuth } from '../../UserContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {source} from '../../source';

export default function Auth() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuth();

  const isValidEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ru|by|kz)$/;
    return emailRegex.test(email);
  };

  const isSpecialSymbol = (input:string) => {
    const format = /[!#$%&*()+=[\]{};':"\\|,<>/?]+/;
    return format.test(input)
  };

  const handleAuthSubmit = async () => {
    try {
      const response = await axios.get(`${source}/users`);
      const users = response.data;
      if (!isValidEmail(email)) {
        setErrorMessage(t('email-warning'));
        return;
      } else if (password.length < 6) {
        setErrorMessage(t('password-warning'));
        return;
      } else if (isSpecialSymbol(email) || isSpecialSymbol(password) || isSpecialSymbol(username)) {
        setErrorMessage(t('special-symbols'));
        return;
      }
      if (isSignUp) {
        if (users.some(obj => obj.email === email)) {
          setErrorMessage(t('email-exists'));
          return;
        } else if (username.length < 3) {
          setErrorMessage(t('username-warning'));
          return;
        }
        const token = await register(email, password, username);
        if (token) {
          const userData = await fetchUserData(parseJwt().id);
          setUser(userData);
        }
      } else {
        if (!users.some(obj => obj.email === email)) {
          setErrorMessage(t('email-not-exists'));
          return;
        }
        // else if (users.some(obj => obj.email === email) && users.some(obj => obj.email_verified === 0)) {
        //   setErrorMessage(t('confirm-email'));
        //   return;
        // }
        const token = await login(email, password);
        if (token) {
          const userData = await fetchUserData(parseJwt().id);
          setUser(userData);
        } else {
          setErrorMessage(t('incorrect-password'));
          return;
        }
      }
      setEmail('');
      setPassword('');
      setUsername('');
      setErrorMessage('');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const forgotPassword = async (email) => {
    if (!isValidEmail(email)) {
      setErrorMessage(t('email-warning'));
      return;
    }
    try {
      await axios.post(`${source}/forgot-password`, { email });
      window.alert(t('password-email-send'));
    } catch (error) {
      window.alert(t('password-email-error'));
    }
  };

  const handleForgotPasswordClick = () => {
    forgotPassword(email);
  };

  return (
    <>
        <img src='/images/Vector5.png' alt="vector 5" className='vector' id="formVector"/>
        <div id="form">
            <div className="header">{isSignUp ? t('signup') : t('signin')}</div>
            <div id='inputs'>
            <input
              type="email"
              placeholder={t('your-email')}
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isSignUp && <input
              type="text"
              placeholder={t('create-username')}
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />}
            <div>
              <input
                type= {isHidePassword ? "password" : "text"}
                placeholder={t('your-password')}
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={`images/${(isHidePassword ? 'eye.webp' : 'hide.webp')}`}
                alt='show/hide password' id='eye'
                onClick={() => {setIsHidePassword(!isHidePassword)}}/>
            </div>
            { !isSignUp && <div id='changePassword' onClick={handleForgotPasswordClick}>{t('forgot-password')}</div> }
            <button onClick={handleAuthSubmit}> {isSignUp ? t('signup') : t('signin')} </button>
            {errorMessage && <div id="errorMessage">{errorMessage}</div>}
            </div>
        </div>
        <div id="formButtons">
            <button onClick={() => setIsSignUp(true)}>{t('signup')}</button>
            <button onClick={() => setIsSignUp(false)}>{t('signin')}</button>
        </div>
        <div className='bottom'>
            <Footer />
        </div>
    </>
  )
}
