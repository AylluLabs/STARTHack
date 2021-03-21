import React, { Component } from "react";
import UserCard from "./UserCard/UserCard";
import { Modal , Card} from "@material-ui/core";
import "./Office.css";
import WellbeingQuestions from "./WellbeingQuestions/WellbeingQuestions";
export default class Office extends Component {
  constructor(props) {
    super(props);

    this.state = { modalOpen: true };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }
  render() {
    return (
      <div className="mainOffice">
        <UserCard username={this.props.username}/>
        <Modal open={this.state.modalOpen} onClose={this.closeModal} className='modal'>
            <WellbeingQuestions username={this.props.username} closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}
