import "./TopBarAdmin.scss";
import Logo from "../../../img/Logo.png";
import Account from "../../../img/Account.svg";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export const TopBarAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => { setIsOpen(!isOpen) }
    const history = useNavigate();
    const auth = useContext(AuthContext);
    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history('/');
        window.location.reload();
    }



    return (
        <div className='topbar'>
            <div className="background"></div>
            <div className="wrapper">
                <div className="logo">
                    <NavLink to="/mainpage">
                        <img className="logo__img" src={Logo} alt="" />
                    </NavLink>
                </div>
                <ul className="menu-list">
                    <li className="menu-list__item"><div className="menu-list__item-text"><NavLink to="/admin/ads">Ads</NavLink></div></li>
                    <li className="menu-list__item"><div className="menu-list__item-text"><NavLink to="/admin/users">Users</NavLink></div></li>
                    <li className="menu-list__item"><div className="menu-list__item-text"><NavLink to="/admin/reports">Reports</NavLink>t</div></li>
                    <li className="menu-list__item"><div className="menu-list__item-text"><NavLink to="/admin/statistics">Statistics</NavLink></div></li>
                </ul>
                <div className="right">
                    <div className="DropDownHeader" onClick={toggling}> <img className="account-img" src={Account} alt="" /></div>
                    <div className="DropDownContainer">

                        {isOpen && (
                            <div className="DropDownListContainer">
                                <ul className="DropDownList">
                                    <li className="ListItem"><NavLink to={`/admin/editaccount/${auth.accountId}`}>My account</NavLink></li>
                                    <li className="ListItem" style={{ cursor: 'pointer' }} onClick={logoutHandler}>Exit</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
