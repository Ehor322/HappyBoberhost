import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { AdsList } from "../../components/AdsList/AdsList";
import { Loader } from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

export const OtherUserAdsPage = () => {

    const [ads, setAds] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);
    const accountId = useParams().id;
    const fetchAds = useCallback(async () => {
        try {
            const fetched = await request(`/api/ads/getads/${accountId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAds(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    if (loading) {
        return <Loader />
    }
    return (
        <div>
            {!loading && <AdsList ads={ads} />}
        </div>
    );
};
