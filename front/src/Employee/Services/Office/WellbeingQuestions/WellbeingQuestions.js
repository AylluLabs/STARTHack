import React, { Component } from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  CardContent,
  Slider,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./WellbeingQuestions.css";
import RecordAudio from "./RecordAudio/RecordAudio";

export default class WellbeingQuestions extends Component {
  constructor(props) {
    super(props);
    this.answeredQuestions = [];

    this.state = { currQuestion: 1, sliderVal: null, renderAudio: false };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.sliderChange = this.sliderChange.bind(this);

    this.getQuestionData();
  }

  getQuestionData() {
    const url = "https://7542a8507192.ngrok.io:8000/wellbeing/sampleQuestions/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ questions: data.data });
        console.log(this.state);
      });
  }

  savePoll(pollData) {
    let dataToSend = { username: this.props.username, poll: pollData };
    console.log("sending data:", dataToSend);

    const url = "https://7542a8507192.ngrok.io:8000/wellbeing/answeredPoll/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  nextQuestion() {
    let sliderVal = this.state.sliderVal;
    sliderVal = (sliderVal / 100.0) * 9.0 + 1;

    this.answeredQuestions.push({
      idQuestion: this.state.questions[this.state.currQuestion - 1].id,
      qscore: sliderVal,
    });

    if (this.state.currQuestion < 3) {
      this.setState(
        (prevState) => {
          return { currQuestion: prevState.currQuestion + 1 };
        },
        () => {
          console.log("next q!", this.state);
        }
      );
    } else {
      //do something with the data and quit
      console.log(this.answeredQuestions);
      this.savePoll(this.answeredQuestions);
      this.setState({ renderAudio: true });
    }
  }

  sliderChange(event, newValue) {
    this.setState({ sliderVal: newValue });
    // console.log(this.state);
  }

  cardContent() {
    if (!this.state.renderAudio) {
      return (
        <CardContent>
          <Typography>Question {this.state.currQuestion} of 3</Typography>
          <Typography variant="h5" className="questionText">
            {this.state.questions == null
              ? "Loading"
              : this.state.questions[this.state.currQuestion - 1].question_text}
          </Typography>
          <div className='sliderContainer'>
            {/* <Grid container spacing={2} >
              <Grid item> */}
                <Typography className='sliderText'>Strongly Disagree</Typography>
              {/* </Grid>
              <Grid item xs > */}
                <Slider
                className='slider'
                  defaultValue={50.0}
                  // value={value}
                  onChange={this.sliderChange}
                  // min={1.0}
                  // max={10.0}
                />
              {/* </Grid>
              <Grid item> */}
                <Typography className='sliderText'>Strongly Agree</Typography>
              {/* </Grid> */}
            {/* </Grid> */}
          </div>

          <Button onClick={this.nextQuestion} variant='contained' className="sliderButton">Next</Button>
        </CardContent>
      );
    }
    return (
      <CardContent>
        <RecordAudio username={this.props.username} closeModal={this.props.closeModal} />
      </CardContent>
    );
  }

  render() {
    return (
      <Card className="modalCard">
        {this.state.questions == null ? (
          <CardContent className="waitingAnimation">
            <CircularProgress />
          </CardContent>
        ) : (
          this.cardContent()
        )}
      </Card>
    );
  }
}
