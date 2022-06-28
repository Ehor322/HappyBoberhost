import React, { useCallback, useContext, useEffect, useState } from "react";
import { AdsListAdmin } from "../../../components/AdminComponents/AdsListAdmin/AdsListAdmin"
import { Loader } from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { FilterBar } from "../../../components/FilterBar/FilterBar";
import { Link } from "react-router-dom";

export const AdsAdmin = () => {

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
            {/* <Link to='/admin/createad'><button>Create Ad</button></Link> */}
            {!loading && <AdsListAdmin ads={ads} setAds={setAds} />}

        </div>
    );
};