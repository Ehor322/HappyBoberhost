import React, {useState, useContext, useEffect, useCallback} from "react";
import { Modal } from "../modal/Modal";
import { Report } from "../report/Report";
import { AuthContext } from "../../context/AuthContext";
import "./AccountCard.scss";
import RegionSvg from "../../img/RegionSvg.svg";
import YellowBtn from '../elements/YellowBtn/Yellowbtn';
import { Link } from "react-router-dom";
import { AdsList } from "../AdsList/AdsList";
import { useHttp } from "../../hooks/http.hook";
import { Loader } from "../Loader/Loader";
import { RewievForm } from "../RewievForm/RewievForm";


export const AccountCard = ({account}) => {
    const [modalActive, setModalActive] = useState(false);

    const [rewiewActive, setRewiewActive] = useState(false);

    const [complain, setComplain] = useState(false);

    const { accountId , token} = useContext(AuthContext);
    
    const [ads, setAds] = useState([]);

    const { loading, request } = useHttp();

    const [rewievs, setRewievs] = useState([]);

    const [rating, setRating] = useState(0);

    const fetchAds = useCallback(async () => {
        try {
            const fetched = await request(`/api/ads/getads/${account._id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            const fetched1 = await request(`/api/rewiev/getrewievs/${account._id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setRewievs(fetched1.sort((a, b) => a.date > b.date ? -1 : 1));
            setAds(fetched);
            let rat =0;
            for(let i = 0; i< fetched1.length; i++) {
                rat += fetched1[i].rating;
            }
            setRating(rat / fetched1.length);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    // async function getAccounts(sender) {
    //     const sender1 =  await request(`/api/account/${sender}`, 'GET', null, {
    //         Authorization: `Bearer ${token}`
    //     });
    //     return {sender1};
    // }

    const [visible, setVisible] = useState(3);

    const showMoreItems = () => {
        setVisible(prevValue => prevValue + 3);
    }

    return (
        <div className = "AccountCard" style={{marginTop: '4vw'}}>
            <div className="big-flex-accountCard">
                <div className="flex-accountCard">
                    <div className="left">
                        <div className="circle-photo">
                            <img src={account.photo}/>
                        </div>
                    </div>
                    <div className="right">
                        <p className="left-big">{account.firstName} {account.lastName}</p>
                        <p className="left-medium">On HappyBober since  {account.registeredAt.substring(0, account.registeredAt.length - 14)}</p>
                        {!(accountId === null || accountId ===  account._id) && <button onClick={() => setModalActive(true)}>Report</button>}
                        {accountId ===  account._id && <Link to='/myaccount'><button className="AccountCard-Btn">Edit my profile</button></Link>}
                    </div>   
                </div>
                <div className="right-region">
                    <img src={RegionSvg} alt=""/>
                    <div>{account.region}</div>
                </div>
            </div>
            
            <div className="AccountCard-Info">
                <p className="AccountCard-Info-Elem__Main">Account Info</p>
                <p className="AccountCard-Info-Elem"><span className="AccountCard-Info-low">Rating:</span> <span className="AccountCard-Info-high">{rating}</span></p>
                <p className="AccountCard-Info-Elem"><span className="AccountCard-Info-low">Phone:</span> <span className="AccountCard-Info-high">{account.phone}</span></p>
                <p  className="AccountCard-Info-Elem"><span className="AccountCard-Info-low">Email:</span> <span className="AccountCard-Info-high">{account.email}</span></p>
                <p  className="AccountCard-Info-Elem"><span className="AccountCard-Info-low">Website:</span> <span className="AccountCard-Info-high">{account.website}</span></p>
                <p  className="AccountCard-Info-Elem"><span className="AccountCard-Info-low">Description:</span></p>
                <p  className="AccountCard-Info-Elem"><span className="AccountCard-Info-high">{account.description}</span></p>
            </div>
            <div className="AccountCard-Info">
                <div className="AccountCard-Ads"><p className="AccountCard-Info-Elem__Main">Ads:</p>
                {loading && <Loader></Loader>}
                {!loading && <AdsList ads={ads} setAds={setAds}  />}
                </div>
            </div>
           

            <div className="AccountCard-Info">
                <p className="AccountCard-Info-Elem__Main">Rewiws:</p>
                <div className="flex-accountCard-btns">                
                    {!(accountId === account._id ) && <button className="AccountCard-Line-full-button" onClick={()=>{setComplain(false); setRewiewActive(true); }} >Add Rewiew</button>}
                </div>
                {rewievs.slice(0, visible).map((rewiev, index) => {
               
                    return (
                        <div className="rewiew-list">
                        <div className="rewiew-element">
                            <div className="big-flex-accountCard">
                                <div className="flex-accountCard">
                                    <div className="left">
                                        <Link to={`/account/${rewiev.sender._id}`}><div className="circle-photo">
                                            <img src={rewiev.sender.photo}/>
                                        </div></Link>
                                    </div>
                                    <div className="right">
                                        <p className="left-big">{rewiev.sender.firstName} {rewiev.sender.lastName}</p>
                                        <p className="left-medium">On HappyBober since  {rewiev.sender.registeredAt.substring(0, account.registeredAt.length - 14)}</p>
                                        <p className="left-medium">Rating  {rewiev.rating}</p>
                                    </div>   
                                </div>
                            </div>
                            <p className="Rewiws-Element-text">{rewiev.text}</p>
                        </div>
                    </div>
                    )
                })}
                <div className="flex-accountCard-btns">               
                    <button className="AccountCard-Line-border-button" style={rewievs.length > 0 && visible >= rewievs.length ? {display: 'none'} : {display: 'all'}} onClick={showMoreItems}>More</button>
                </div>
            </div>

            <Modal active={ modalActive} setActive={setModalActive} children={<Report reportType={'user'} account={account}></Report>}></Modal>
            <Modal active={rewiewActive} setActive={setRewiewActive} children={<RewievForm complain={complain} setComplain={setComplain} receiver={account._id} sender={accountId} setRewievs={setRewievs} token={token} ></RewievForm>}></Modal>
        </div>
    )
}