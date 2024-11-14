import React, { useEffect } from "react";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home({ log, setLog }) {
  const navigate = useNavigate();
  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      setLog(true);
    }
  }, []);
  return (
    <>
      <div className={classes.main}>
        <div className={classes.main1}>
          <h1>
            Therapist AI: Motion<br></br> Detection from Voice or Text
          </h1>
          <p>
            Our advanced AI uses Whisper technology to detect motion from your
            voice or text input, providing personalized therapy recommendations
            to improve your well-being.
          </p>
          <div className={classes.btndiv}>
            <button
              onClick={() => navigate("/voiceinput")}
              className={classes.shadow__btn}
            >
              <MicIcon />
              Voice Input
            </button>

            <button
              onClick={() => navigate("/textinput")}
              className={classes.shadow__btn}
            >
              <FilePenIcon />
              Text Input
            </button>
          </div>
        </div>
        <div className={classes.main2}></div>
      </div>
      <div className={classes.section2}>
        <p>Powered by Whisper AI</p>
        <h1>Personalized Insights, Tailored to You</h1>
        <span>
          Our Therapist AI uses advanced Whisper AI technology to analyze your
          voice or text input, providing personalized <br></br>insights and
          recommendations to help you on your journey.
        </span>
      </div>
      <div className={classes.section3}>
        <div className={classes.section31}>
          <div>
            <h2>Motion Detection</h2>
            <p>
              Our AI can detect subtle movements and gestures from your voice or
              text input, providing insights into your emotional state and
              well-being.
            </p>
          </div>
          <div>
            <h2>Personalized Recommendations</h2>
            <p>
              Based on your input, our AI will provide personalized
              recommendations and strategies to help you improve your mental
              health and well-being.
            </p>
          </div>
          <div>
            <h2>Secure and Confidential</h2>
            <p>
              Your privacy is our top priority. All data is securely stored and
              processed, ensuring your information remains confidential.
            </p>
          </div>
        </div>
        <div className={classes.section32}></div>
      </div>
      <footer className={classes.footer}>
        <div>© 2024 Therapist AI. All rights reserved.</div>
        <div>
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
        </div>
      </footer>
    </>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
