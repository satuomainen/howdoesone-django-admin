import axios from 'axios';

function fetchIssuingNetworks(callback) {
  axios
    .get('http://localhost:8000/api/issuingnetworks')
    .then(issuerResponse => {
      callback(null, issuerResponse.data);
    })
    .catch(err => {
      callback(err, null);
    })
}

function fetchCards(idNumber, callback) {
  if (!idNumber) {
    return callback(null, []);
  }

  axios
    .get(`http://localhost:8000/api/creditcards?id_number=${idNumber}`)
    .then(cardsResponse => {
      callback(null, cardsResponse.data);
    })
    .catch(err => {
      callback(err, null);
    });
}

export default {
  fetchIssuingNetworks,
  fetchCards
}