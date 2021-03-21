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
        formData.append("user_id", 1);

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
        <div>
          {timeTaken}
          <Button onClick={start} disabled={isRecording}>
            Start
          </Button>
          <Button onClick={stop} disabled={!isRecording}>
            Stop
          </Button>
          <Button onClick={done}>Done</Button>
        </div>
      );
    }
    return (
      <div>
        <audio src={audioURL} controls />
        <Button onClick={reset}>Reset</Button>
        <Button onClick={upload}>Done</Button>
      </div>
    );
  }

  return <CardContent>{renderContent()}</CardContent>;
}
