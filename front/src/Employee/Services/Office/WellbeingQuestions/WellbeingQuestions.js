import React, { Component } from "react";
import {
  Modal,
  Card,
  Typography,
  Button,
  CardContent,
} from "@material-ui/core";
import "./WellbeingQuestions.css";

export default class WellbeingQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = { currQuestion: 1 };
    this.nextQuestion = this.nextQuestion.bind(this);



  }

//   getQuestionData(){
//       const url = "https://localhost:8000/well"
//   }

  nextQuestion() {
    this.setState({ currQuestion: this.state.currQuestion + 1 });
  }
  render() {
    return (
      <Card className="modalCard">
        <CardContent>
          <Typography>Question {this.state.currQuestion} of 3</Typography>
          <Button onClick={this.nextQuestion}>Next</Button>
        </CardContent>
      </Card>
    );
  }
}
