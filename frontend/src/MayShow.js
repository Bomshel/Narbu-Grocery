import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MayShow = ({ children, paths }) => {
    const location = useLocation();
    const [showComponent, setShowComponent] = useState(true);

    useEffect(() => {
        if (paths.includes(location.pathname)) {
            setShowComponent(false);
        } else {
            setShowComponent(true);
        }
    }, [location, paths]);

    return <div>{showComponent && children}</div>;
};

export default MayShow;
