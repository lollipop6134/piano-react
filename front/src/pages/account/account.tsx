import React from 'react';
import { useState, useEffect } from 'react';
import { Footer } from '../../components/footer/footer';
import "./account.css"
import { logout, changeUsername, changeAvatar } from '../../AuthService';
import { useAuth } from '../../UserContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import LanguageSwitcher from '../../components/languageSwitcher/languageSwitcher';
import {source} from '../../source';

export default function Account() {
  const { t } = useTranslation();

  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [countLessons, setCountLessons] = useState(0);
  const [completedlessons, setCompletedLessons] = useState<number[] | null>(null);
  const [isSure, setIsSure] = useState<boolean>(false);
  const [isReally, setIsReally] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const isSpecialSymbol = (input:string) => {
    const format = /[!#$%&*()+=[\]{};':"\\|,<>/?]+/;
    return format.test(input)
  };
    
  useEffect(() => {
    const lang = i18n.language;
    if (user) {
      setUsername(user.username || '');
      setCompletedLessons(user.completedlessons);
      setImage(user.image);
      axios.get(`${source}/lessons`, {
        params: { lang }
    })
        .then(response => response.data)
        .then(data => {
          setCountLessons(data.length);
        })
        .catch(error => console.error('Error:', error));
    };
  }, [user]);

  const handleChanges = async () => {
    if (isSpecialSymbol(username!)) {
      window.alert(t('special-symbols'));
      return;
    }
    if (username !== user?.username) {
      await changeUsername(user!.user_id, username!);
    }
    if (image !== user?.image) {
      const formData = new FormData();
      formData.append('image', imageFile!);
      try {
        await axios.post(`${source}/uploadUsers`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await changeAvatar(user!.user_id, image!);
        alert('The changes have been saved successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      }
    } else {
      alert('The changes have been saved successfully!');
      window.location.reload();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setImageUrl(URL.createObjectURL(selectedFile));
      setImage(selectedFile.name);
      setImageFile(selectedFile);
    }
  };

  async function deleteUser() {
    const user_id = user?.user_id;
    try {
        const response = await axios.post(`${source}/deleteUser`, { user_id });
        logout();
        return response.data;
    } catch (error) {
        console.error('Error during deleting chord: ', error);
        throw error;
    } finally {
        window.location.reload();
        logout();
    }
};

  return (
    <>
      <div id="userForm">
        <div id='loadImage'>
        <img src={imageUrl || (image === user?.image ? `/images/users/${user.image}` : image!)} alt="avatar" className='main_img' />
          <input type='file' onChange={handleFileChange} accept='image/*'></input>
          <span>{t('choose-image')}</span>
        </div>
          <div id='userInformation'>
          <div id='accountInputs'>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                value={user?.email || ''}
                disabled
              />
            </div>
            <div>
              <label htmlFor="username">{t('username')}</label>
              <input
                id="username"
                type="text"
                required
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div id='progress'>
            {t('progress')} {`${completedlessons?.length || 0}/${countLessons} (${Math.round(((completedlessons?.length || 0) / countLessons) * 100)}%)`}
          </div>
          <div id='accountButtons'>
            <LanguageSwitcher/>
            <button disabled={username === user?.username && image === user?.image} type="button" onClick={handleChanges}>{t('save-changes')}</button>
            {!isSure ? <button onClick={() => setIsSure(true)}>{t('delete-account')}</button> :
             !isReally ? <button onClick={() => setIsReally(true)}>{t('sure')}</button> :
             <button onClick={() => deleteUser()}>{t('realy')}</button>}
            <button onClick={handleLogout}>{t('logout')}</button>
          </div>
        </div>
      </div>
      <div id='footer-account'>
        <Footer /> 
      </div>
    </>
  );
}
