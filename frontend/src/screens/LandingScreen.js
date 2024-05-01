import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingScreen = ({ setIsLandingPage }) => {
    useEffect(() => {
        setIsLandingPage(true);
        // eslint-disable-next-line
    }, [setIsLandingPage]);

    return (
        <>
            <div className='home home-background-image'></div>
            <div className='home home-background-image-overlay'></div>
            <Container className='home' style={{ paddingTop: '30px' }}>
                {/* <img src='/images/logo.png' alt='logo' style={{ maxWidth: '150px' }} /> */}
                <div>
                    <span className='big-logo-hu'>HU</span>
                    <span className='big-logo-gram'>GRAM</span>
                </div>
                <p className='landing-subtext'>For HU Students Only</p>
                <Link className='cool-btn' to='/login'>
                    <span></span>
                    Login Now! <i className='fa-solid fa-arrow-right'></i>
                </Link>
            </Container>
        </>
    );
};

export default LandingScreen;
