import "./about.scss"
import YellowBtn from '../elements/YellowBtn/Yellowbtn';
import image from "../../img/About our company plate.jpg";
import { motion } from "framer-motion";
import { PayPal } from "../PayPal/PayPal";
import React, {useState} from "react";

const Animation = {
  offscreen: {
    opacity: 0
  },
  onscreen: {
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 3
    }
  }
};

export default function About({account}) {
  const [checkoutFour, setCheckoutFour] = useState(false);

  return (

    <div className='about' id="about">
      <div className="left">
        <img src={image} alt="" />
      </div>
      <motion.div className="right">
        <div className="about-big-text">
          ABOUT OUR COMPANY
        </div>
        <div className="about-normal-text">  
          <p><span className="pink">Our team</span> is those people who are constantly monitoring the needs of users, updating the 
          existing content, developing a product that will be <span className="blue">useful</span> in the conditions of the existing market.</p>
          <p> <span className="blue">Our mission</span> is to constantly develop and improve the quality of our product through the introduction of new and necessary functions.</p>
          <p>We value each of our customers, so <span className="pink">high quality</span> service is a priority for us. Love</p>
        </div>
        {checkoutFour ? (<PayPal cost={1}/>) : 
          (<a onClick={() => {setCheckoutFour(true);}}><YellowBtn info="Donate 1$"/></a>) }
      </motion.div>
    </div>
  )
}
