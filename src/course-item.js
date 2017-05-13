import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import UserPic from './img/avatar.jpg';
import CoursePic from './img/pic1.png';


const CardExampleWithAvatar = () => (
  <div className="cards">
      <Card>
        <CardHeader
          title="John Smith"
          subtitle="Subtitle"
          avatar={UserPic}
        />
        <CardMedia
          overlay={<CardTitle title="ECMAScript 6 tutorial" subtitle="by Codeschool" />}
        >
          <img src={CoursePic} />
        </CardMedia>
        <CardTitle title="Learning ES6 in 6 hours" subtitle="A course offered by Codeschool" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Review" />
          <FlatButton label="My Progress" />
        </CardActions>
      </Card>
  </div>
);

export default CardExampleWithAvatar;