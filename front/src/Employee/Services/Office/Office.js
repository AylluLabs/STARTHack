import React, { Component } from "react";
import UserOfficeCard from "./UserOfficeCard/UserOfficeCard";
import { Modal , Card} from "@material-ui/core";
import "./Office.css";
import WellbeingQuestions from "./WellbeingQuestions/WellbeingQuestions";
import {ReactComponent as Calendar} from '../../../resources/imageCards/calendar.svg';
import {ReactComponent as Quote} from '../../../resources/imageCards/quote_author.svg';
import {ReactComponent as Status} from '../../../resources/imageCards/status.svg';
import {ReactComponent as Psycho} from '../../../resources/imageCards/psichologist_card.svg';
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
        <UserOfficeCard username={this.props.username}/>
        <Card className='officeCard'>
          <Calendar/>
        </Card>
        <Card className='officeCard'>
          <Psycho />
        </Card>
        <Card className='statusCard'>
          <Status width={550}/>
        </Card>
        <Card className='officeCard'>
          <Quote />
        </Card>
        <Modal open={this.state.modalOpen} onClose={this.closeModal} className='modal'>
            <WellbeingQuestions username={this.props.username} closeModal={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}
