import {
  Typography,
  CircularProgress,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  Paper,
} from "@material-ui/core";
import React, { Component } from "react";
import Navbar from "../navbar/Navbar";

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {employees:null};
    this.getData();
  }

  getData() {
    const url = "http://localhost:8000/wellbeing/getUserResults/";
    fetch(url)
    .then(data =>data.json())
    .then(data => {
      console.log(data);
      this.setState({employees:data});
    })
  }


  renderContent() {
    if(this.state.employees === null){
      return <CircularProgress/>
    }

    return (
      <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell align="right">Questionaire score</TableCell>
                <TableCell align="right">Audio positivity</TableCell>
                <TableCell align="right">Audio negativity</TableCell>
                <TableCell align="right">Audio neutrality</TableCell>
                <TableCell align="right">Audio mixedness</TableCell>
                <TableCell align="right">Audio sentiment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.employees.map((row) => (
                <TableRow key={row.username}>
                
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">{row.pollScore}</TableCell>
                  <TableCell align="right">{row.audio.positivity}</TableCell>
                  <TableCell align="right">{row.audio.negativity}</TableCell>
                  <TableCell align="right">{row.audio.neutrality}</TableCell>
                  <TableCell align="right">{row.audio.mixdness}</TableCell>
                  <TableCell align="right">{row.audio.sentiment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.renderContent()}
      </div>
    );
  }
}
