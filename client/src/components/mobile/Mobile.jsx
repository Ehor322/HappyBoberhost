import "./mobile.scss"
import buttonAndroid from "../../img/button-google-play.svg";
import buttonIOS from "../../img/button-appstore.svg";
import mobile from "../../img/mobile.png";
import "../../fonts/AllianceNo1-ExtraBold.ttf";
import { motion } from "framer-motion";
import { useViewportScroll } from "framer-motion";
import { useTransform } from "framer-motion";
import React from "react";

export default function Mobile() {

  const { scrollYProgress } = useViewportScroll();
  let top = 0;
  const x = useTransform(scrollYProgress, [1, 0], [top, window.innerWidth - 800]);;

  const marqueeVariants = {
    animate: {
      x: ["0vw", "-60.3vw"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "linear",
        },
      },
    },
    animateVer2: {
      x: ["0vw", "-83.2vw"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className='mobile' id='mobile'>
      <div className="main">
        <div className="left">
          <p className="BigText">Find a tailed friend on your mobile phone</p>
          <ul className="TextList">
            <li>Convenient management</li>
            <li>additional functions</li>
            <li>adaptability</li>
            <li>convenient chat</li>
          </ul>
          <p  className="TextNormal">Unique application for finding a tailed friend or selling animals to an individual or company</p>
          <p className="BigText">DONWLOAD APP</p>
          <div className="buttons">
            <a href="1"><img src={buttonAndroid} alt="" /></a>
            <a href="1"><img src={buttonIOS} alt="" /></a>
          </div>
        </div>
        <motion.div className="right"
        //style={{ x: x }}
        >
          <img src={mobile} alt="" />
        </motion.div>
        <div className="marquee">
            <motion.div
              className="track"
              variants={marqueeVariants}
              animate="animate">
              <h1>
                Happy Bober Mobile. Happy Bober Mobile. Happy Bober Mobile. 
              </h1>
            </motion.div>
        </div>
        <div className="marquee marquee-2">
            <motion.div
              className="track"
              variants={marqueeVariants}
              animate="animateVer2"
              >
              <h1>
                CONVENIENT AND QUALITY APP. CONVENIENT AND QUALITY APP. CONVENIENT AND QUALITY APP. 
              </h1>
            </motion.div>
        </div>
      </div>
    </div>
  )
}

