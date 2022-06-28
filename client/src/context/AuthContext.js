import { createContext } from "react";

function noop() { }

export const AuthContext = createContext({
    token: null,
    accountId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    userType: null
});