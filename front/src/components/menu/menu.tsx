import './menu.css';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Menu() {

    const { t } = useTranslation();

    return (
        <>
        <div id="menu-container">
            <div id="left">
                <Link to="/"><img src='/images/logo.png' alt='logo'></img></Link>
                <Link to="/piano"><button>{t('piano-menu')}</button></Link>
                <Link to="/lessons" onClick={() => {localStorage.setItem('practiceMode', "false")}}><button>{t('lessons')}</button></Link>
                <Link to="/chords"><button>{t('chords')}</button></Link>
            </div>
            <Link to="/account"><button>{t('account')}</button></Link>
        </div>
        <Outlet />
        </>
    )
}