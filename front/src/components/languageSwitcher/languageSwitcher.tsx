import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    function handleClickLang() {
        if (i18n.language === 'ru') {
            changeLanguage('en');
        } else changeLanguage('ru');
        window.location.reload()
    }

    return (
        <div>
            <button onClick={() => handleClickLang()}>{(t('language'))}: {i18n.language}</button>
        </div>
    );
};

export default LanguageSwitcher;