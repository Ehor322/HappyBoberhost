import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdsList } from "../../components/AdsList/AdsList";
import { Loader } from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

export const MyAdsPage = () => {

    const [ads, setAds] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);
    const fetchAds = useCallback(async () => {
        try {
            const fetched = await request('/api/ads/getmyads', 'GET', null, {
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
            {!loading && <AdsList ads={ads} setAds={setAds} location={'myadspage'} />}
        </div>
    );
};
