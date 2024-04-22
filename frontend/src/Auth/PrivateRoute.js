import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
    let  userid = localStorage.getItem("token") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )
}