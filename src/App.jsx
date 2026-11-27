import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import InterestPage from './pages/InterestPage';
import PrivacyPage from './pages/PrivacyPage';
import OrientationPage from './pages/OrientationPage';
import { isPrivacyPage, isInterestPage, isCoursePage, pathname } from './config/app';

function App() { return <><Header/>{pathname === '/orientamento' && import.meta.env.DEV ? <OrientationPage/> : isPrivacyPage ? <PrivacyPage/> : isInterestPage ? <InterestPage/> : isCoursePage ? <CoursePage/> : <Home/>}<Footer/></>; }

export default App;
