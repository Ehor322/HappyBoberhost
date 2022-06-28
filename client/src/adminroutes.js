import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//
import { AdsAdmin } from './pages/AdminPages/AdsAdmin/AdsAdmin'
import { CreateAdAdmin } from './pages/AdminPages/CreateAdAdmin/CreateAdAdmin'
import { EditAdAdmin } from './pages/AdminPages/EditAdAdmin/EditAdAdmin'
//



export const useAdminRoutes = isAuthenticated => {


    return (
        <Routes>
            <Route path="/*" element={<Navigate replace to="/admin/ads" />} />
            <Route path='/admin/ads' exact element={<AdsAdmin />} />
            <Route path='/admin/editad/:id' exact element={<EditAdAdmin />} />
            <Route path='/admin/createad' exact element={<CreateAdAdmin />} />
        </Routes>
    )
}