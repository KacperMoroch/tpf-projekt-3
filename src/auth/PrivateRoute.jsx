import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/logowanie" />;
    }

    return children;
};