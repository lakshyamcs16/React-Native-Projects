import * as React from 'react';
import {
    Text,
    View
  } from 'react-native';
const Value = (props) => {
  return (
    <Text style={{ fontSize: 25, alignSelf: 'flex-end', marginBottom: 10, marginLeft: 10}}>{props.config.label}</Text>
  );
};

export default Value;