import React, { Component } from "react";
import { Card, CardContent, CardMedia, CatdContent, Typography } from "@material-ui/core";
import nathaImage from '../../../../resources/images/Natha.jpeg';

export default class UserCard extends Component {
  render() {
    return (
      <div>
        <Card className='userCard'>
          <img src={nathaImage} className='userCardImage'/>
          <CardContent>
              <Typography variant='h6'>
                  Nathalia Cardona
              </Typography>
              <Typography>
                  Product Manager
              </Typography>
              <Typography>
                  Orion Team
              </Typography>
          </CardContent>
        </Card>

      </div>
    );
  }
}
