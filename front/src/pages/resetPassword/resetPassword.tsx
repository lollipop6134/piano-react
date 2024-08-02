import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import {source} from '../../source';
import './resetPassword.css';
import { useTranslation } from "react-i18next";
import { Footer } from '../../components/footer/footer';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  
  const { t } = useTranslation();
  const token = new URLSearchParams(location.search).get('token');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('passwords-not-match'));
      return;
    }
    try {
      if (password.length < 6) {
        setError(t('password-warning'));
        return;
      } else {
        await axios.post(`${source}/reset-password`, { token, password });
        window.alert(t('password-reseted'));
      }
    } catch (error) {
      setError(t('password-reset-error'));
    }
  };

  return (
    <>
      <div id='resetPassword'>
        <form onSubmit={handleResetPassword}>
          <h2>{t('password-reset')}</h2>
          <div>
            <input
              type= {isHidePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('new-password')}
              required
            />
            <img
              src={`images/${(isHidePassword ? 'eye.webp' : 'hide.webp')}`}
              alt='show/hide password' id='eye'
              onClick={() => {setIsHidePassword(!isHidePassword)}}
            />
          </div>
          <input
            type= {isHidePassword ? "password" : "text"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('confirm-password')}
            required
          />
          {error && <p>{error}</p>}
          <button type="submit">{t('password-reset-button')}</button>
        </form>
      </div>
      <div className='search'>
        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
