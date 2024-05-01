import React, { useEffect } from 'react';

const HomeFeedScreen = ({ setIsLandingPage }) => {
    useEffect(() => {
        setIsLandingPage(false);
        // eslint-disable-next-line
    }, [setIsLandingPage]);

    return <div>HomeFeedScreen</div>;
};

export default HomeFeedScreen;
