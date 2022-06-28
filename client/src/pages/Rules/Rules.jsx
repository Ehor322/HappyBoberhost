import React from "react";
import { useAnimation, motion } from "framer-motion";
import "../../App.scss"
import "./Rules.scss"
import { useState } from 'react';
import Book1 from "../../img/Book.png"
import Book2 from "../../img/Book 2.png"
import Cat from "../../img/Cat.png"
export const Rules = () => {


  const [show, setShow] = useState(false);

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
      <div className="Rules" style={{ marginTop: '4vw' }}>
        <div className= "Rules-Main-Screen">
          <p>COMMUNITY RULES</p>
          <div className="rules__main-screen-img Rules-animation-div1 rules__main-screen-img1">
            <motion.img src={Book2} alt="" 
                      drag
                      dragConstraints={{
                        top: -100,
                        left: -100,
                        right: 100,
                        bottom: 100,
                      }}
              transition={{
                default: { duration:1 },
                type: "spring",
            
              }}/>
          </div>
          <div className="rules__main-screen-img Rules-animation-div2 rules__main-screen-img2">
          <motion.img 
              drag
              dragConstraints={{
                top: -150,
                left: -150,
                right: 150,
                bottom: 150,
              }}
            src={Book1} alt="" 
            transition={{
              default: { duration:1 },
              type: "spring",

            }}
            onMouseMove={(e) => handleMouseMove(e)}/>
          </div>
          <div className="rules__main-screen-img Rules-animation-div3 rules__main-screen-img3">
          <motion.img 
                    drag
                    dragConstraints={{
                      top: -150,
                      left: -150,
                      right: 150,
                      bottom: 150,
                    }}
            src={Cat} alt=""
            transition={{
              default: { duration:1 },
              type: "spring",
        
              }}
          onMouseMove={(e) => handleMouseMove(e)}/>
          </div>
        </div>
        <div>
          <div className="Rules-Text-Wrapper">
            <div className="Rules-text-ExtraBold">1. LIMITATION RULE</div>
            <ul>
              <li>
                <p  className="Rules-text-Bold">1.1 Registration</p>
                <p className="Rules-text-Light">The user who wishes to have an account serviced and use the possible site / application must be registered: the user provides a name, invitation, e-mail.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">1.2 Authorizations</p>
                <p className="Rules-text-Light">After registration, the koristuvach may have the right to see his appearance record behind his bajan.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">1.3 Information about the creature</p>
                <p className="Rules-text-Light">The user must provide complete information about the animal for sale, namely: breed, age, availability of documents and their scan, availability of vaccinations and vaccination card scan.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">1.4 Number of ads</p>
                <p className="Rules-text-Light">A ser vith a paid subscription chan from up to 5 urgent ads.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">1.5 Currency usage</p>
                <p className="Rules-text-Light">The user decided to sell the animal for dollars, but since the service works only in Ukraine, the national currency is used.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">1.6 Mobile account binding</p>
                <p className="Rules-text-Light">Only one account can be created per mobile phone / mail.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">1.7 Sell ​​only through a verified account</p>
                <p className="Rules-text-Light">To sell an animal, you need to link your phone number to your account</p>
              </li>
              <li>
                <p className="Rules-text-Bold">1.8 Only certain types of advertising are allowed on the site</p>
                <p className="Rules-text-Light">The service provides a platform for advertisers, the service prohibits the publication of advertising related to gambling / promotion of harmful substances / violence.</p>
              </li>
            </ul>
          </div>
          <div className="Rules-Text-Wrapper">
            <div className="Rules-text-ExtraBold">2. CONCLUSIONS RULE</div>
            <ul>
              <li>
                <p  className="Rules-text-Bold">2.1 Violation warning</p>
                <p className="Rules-text-Light">If the moderator receives numerous complaints that can be used as evidence that the user has violated the rules of use of the service, the user receives a warning about the violation of the rules.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">2.2 User lock</p>
                <p className="Rules-text-Light">If a user has three or more warnings, the moderator / administrator has the right to block this user from the service.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">2.3 Blacklist</p>
                <p className="Rules-text-Light">If the user does not fulfill the obligation to send media confirmations to the seller, the moderation sends this user to the black list, which will not allow further use of the program's features.</p>
              </li>
            </ul>
          <div className="Rules-Text-Wrapper">
            <div className="Rules-text-ExtraBold">3. RULES OF ACTIVATORS OF OPERATIONS</div>
            <ul>
              <li>
                <p  className="Rules-text-Bold">3.1 Reminder</p>
                <p className="Rules-text-Light">Reminder that the user is expiring the HappyBober + subscription period, and that the ad about the animal will be inactive in a few days.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">3.2 Ad continuation</p>
                <p className="Rules-text-Light">The user can post the ad for 30 days, after which he must continue the ad, otherwise it will become inactive.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">3.3 Subscription payment</p>
                <p className="Rules-text-Light">VIP status must be paid monthly.</p>
              </li>
            </ul>
          </div>
          <div className="Rules-Text-Wrapper">
            <div className="Rules-text-ExtraBold">4. CALCULATION RULES</div>
            <ul>
              <li>
                <p className="Rules-text-Light">4.1 Benefits for shelters / nurseries</p>
                <p className="Rules-text-Light">A shelter or kennel that sells or rents more than 10 animals per month and cooperates with the service for more than 3 months and / or has a high rating (score more than 4) receives a 30% discount on HappyBober + subscriptions.</p>
              </li>
            </ul>
          </div>
          <div className="Rules-Text-Wrapper">
            <div className="Rules-text-ExtraBold">5. RULES OF FACTS</div>
            <ul>
              <li>
                <p className="Rules-text-Bold">5.1 Service for animals</p>
                <p className="Rules-text-Light">Only animals are sold at the service</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.2 Authorizations</p>
                <p className="Rules-text-Light">After registration, the koristuvach may have the right to see his appearance record behind his bajan.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.3 Information about the creature</p>
                <p className="Rules-text-Light">The user must provide complete information about the animal for sale, namely: breed, age, availability of documents and their scan, availability of vaccinations and vaccination card scan.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.4 Service for animals</p>
                <p className="Rules-text-Light">Only animals are sold at the service</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.5 User section</p>
                <p className="Rules-text-Light">There are only two types of users: individual and shelter / nursery.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.6 Money rule</p>
                <p className="Rules-text-Light">The service does not participate in money exchange between users.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.7 Registration of nurseries and shelters</p>
                <p className="Rules-text-Light">To register a user as a nursery or shelter, the user needs to confirm the documentary existence of the nursery / shelter and ownership of it.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.8 Locking</p>
                <p className="Rules-text-Light">The administrator / moderator is blocking the user for violating the rules of the service.</p>
              </li>
              <li>
                <p  className="Rules-text-Bold">5.9 Stability of the subscription price</p>
                <p className="Rules-text-Light">The company has the right to change the cost of the Bilibober + subscription, which does not affect users who have already paid a monthly / annual subscription.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
};