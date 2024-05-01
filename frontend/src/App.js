import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeFeedScreen from './screens/HomeFeedScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
    const [isLandingPage, setIsLandingPage] = useState(false); // temporary -will be removed with user instance

    return (
        <>
            {isLandingPage ? '' : <Header />}
            <Routes>
                <Route path='/' element={<LandingScreen setIsLandingPage={setIsLandingPage} />} />
                <Route
                    path='/home'
                    element={<HomeFeedScreen setIsLandingPage={setIsLandingPage} />}
                />
                <Route
                    path='/login'
                    element={<LoginScreen setIsLandingPage={setIsLandingPage} />}
                />
                <Route
                    path='/register'
                    element={<RegisterScreen setIsLandingPage={setIsLandingPage} />}
                />
            </Routes>
            {isLandingPage ? '' : <Footer />}
        </>
    );
}

export default App;
