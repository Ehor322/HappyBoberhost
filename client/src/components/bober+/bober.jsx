import "./bober.scss"
import image from "../../img/Cat image.png";
import YellowBtn from '../elements/YellowBtn/Yellowbtn';
import { motion } from "framer-motion"
import { PayPal } from "../PayPal/PayPal";
import React, {useState} from "react";
const Animation = {
  offscreen: {
    y: -300
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 3
    }
  }
};



export default function Bober({account}) {

  const [checkoutOne, setCheckoutOne] = useState(false);
  const [checkoutTwo, setCheckoutTwo] = useState(false);
  const [checkoutThree, setCheckoutThree] = useState(false);
  const [text, setText] = useState(null);
  return (
    <div className='bober' id='bober'>
      <div className="left">
        <div className="about-big-text">
          HAPPY BOBER+
        </div>
        <div className="about-normal-text">  
        <p className="little-text"><span className="pink">A new convenient subscription that allows you to publish animal ad by raising them to the top</span></p>
          <p>
            <li>Top 10 listings for a Bilibober+ subscription user.</li>
            <li>Billober+ subscription allows full feedback with real-time moderation.</li>
            <li>Bilibober + gives the opportunity to promote ads up.</li>
            <li>Special support program for nurseries and shelters.</li>
          </p>
        </div>
        <div className="buttons">
          {/* <YellowBtn info="89₴ for 1 month"/>
          <YellowBtn info="499₴ for 6 month"/>
          <YellowBtn info="899₴ for 1 year"/> */}
          {checkoutOne && !text ? (<PayPal term={30} cost={10}  setText={setText} text={text}/>) : account && !account.isSubscriber && !text ?
          (<a onClick={() => {setCheckoutOne(true);}}><YellowBtn info="10$ for 1 month"/></a>) : (null)}

          {checkoutTwo && !text ? (<PayPal term={182} cost={60} setText={setText} text={text}/>) : account && !account.isSubscriber && !text ?
          (<a onClick={() => {setCheckoutTwo(true);}}><YellowBtn info="60$ for 6 month"/></a>) : (null)}

          {checkoutThree && !text ? (<PayPal term={365} cost={120}  setText={setText} text={text}/>) : account && !account.isSubscriber && !text ?
          (<a onClick={() => {setCheckoutThree(true);}}><YellowBtn info="120$ for 1 year"/></a>) : (null)}

          {text && <div><h1>{text}</h1></div>}
          {(account && account.isSubscriber) && <div><h1>You already have a subscription</h1></div>}

        </div>
      </div>
      <div className="right">
        <motion.img className="imgBober" src={image} alt=""
          variants={Animation}               
          initial="offscreen"
          whileInView="onscreen"
        />
      </div>
    </div>
  )
}