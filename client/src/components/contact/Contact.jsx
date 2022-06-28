import "./contact.scss"
import satelite from "../../img/satellite.png";
import paper from "../../img/contact.png";
import smile from "../../img/cold-smile.png";
import shadow from "../../img/shadow.png";
import { useAnimation, motion } from "framer-motion";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


export default function Contact() {
  const form = useRef();
  function sendEmail (e) {
    e.preventDefault();
  
    emailjs.sendForm('service_12k2nih', 'template_cyvn7fa', form.current, 'nFV8YI8koVrkudt2J')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
    };
  const imgAnimation = useAnimation();
  const imgAnimationReverse = useAnimation();
  const handleMouseMove = (e) => {
    const { clientX } = e;
    const moveX = clientX - window.innerWidth / 2;

    const offsetFactor = 10;
    imgAnimation.start({
      x: moveX / offsetFactor,
    });
    imgAnimationReverse.start({
      x: -moveX / offsetFactor
    });
  };
  


  return (
    
    <div className="contact" id="contact">
      <div className="contact__main-screen">
        <p>CONTACT</p>
      </div>
      
      <motion.img className="contact__main-screen-img contact__main-screen-img1" src={satelite} alt="" 
        animate={imgAnimationReverse}
        transition={{
          default: { duration:1 },
          type: "spring",
      
        }}/>
      <motion.img className="contact__main-screen-img contact__main-screen-img2" 
          src={paper} alt="" 
          animate={imgAnimation}
          transition={{
            default: { duration:1 },
            type: "spring",

          }}
          onMouseMove={(e) => handleMouseMove(e)}/>
      <motion.img className="contact__main-screen-img contact__main-screen-img3" 
          src={smile} alt=""
          animate={imgAnimationReverse}
          transition={{
            default: { duration:1 },
            type: "spring",
      
            }}
          onMouseMove={(e) => handleMouseMove(e)}/>
      <motion.img className="contact__main-screen-img contact__main-screen-img4" src={shadow} alt="" 
          animate={imgAnimation}
          transition={{
            default: { duration: 1 },
            type: "spring",
          }}
          onMouseMove={(e) => handleMouseMove(e)}/>
          
      <div>
        <p className="contact__main-screen-text">DON'T BE SHY. <span className="pink">COME SAY HI.</span></p>
        <form ref={form} onSubmit={sendEmail} action="php/contact.php" class="contact__input-container" id="form">
          <input type="text" id="name" name="name" class="contact__input" placeholder="Your Name" required/>
          <div>
            <input type="text" id="email" name="email" class="contact__input contact__input-flex" placeholder="Your Email" required/>
            <input type="tel"  id="email" name="phone" class="contact__input contact__input-flex" placeholder="Your Phone" required/>
          </div>
          <textarea name="message" id="message" class="contact__input"  cols="30" rows="4" placeholder="Your Message"></textarea>
          <button type="submit" class="contact__input-btn">Send Message</button>
        </form>
      </div>
    </div>
    
  )
}