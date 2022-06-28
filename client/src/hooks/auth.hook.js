import { useState, useCallback, useEffect } from 'react';

const storageName = 'accountData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [accountId, setAccountId] = useState(null);
    const [userType, setUserType] = useState(null);


    const login = useCallback((jwtToken, id, type) => {
        setToken(jwtToken);
        setAccountId(id);
        setUserType(type);
        localStorage.setItem(storageName, JSON.stringify({
            accountId: id, token: jwtToken
        }));
        localStorage.setItem('token',
            jwtToken
        );
    }, []);


    const logout = useCallback(() => {
        setToken(null);
        setAccountId(null);
        setUserType(null);
        localStorage.removeItem(storageName);
        localStorage.removeItem('token');
    }, []);


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.accountId);
        }
        setReady(true);
    }, [login]);


    return {
        login, logout, token, accountId, ready
    };
}