import React from 'react';
import { Footer } from '../../components/footer/footer';
import './main.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../UserContext';
import LanguageSwitcher from '../../components/languageSwitcher/languageSwitcher';

export function Main() {

    const { t } = useTranslation();
    const { user } = useAuth();

    return (
        <>
            <div className='content'>
                {!user && <div id='langButton'><LanguageSwitcher /></div>}
                <div id="section1" className='container row'>
                <img src='/images/Vector1.png' alt="vector1" className='vector'/>
                    <div id="section1left">
                        <div className="header">
                            {t('header-main')}
                        </div>
                        <div className="description">
                            {t('description-main')}
                        </div>
                        <Link to={"/lessons"}><button className='main-button'>{t('try-now')}</button></Link>
                    </div>
                    <img src='images/Main1.webp'alt="Capy plays the piano" className="main_img"/>
                </div>
                <div id="section2" className='container row'>
                    <img src='images/Main2.webp' alt="Capy and music" className='main_img'/>
                    <div id="section2right">
                        <div className='header'>
                            {t('header1-main')}
                        </div>
                        <div className='description'>
                            {t('description1-main')}
                        </div>
                    </div>
                </div>
                <div id="section3" className='container row'>
                <img src='/images/Vector2.png' alt="vector2" className='vector'/>
                    <div id="section3left">
                        <div className='header'>
                            {t('header2-main')}
                        </div>
                        <div className='description'>
                            {t('description2-main')}
                        </div>
                    </div>
                    <img src='images/Main3.webp' alt="Capy and music" className='main_img'/>
                </div>
                <div id="section4" className='container column'>
                    <div className='header'>
                        {t('header3-main')}
                    </div>
                    <div className='container row' id="principles">
                        <div className='container column' id="principle">
                            <p className='header'>
                                {t('princip-header1')}
                            </p>
                            <p className='description'>
                                {t('princip1')}
                            </p>
                        </div>
                        <div className='container column' id="principle">
                            <p className='header'>
                                {t('princip-header2')}
                            </p>
                            <p className='description'>
                                {t('princip2')}
                            </p>
                        </div>
                        <div className='container column' id="principle">
                            <p className='header'>
                                {t('princip-header3')}
                            </p>
                            <p className='description'>
                                    {t('princip3')}
                            </p>
                        </div>
                    </div>
                </div>
                <div id="section5" className='container column'>
                    <img src='/images/Vector3.png' alt="vector 3" className='vector'/>
                    <div className='header'>
                        {t('header4-main')}
                    </div>
                    <div className='description'>
                        {t('description4-main')}
                    </div>
                </div>
                <div className='container row' id="section6">
                    <img src='images/Main4.webp' alt="Capy and Piano" className='main_img' />
                    <img src='images/Main5.webp' alt="Capy and Piano" className='main_img' />
                    <img src='images/Vector4.png' alt="vector 4" className='vector' />
                </div>
            </div>
            <Footer />
        </>
    )
}