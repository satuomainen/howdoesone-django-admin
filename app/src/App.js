import React from 'react';
import { AppBar, Container, InputBase, Toolbar, Typography } from '@material-ui/core';

import ApiService from './ApiService';
import CreditCardList from './CreditCardList';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idNumber: sessionStorage.getItem("idNumber"),
      issuingNetworks: [],
      cards: []
    };

    this.storeIdNumber.bind(this);
  }

  componentDidMount() {
    const { idNumber } = this.state;
    if (idNumber) {
      this.fetchData(idNumber);
    }
  }

  storeIdNumber(event) {
    const { value } = event.target;
    if (value && value.length === 12) {
      this.fetchData(value);
    }
    else {
      this.resetData();
    }
  }

  fetchData(idNumber) {
    if (!idNumber) return;

    if (this.state.idNumber !== idNumber) {
      sessionStorage.setItem('idNumber', idNumber);
      this.setState({ idNumber });
    }

    ApiService.fetchIssuingNetworks((err, issuingNetworks) => {
      if (err) {
        return this.resetData();
      } else {
        this.setState({ issuingNetworks });
        ApiService.fetchCards(idNumber, (err, cards) => {
          if (err) {
            return this.resetData();
          } else {
            this.setState({ cards });
          }
        });
      }
    });
  }

  resetData() {
    this.setState({
      cards: [],
      issuingNetworks: []
    });
  }

  handleError(error) {
    console.log('Error:', error);
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              My Credit Cards
            </Typography>
            <div className="id-number-field">
              <InputBase
                placeholder="Id number..."
                defaultValue={this.state.idNumber}
                onChange={e => this.storeIdNumber(e)}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <CreditCardList cards={this.state.cards} issuingNetworks={this.state.issuingNetworks} />
        </Container>
      </div>
    );
  }
}

export default App;
