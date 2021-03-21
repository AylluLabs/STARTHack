import React, { Component, useState, useEffect } from "react";
import useRecorder from "./useRecorder";
import {
  Grid,
  Card,
  Typography,
  Button,
  CardContent,
  Slider,
} from "@material-ui/core";
import "./RecordAudio.css";

export default function RecordAudio(props) {
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [timerActive, setTimerActive] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0.0);
  const [audioDone, setAudioDone] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeTaken((seconds) => seconds + 1);
      }, 1000);
    } else if (!timerActive && timeTaken !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeTaken]);

  function start() {
    startRecording();
    setTimeTaken(0);
    setTimerActive(true);
  }

  function stop() {
    stopRecording();
    setTimerActive(false);
  }

  function done() {
    //save audio

    setAudioDone(true);
  }

  function reset() {
    setAudioDone(false);
  }
  function upload() {
    //upload data
    const url = "http://127.0.0.1:8000/wellbeing/audio/";

    const formData = new FormData();
    fetch(audioURL)
      .then((r) => r.blob())
      .then((audioData) => {
        console.log("Audio data", audioData);
        formData.append("file", audioData);
        formData.append("username", props.username);

        console.log(formData);

        console.log("Uploading audio");
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((r) => r.json())
          .then((data) => {
            console.log("audio uploaded!!!", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        props.closeModal();
      });
  }

  function renderContent() {
    if (!audioDone) {
      return (
        <div className="timerCard">
          <Typography variant="h5" className="timeTakenTypography">
            Please tell us how you're feeling in under 15 seconds.
          </Typography>
          <Typography variant="h6" className="timeTakenTypography">
            {`Time left: ${15-timeTaken} seconds`}
          </Typography>
          <Button
            className="timeTakenButton"
            variant="contained"
            color="primary"
            onClick={start}
            disabled={isRecording}
          >
            {audioURL === "" ? "Start" : "Restart"}
          </Button>
          <Button
            className="timeTakenButton"
            variant="contained"
            color="primary"
            onClick={stop}
            disabled={!isRecording}
          >
            Stop
          </Button>
          <Button
            className="timeTakenButton"
            variant="contained"
            color="primary"
            onClick={done}
            disabled={audioURL === ""}
          >
            Done
          </Button>
        </div>
      );
    }
    return (
      <div className='reviewAudio'>
        <Typography variant='h6'>
          Please review the audio
        </Typography>
        <audio src={audioURL} controls />
        <Button variant='contained' color='primary' className='reviewAudioButton' onClick={reset}>Restart</Button>
        <Button variant='contained' color='primary' className='reviewAudioButton' onClick={upload}>Done</Button>
      </div>
    );
  }

  return <CardContent>{renderContent()}</CardContent>;
}
