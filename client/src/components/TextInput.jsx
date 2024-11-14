import React, { useEffect, useState } from "react";
import classes from "./TextInput.module.css";
import { useNavigate } from "react-router-dom";

const TextInput = ({ setText }) => {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    let auth = localStorage.getItem('user')
    if(!auth){
      navigate('/login')
    }
  },[])

  const submiHandler = () => {
    setText(input);
    navigate("/result");
  };

  return (
    <>
      <div className={classes.main}>
        <h1>Share Your Thoughts</h1>
        <p>
          Enter your text below and our AI will analyze your emotions and
          provide a personalized solution.
        </p>
        <div className={classes.text}>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            name="inputText"
            id="text"
            placeholder="Type your thoughts here..."
          ></textarea>
          <div className={classes.btndiv}>
            <button onClick={submiHandler} className={classes.button}>
              <div className="svgwrapper-1">
                <div className="svgwrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextInput;
