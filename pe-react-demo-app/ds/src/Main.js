import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from '../src/pages/Routes';

class Main extends Component<{}> {
  render() {    
    const loggedin  = this.props.loginDetail;
    
    return (
      <Routes isLoggedIn={loggedin} />
    )
  }
};

mapStateToProps = state => ({
  loginDetail: state.authenticationDetails.loggedin,
})

export default connect(mapStateToProps, null)(Main);