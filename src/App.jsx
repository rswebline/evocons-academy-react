import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import InterestPage from './pages/InterestPage';
import PrivacyPage from './pages/PrivacyPage';
import { isPrivacyPage, isInterestPage, isCoursePage } from './config/app';

function App() { return <><Header/>{isPrivacyPage ? <PrivacyPage/> : isInterestPage ? <InterestPage/> : isCoursePage ? <CoursePage/> : <Home/>}<Footer/></>; }

export default App;
