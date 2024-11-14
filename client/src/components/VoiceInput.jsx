import React, { useEffect } from "react";
import AudioUpload from "./AudioUpload";
import classes from "./VoiceInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const VoiceInput = ({ setText }) => {
  const navigate = useNavigate()
  useEffect(()=>{
    let auth = localStorage.getItem('user')
    if(!auth){
      navigate('/login')
    }
  },[])
  return (
    <>
      <div className={classes.main}>
        <div className={classes.main2}>
          <h1>Your Personal Therapist AI</h1>
          <p className={classes.mainp}>
            Share your thoughts and emotions, and our AI will provide a
            personalized solution to help you on your journey to better mental
            health.
          </p>
          <div className={classes.main3}>
            <div className={classes.icon}>
              <FontAwesomeIcon
                icon={faMicrophone}
                style={{ color: "#371ef6" }}
              />
            </div>
            <h1>Start Recording</h1>
            <p>Click the button below to begin your session.</p>
            <AudioUpload setText={setText} />
          </div>
          <div className={classes.cards}>
            <div className={classes.card}>
              <div className={classes.cardcontent}>
                <p className={classes.cardtitle}>Relaxation</p>
                <p className={classes.cardpara}>
                  Unwind and find inner peace with our calming techniques.
                </p>
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes.cardcontent}>
                <p className={classes.cardtitle}>Mindfulness</p>
                <p className={classes.cardpara}>
                  Cultivate awareness and live in the present moment.
                </p>
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes.cardcontent}>
                <p className={classes.cardtitle}>Therapy</p>
                <p className={classes.cardpara}>
                  Explore your emotions and find personalized solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceInput;
