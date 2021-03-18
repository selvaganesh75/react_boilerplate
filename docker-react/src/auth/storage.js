import React from 'react';
import { connect } from 'react-redux';
import { authHeader } from './auth';
import { history } from '../Store/store';

class Storage extends React.Component {
  componentDidMount() {
    /* 
        Add Listener when localstorage value changes 
    */

    window.addEventListener('storage', this.myStorage);
  }

  myStorage = () => {
    /* 
        Listen function when localstorage value changes 
    */

    const isUser = authHeader();

    if (!isUser || (isUser && !isUser.Authorization)) {
      history.push('/login'); // redirect to login page when user value null
    }
  };

  componentWillUnmount() {
    /* 
        Remove listener 
    */
    window.removeEventListener('storage', this.myStorage);
  }

  render() {
    return <React.Fragment> </React.Fragment>;
  }
}

export default connect(state => state.authentication)(Storage);
