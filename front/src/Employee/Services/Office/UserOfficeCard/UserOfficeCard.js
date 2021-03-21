import React, { Component } from "react";
import { Card, CardContent, CardMedia, CatdContent, Typography } from "@material-ui/core";
import nathaImage from '../../../../resources/images/Natha.jpeg';
import './UserOfficeCard.css';
export default class UserOfficeCard extends Component {
  render() {
    return (
        <Card className='userOfficeCard'>
          <img src={nathaImage} className='userCardImage'/>
          <CardContent>
              <Typography variant='h6'>
                  {this.props.username} 
              </Typography>
              <Typography>
                  Product Manager
              </Typography>
              <Typography>
                  Orion Team
              </Typography>
          </CardContent>
        </Card>

    );
  }
}
