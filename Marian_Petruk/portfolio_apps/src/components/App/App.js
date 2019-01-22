import React, { Component } from 'react';
import './App.scss';
import AppLayout from '../AppLayout';

const dbUrl =
  process.env.REACT_APP_DB_HOST +
    ':' +
    process.env.REACT_APP_DB_PORT +
    '/' +
    process.env.REACT_APP_ENDPOINT || 'http://localhost:4000/users/';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    fetch(dbUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ user: data[0] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const user = this.state.user;
    if (!user) return <div>Loading...</div>;
    return <AppLayout user={user} />;
  }
}

export default App;
