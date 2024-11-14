import React, { useState, useRef } from "react";
import axios from "axios";
import Backend from "./Backend";
import classes from "./AudioUpload.module.css";
import { useNavigate } from "react-router-dom";

function AudioUpload({ setText }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [sendreq, setSendreq] = useState(0);
  const navigate = useNavigate();
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        setAudioBlob(event.data);
      };

      mediaRecorder.onstop = () => {
        // Stop all audio tracks to release the microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setSendreq(sendreq + 1);
    }
  };

  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      try {
        const { data } = await axios.post(`${Backend}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
        setText(data.msg);
        navigate("/result");
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
      setAudioBlob(null);
    }
  };

  // Call uploadAudio when recording stops
  React.useEffect(() => {
    if (!isRecording && audioBlob) {
      uploadAudio();
    }
  }, [audioBlob]);

  return (
    <div className={classes.main}>
      {!isRecording ? (
        <button
          className={classes.btn}
          onClick={startRecording}
          disabled={isRecording}
        >
          <svg
            height="24"
            width="24"
            fill="#FFFFFF"
            viewBox="0 0 24 24"
            data-name="Layer 1"
            id="Layer_1"
            className={classes.sparkle}
          >
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
          </svg>
          <span className={classes.text}>Start Recording</span>
        </button>
      ) : (
        <div className={classes.container}>
          <button
            className={classes.button}
            onClick={stopRecording}
            disabled={!isRecording}
          >
            <span className={classes.span}>Stop Recording</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default AudioUpload;
