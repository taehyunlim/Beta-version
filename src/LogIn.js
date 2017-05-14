import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const LogIn = () => (
  <div>
    <RaisedButton label="LogIn" secondary={true} style={style} />
  </div>
);

export default LogIn;
