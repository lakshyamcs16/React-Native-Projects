import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from '../src/pages/Routes';

class Main extends Component<{}> {
  render() {    
    const { authData: { loggedin } } = this.props;
    return (
      <Routes isLoggedIn={loggedin} />
    )
  }
};

mapStateToProps = state => ({
  authData: state.authenticationDetails
})

export default connect(mapStateToProps, null)(Main);