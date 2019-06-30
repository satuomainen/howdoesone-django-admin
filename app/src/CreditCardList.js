import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import './CreditCardList.css';

class CreditCardList extends React.Component {

  getIssuingNetworkName(networkId) {
    const issuer = this.props.issuingNetworks.find(e => e.id === networkId);
    return issuer ? issuer.name : '';
  }

  renderCards() {
    const { cards } = this.props;

    if (!cards) {
      return (<Card className="card">No cards</Card>)
    }

    const creditCards = cards.map(card => {
      const issuingNetworkName = this.getIssuingNetworkName(card.issuing_network);
      return (
        <Card className="card" key={card.id}>
          <CardContent>
            <Typography color="textSecondary" align="right" gutterBottom>
              { issuingNetworkName }
            </Typography>
            <Typography className="card-number" color="textPrimary" align="left" gutterBottom variant="h4">
              { card.card_number }
            </Typography>
            <Typography className="valid-thru" color="textPrimary" align="right" gutterBottom>
              Valid thru {card.expiration_month}/{card.expiration_year}
            </Typography>
            <Typography className="name-on-card" color="textPrimary" align="left" gutterBottom variant="h5" component="h3">
              { card.name_on_card }
            </Typography>
          </CardContent>
        </Card>
      );
    });

    return (<div>{creditCards}</div>);
  }

  render() {
    return (
      <div>
        {this.renderCards()}
      </div>
    )
  }
}

export default CreditCardList;
