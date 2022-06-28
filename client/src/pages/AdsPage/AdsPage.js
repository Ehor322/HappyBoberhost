import React, { useCallback, useContext, useEffect, useState } from "react";
import './AdsPage.css';
import { AdsList } from "../../components/AdsList/AdsList";
import { Loader } from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { FilterBar } from "../../components/FilterBar/FilterBar";

export const AdsPage = () => {

    const [ads, setAds] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);
    const fetchAds = useCallback(async () => {
        try {
            const fetched = await request('/api/ads/getads', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAds(fetched.sort((a, b) => a.date > b.date ? -1 : 1));
            setTempAds(fetched);
            setType([...new Set(
                fetched.map(item => item.type.toLowerCase()),
            )]);
        } catch (e) {
        }
    }, [token, request]);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);


    const [tempAds, setTempAds] = useState([]);

    const [type, setType] = useState([]);



    if (loading) {
        return <Loader />
    }
    return (
        <div>

            <FilterBar ads={ads} setAds={setAds} tempAds={tempAds} setTempAds={setTempAds} type={type} setType={setType}></FilterBar>

            {!loading && <AdsList ads={ads} />}

        </div>
    );
};