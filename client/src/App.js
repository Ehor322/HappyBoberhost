import React from 'react';
import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Loader } from "./components/Loader/Loader";
import { Topbar } from "./components/topbar/Topbar";
import { Footer } from "./components/footer/Footer";
import { connect } from "react-redux";
import { useAdminRoutes } from "./adminroutes";
import "./App.scss"
import "./styles/index.scss"

//
import { TopBarAdmin } from './components/AdminComponents/TopBarAdmin/TopBarAdmin'
import { useHttp } from './hooks/http.hook';
import { useCallback, useEffect, useState } from "react";
const storageName = 'accountData';
//

const App = props => {

  const { token, login, logout, accountId, ready, userType } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const adminroutes = useAdminRoutes(isAuthenticated);
  const { isAuth } = props;
  //
  const data = JSON.parse(localStorage.getItem(storageName));
  const { request, loading } = useHttp();
  const [type, setType] = useState(userType);

  const getAccount = useCallback(async () => {
    try {

      const fetched = await request(`/api/account/${data.accountId}`, 'GET', null);
      setType(fetched.userType);
      userType = fetched.userType;
    } catch (e) {

    }
  }, [request]);

  useEffect(() => {
    getAccount()
  }, [getAccount]);


  //
  if (!ready) {
    return <Loader />
  }
  return (
    <>
      <AuthContext.Provider value={{
        token, login, logout, accountId, isAuthenticated, userType
      }}>
        <BrowserRouter>
          {(type === 'admin') && <TopBarAdmin />}
          {(type === 'admin') && <div>{adminroutes}</div>}
          {!(type === 'admin') && <Topbar />}
          {!(type === 'admin') && <div>{routes}</div>}
        </BrowserRouter>
      </AuthContext.Provider>
      <Footer></Footer>
    </>

  );
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);